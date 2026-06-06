import Portfolio from "../models/Portfolio.js";
import defaultPortfolio from "../data/defaultPortfolio.json" with { type: "json" };

const SECTIONS = ["banner", "about", "services", "experience", "projects", "contact"];

export const mergeWithDefaults = (doc) => {
  const remote = doc?.toObject ? doc.toObject() : doc || {};
  const { _id, __v, ...data } = remote;

  return {
    banner: { ...defaultPortfolio.banner, ...data.banner },
    about: { ...defaultPortfolio.about, ...data.about },
    services: {
      ...defaultPortfolio.services,
      ...data.services,
      skills: data.services?.skills ?? defaultPortfolio.services.skills,
      features: data.services?.features ?? defaultPortfolio.services.features,
    },
    experience: {
      ...defaultPortfolio.experience,
      ...data.experience,
      items: data.experience?.items ?? defaultPortfolio.experience.items,
    },
    contact: {
      ...defaultPortfolio.contact,
      ...data.contact,
      items: data.contact?.items ?? defaultPortfolio.contact.items,
    },
    projects: {
      ...defaultPortfolio.projects,
      ...data.projects,
      items: data.projects?.items ?? defaultPortfolio.projects.items,
    },
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  };
};

export const getPortfolio = async (req, res) => {
  try {
    let doc = await Portfolio.findOne();

    if (!doc) {
      doc = await Portfolio.create({
        ...defaultPortfolio,
        updatedAt: new Date(),
      });
    }

    res.json(mergeWithDefaults(doc));
  } catch (error) {
    console.error("getPortfolio error:", error);
    res.status(500).json({ message: error.message || "Failed to load portfolio" });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { section } = req.params;

    if (!SECTIONS.includes(section)) {
      return res.status(400).json({ message: `Invalid section: ${section}` });
    }

    const doc = await Portfolio.findOneAndUpdate(
      {},
      {
        $set: {
          [section]: req.body,
          updatedAt: new Date(),
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const merged = mergeWithDefaults(doc);
    res.json({ message: `${section} updated`, section: merged[section], updatedAt: merged.updatedAt });
  } catch (error) {
    console.error(`updateSection(${req.params.section}) error:`, error);
    res.status(500).json({ message: error.message || "Failed to save section" });
  }
};
