import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import usePortfolio from "../../../hooks/usePortfolio";
import EditPageLayout from "../components/EditPageLayout";
import FormField from "../components/FormField";
import FormSection from "../components/FormSection";
import FormCard from "../components/FormCard";
import SortableList from "../components/SortableList";
import { showSaveError, showSaveSuccess } from "../utils/showSaveError";

const getSkillSortId = (item, index) =>
  item._sortKey || `skill-${item.name}-${index}`;

const EditServices = () => {
  const { portfolio, updateSection, saving } = usePortfolio();
  const [form, setForm] = useState(portfolio.services);

  useEffect(() => {
    setForm(portfolio.services);
  }, [portfolio.services]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      await updateSection("services", form);
      showSaveSuccess("Services saved");
    } catch (err) {
      showSaveError("Could not save services", err);
    }
  };

  const featureItems = form.features.map((title, index) => ({
    value: title,
    _sortKey: `feature-${index}-${title.slice(0, 12)}`,
  }));

  const setFeaturesFromItems = (items) =>
    set(
      "features",
      items.map((x) => x.value)
    );

  return (
    <EditPageLayout
      title="Skills & Services"
      description="Drag ⋮⋮ to reorder skills and service cards."
      saving={saving}
      onSave={handleSave}
    >
      <FormSection title="Section intro">
        <FormField
          label="Section label"
          name="label"
          value={form.label}
          onChange={(v) => set("label", v)}
          placeholder="SERVICES"
        />
        <FormField
          label="Section title"
          name="title"
          value={form.title}
          onChange={(v) => set("title", v)}
        />
        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={form.description}
          onChange={(v) => set("description", v)}
        />
      </FormSection>

      <FormSection title="Skills" description="Drag to reorder skill bars.">
        <SortableList
          items={form.skills}
          getItemId={getSkillSortId}
          onReorder={(items) => set("skills", items)}
          renderItem={(skill, index, dragHandle) => (
            <FormCard
              title={`Skill ${index + 1}`}
              subtitle={skill.name || "New skill"}
              dragHandle={dragHandle}
              onRemove={() =>
                set(
                  "skills",
                  form.skills.filter((_, i) => i !== index)
                )
              }
            >
              <FormField
                label="Skill name"
                name={`skill-name-${index}`}
                value={skill.name}
                onChange={(v) => {
                  const skills = [...form.skills];
                  skills[index] = { ...skill, name: v };
                  set("skills", skills);
                }}
              />
              <FormField
                label="Level (%)"
                name={`skill-level-${index}`}
                type="number"
                min={0}
                max={100}
                value={skill.level}
                onChange={(v) => {
                  const skills = [...form.skills];
                  skills[index] = { ...skill, level: v };
                  set("skills", skills);
                }}
              />
            </FormCard>
          )}
        />
        <button
          type="button"
          className="btn btn-sm btn-outline gap-2"
          onClick={() =>
            set("skills", [
              ...form.skills,
              { _sortKey: `skill-${Date.now()}`, name: "", level: 80 },
            ])
          }
        >
          <Plus size={16} />
          Add skill
        </button>
      </FormSection>

      <FormSection title="Service features" description="Drag to reorder cards.">
        <SortableList
          items={featureItems}
          getItemId={(item) => item._sortKey}
          onReorder={(items) => setFeaturesFromItems(items)}
          renderItem={(row, index, dragHandle) => (
            <FormCard
              title={`Feature ${index + 1}`}
              dragHandle={dragHandle}
              onRemove={() =>
                setFeaturesFromItems(featureItems.filter((_, i) => i !== index))
              }
            >
              <FormField
                label="Feature title"
                name={`feature-${index}`}
                value={row.value}
                onChange={(v) => {
                  const next = [...featureItems];
                  next[index] = { ...row, value: v };
                  setFeaturesFromItems(next);
                }}
              />
            </FormCard>
          )}
        />
        <button
          type="button"
          className="btn btn-sm btn-outline gap-2"
          onClick={() =>
            set("features", [
              ...form.features,
              "New service",
            ])
          }
        >
          <Plus size={16} />
          Add feature
        </button>
      </FormSection>
    </EditPageLayout>
  );
};

export default EditServices;
