import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema(
  {
    github: String,
    linkedin: String,
    facebook: String,
    twitter: String,
  },
  { _id: false, strict: false }
);

const bannerSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    subtitle: String,
    description: String,
    image: String,
    cvLink: String,
    socialLinks: socialLinksSchema,
    badge: String,
    headline: String,
    intro: String,
    skillsNote: String,
  },
  { _id: false, strict: false }
);

const aboutSkillSchema = new mongoose.Schema(
  {
    name: String,
    level: Number,
    icon: String,
  },
  { _id: false, strict: false }
);

const aboutSchema = new mongoose.Schema(
  {
    description: String,
    skills: [aboutSkillSchema],
    image: String,
    subtitle: String,
    title: String,
    paragraphs: [String],
    benefits: [String],
    signature: String,
  },
  { _id: false, strict: false }
);

const serviceItemSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    icon: String,
  },
  { _id: false, strict: false }
);

const servicesSchema = new mongoose.Schema(
  {
    label: String,
    title: String,
    description: String,
    skills: [
      {
        name: String,
        level: Number,
      },
    ],
    features: [String],
    items: [serviceItemSchema],
  },
  { _id: false, strict: false }
);

const experienceItemSchema = new mongoose.Schema(
  {
    id: String,
    company: String,
    role: String,
    duration: String,
    description: String,
    logo: String,
    icon: String,
    title: String,
  },
  { _id: false, strict: false }
);

const experienceSchema = new mongoose.Schema(
  {
    label: String,
    title: String,
    items: [experienceItemSchema],
  },
  { _id: false, strict: false }
);

const projectItemSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    image: String,
    liveLink: String,
    githubLink: String,
    tags: [String],
    tech: String,
    link: String,
  },
  { _id: false, strict: false }
);

const projectsSchema = new mongoose.Schema(
  {
    label: String,
    title: String,
    description: String,
    items: [projectItemSchema],
  },
  { _id: false, strict: false }
);

const contactItemSchema = new mongoose.Schema(
  {
    icon: String,
    label: String,
    value: String,
    href: String,
  },
  { _id: false, strict: false }
);

const contactSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    address: String,
    mapEmbed: String,
    title: String,
    items: [contactItemSchema],
  },
  { _id: false, strict: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    banner: { type: bannerSchema, default: () => ({}) },
    about: { type: aboutSchema, default: () => ({}) },
    services: { type: servicesSchema, default: () => ({}) },
    experience: { type: experienceSchema, default: () => ({}) },
    projects: { type: projectsSchema, default: () => ({}) },
    contact: { type: contactSchema, default: () => ({}) },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "portfolios" }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
