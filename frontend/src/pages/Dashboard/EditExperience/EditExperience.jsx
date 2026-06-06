import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import usePortfolio from "../../../hooks/usePortfolio";
import EditPageLayout from "../components/EditPageLayout";
import FormField from "../components/FormField";
import FormSection from "../components/FormSection";
import FormCard from "../components/FormCard";
import SortableList from "../components/SortableList";
import { showSaveError, showSaveSuccess } from "../utils/showSaveError";

const iconOptions = [
  { value: "react", label: "React (blue)" },
  { value: "laptop", label: "Laptop / UI (sky)" },
  { value: "server", label: "Server / Backend (indigo)" },
];

const getExpSortId = (item, index) =>
  item._sortKey || `exp-${item.title}-${index}`;

const EditExperience = () => {
  const { portfolio, updateSection, saving } = usePortfolio();
  const [form, setForm] = useState(portfolio.experience);

  useEffect(() => {
    setForm(portfolio.experience);
  }, [portfolio.experience]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      await updateSection("experience", form);
      showSaveSuccess("Experience saved");
    } catch (err) {
      showSaveError("Could not save experience", err);
    }
  };

  return (
    <EditPageLayout
      title="Experience"
      description="Drag ⋮⋮ to reorder cards on the homepage."
      saving={saving}
      onSave={handleSave}
    >
      <FormSection title="Section headers">
        <FormField
          label="Section label"
          name="label"
          value={form.label}
          onChange={(v) => set("label", v)}
          placeholder="EXPERIENCE"
        />
        <FormField
          label="Section title"
          name="title"
          value={form.title}
          onChange={(v) => set("title", v)}
        />
      </FormSection>

      <FormSection
        title="Experience cards"
        description="Drag handle to change display order."
      >
        <SortableList
          items={form.items}
          getItemId={getExpSortId}
          onReorder={(items) => set("items", items)}
          renderItem={(item, index, dragHandle) => (
            <FormCard
              title={`Card ${index + 1}`}
              subtitle={item.title || "Untitled"}
              dragHandle={dragHandle}
              onRemove={() =>
                set(
                  "items",
                  form.items.filter((_, i) => i !== index)
                )
              }
            >
              <FormField
                label="Icon style"
                name={`icon-${index}`}
                type="select"
                options={iconOptions}
                value={item.icon}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, icon: v };
                  set("items", items);
                }}
              />
              <FormField
                label="Card title"
                name={`title-${index}`}
                value={item.title}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, title: v };
                  set("items", items);
                }}
              />
              <FormField
                label="Description"
                name={`desc-${index}`}
                type="textarea"
                rows={4}
                value={item.description}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, description: v };
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
                _sortKey: `exp-${Date.now()}`,
                icon: "react",
                title: "",
                description: "",
              },
            ])
          }
        >
          <Plus size={16} />
          Add experience card
        </button>
      </FormSection>
    </EditPageLayout>
  );
};

export default EditExperience;
