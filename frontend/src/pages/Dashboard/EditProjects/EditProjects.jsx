import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import ImageUploadField from "../../../components/ImageUploadField";
import usePortfolio from "../../../hooks/usePortfolio";
import EditPageLayout from "../components/EditPageLayout";
import FormField from "../components/FormField";
import FormSection from "../components/FormSection";
import FormCard from "../components/FormCard";
import SortableList from "../components/SortableList";
import { showSaveError, showSaveSuccess } from "../utils/showSaveError";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getProjectSortId = (item, index) =>
  item.id?.trim() || item._sortKey || `project-row-${index}`;

const EditProjects = () => {
  const { portfolio, updateSection, saving } = usePortfolio();
  const [form, setForm] = useState(portfolio.projects);

  useEffect(() => {
    setForm(portfolio.projects);
  }, [portfolio.projects]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    const emptyId = form.items.some((item) => !item.id?.trim());
    if (emptyId) {
      Swal.fire({
        icon: "warning",
        title: "Missing project ID",
        text: "Each project needs a URL slug (ID). Fill in or save again after entering a title.",
      });
      return;
    }

    try {
      await updateSection("projects", form);
      showSaveSuccess("Projects saved");
    } catch (err) {
      showSaveError("Could not save projects", err);
    }
  };

  return (
    <EditPageLayout
      title="Projects"
      description="Featured projects — drag ⋮⋮ handle to change order on the site."
      saving={saving}
      onSave={handleSave}
    >
      <FormSection title="Section intro">
        <FormField
          label="Section label"
          name="projects-label"
          value={form.label}
          onChange={(v) => set("label", v)}
          placeholder="FEATURED PROJECTS"
        />
        <FormField
          label="Section title"
          name="projects-title"
          value={form.title}
          onChange={(v) => set("title", v)}
        />
        <FormField
          label="Section description"
          name="projects-desc"
          type="textarea"
          value={form.description}
          onChange={(v) => set("description", v)}
        />
      </FormSection>

      <FormSection
        title="Project cards"
        description="Drag the handle (serial number) up or down to reorder projects."
      >
        <SortableList
          items={form.items}
          getItemId={getProjectSortId}
          onReorder={(items) => set("items", items)}
          renderItem={(item, index, dragHandle) => (
            <FormCard
              title={`Project ${index + 1}`}
              subtitle={item.title || "Untitled project"}
              dragHandle={dragHandle}
              onRemove={() =>
                set(
                  "items",
                  form.items.filter((_, i) => i !== index)
                )
              }
              removeLabel="Remove project"
            >
              <FormField
                label="Project title"
                name={`project-title-${index}`}
                value={item.title}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = {
                    ...item,
                    title: v,
                    id: item.id || slugify(v),
                  };
                  set("items", items);
                }}
              />
              <FormField
                label="URL slug (ID)"
                name={`project-id-${index}`}
                hint="Used for scroll anchors — lowercase, no spaces"
                value={item.id}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, id: slugify(v) };
                  set("items", items);
                }}
              />
              <FormField
                label="Description"
                name={`project-desc-${index}`}
                type="textarea"
                rows={3}
                value={item.description}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, description: v };
                  set("items", items);
                }}
              />
              <FormField
                label="Tech stack"
                name={`project-tech-${index}`}
                hint="Shown as a badge on the image"
                value={item.tech}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, tech: v };
                  set("items", items);
                }}
                placeholder="React, Tailwind, Firebase"
              />
              <FormField
                label="Live project URL"
                name={`project-link-${index}`}
                value={item.link}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, link: v };
                  set("items", items);
                }}
                placeholder="https://..."
              />
              <ImageUploadField
                label="Project screenshot"
                name={`project-image-${index}`}
                value={item.image}
                onChange={(url) => {
                  const items = [...form.items];
                  items[index] = { ...item, image: url };
                  set("items", items);
                }}
              />
            </FormCard>
          )}
        />

        <button
          type="button"
          className="btn btn-sm btn-outline gap-2"
          onClick={() =>
            set("items", [
              ...form.items,
              {
                id: `project-${Date.now()}`,
                _sortKey: `project-${Date.now()}`,
                title: "",
                description: "",
                tech: "",
                link: "",
                image: "",
              },
            ])
          }
        >
          <Plus size={16} />
          Add project
        </button>
      </FormSection>
    </EditPageLayout>
  );
};

export default EditProjects;
