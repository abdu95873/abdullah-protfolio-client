import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ImageUploadField from "../../../components/ImageUploadField";
import usePortfolio from "../../../hooks/usePortfolio";
import EditPageLayout from "../components/EditPageLayout";
import FormField from "../components/FormField";
import FormSection from "../components/FormSection";

const EditBanner = () => {
  const { portfolio, updateSection, saving } = usePortfolio();
  const [form, setForm] = useState(portfolio.banner);

  useEffect(() => {
    setForm(portfolio.banner);
  }, [portfolio.banner]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      await updateSection("banner", form);
      Swal.fire({ icon: "success", title: "Banner saved", timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Could not save banner" });
    }
  };

  return (
    <EditPageLayout
      title="Hero / Banner"
      description="Edit the first section visitors see — photo, title, and intro text."
      saving={saving}
      onSave={handleSave}
    >
      <FormSection title="Profile image" description="Shown in the hero circle on the homepage.">
        <ImageUploadField
          label="Profile photo"
          name="banner-photo"
          value={form.image}
          onChange={(url) => set("image", url)}
        />
      </FormSection>

      <FormSection title="Text content" description="Headline and short introduction.">
        <FormField
          label="Badge label"
          name="badge"
          hint='Small tag above the headline, e.g. "MERN Developer"'
          value={form.badge}
          onChange={(v) => set("badge", v)}
          placeholder="MERN Developer"
        />
        <FormField
          label="Main headline"
          name="headline"
          value={form.headline}
          onChange={(v) => set("headline", v)}
          placeholder="Web Developer"
        />
        <FormField
          label="Introduction"
          name="intro"
          type="textarea"
          rows={4}
          value={form.intro}
          onChange={(v) => set("intro", v)}
          placeholder="Hi, I'm Abdullah..."
        />
        <FormField
          label="Skills area note"
          name="skillsNote"
          hint="Short line next to tech icons"
          value={form.skillsNote}
          onChange={(v) => set("skillsNote", v)}
          placeholder="High knowledge on softwares"
        />
      </FormSection>
    </EditPageLayout>
  );
};

export default EditBanner;
