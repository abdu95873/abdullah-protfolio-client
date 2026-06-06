import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ImageUploadField from "../../../components/ImageUploadField";
import usePortfolio from "../../../hooks/usePortfolio";
import EditPageLayout from "../components/EditPageLayout";
import FormField from "../components/FormField";
import FormSection from "../components/FormSection";
import FormCard from "../components/FormCard";
import SortableList from "../components/SortableList";
import { showSaveError, showSaveSuccess } from "../utils/showSaveError";

const toSortableStrings = (arr, prefix) =>
  arr.map((value, index) => ({
    value,
    _sortKey: `${prefix}-${index}-${value.slice(0, 8)}`,
  }));

const EditAbout = () => {
  const { portfolio, updateSection, saving } = usePortfolio();
  const [form, setForm] = useState(portfolio.about);

  useEffect(() => {
    setForm(portfolio.about);
  }, [portfolio.about]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      await updateSection("about", form);
      showSaveSuccess("About saved");
    } catch (err) {
      showSaveError("Could not save about", err);
    }
  };

  const paragraphItems = toSortableStrings(form.paragraphs, "para");
  const benefitItems = toSortableStrings(form.benefits, "ben");

  return (
    <EditPageLayout
      title="About Me"
      description="Drag ⋮⋮ to reorder paragraphs and benefits."
      saving={saving}
      onSave={handleSave}
    >
      <FormSection title="Photo">
        <ImageUploadField
          label="About section photo"
          name="about-photo"
          value={form.image}
          onChange={(url) => set("image", url)}
        />
      </FormSection>

      <FormSection title="Section headers">
        <FormField
          label="Section label"
          name="subtitle"
          hint='Small blue label, e.g. "ABOUT ME"'
          value={form.subtitle}
          onChange={(v) => set("subtitle", v)}
        />
        <FormField
          label="Section title"
          name="title"
          value={form.title}
          onChange={(v) => set("title", v)}
        />
        <FormField
          label="Signature name"
          name="signature"
          value={form.signature}
          onChange={(v) => set("signature", v)}
        />
      </FormSection>

      <FormSection title="Paragraphs" description="Drag to reorder.">
        <SortableList
          items={paragraphItems}
          getItemId={(item) => item._sortKey}
          onReorder={(items) => set("paragraphs", items.map((x) => x.value))}
          renderItem={(row, index, dragHandle) => (
            <FormCard
              title={`Paragraph ${index + 1}`}
              dragHandle={dragHandle}
              onRemove={() =>
                set(
                  "paragraphs",
                  form.paragraphs.filter((_, i) => i !== index)
                )
              }
            >
              <FormField
                label="Paragraph text"
                name={`paragraph-${index}`}
                type="textarea"
                rows={3}
                value={row.value}
                onChange={(v) => {
                  const next = [...paragraphItems];
                  next[index] = { ...row, value: v };
                  set("paragraphs", next.map((x) => x.value));
                }}
              />
            </FormCard>
          )}
        />
        <button
          type="button"
          className="btn btn-sm btn-outline gap-2"
          onClick={() => set("paragraphs", [...form.paragraphs, ""])}
        >
          <Plus size={16} />
          Add paragraph
        </button>
      </FormSection>

      <FormSection title="Benefits / highlights" description="Drag to reorder.">
        <SortableList
          items={benefitItems}
          getItemId={(item) => item._sortKey}
          onReorder={(items) => set("benefits", items.map((x) => x.value))}
          renderItem={(row, index, dragHandle) => (
            <FormCard
              title={`Benefit ${index + 1}`}
              dragHandle={dragHandle}
              onRemove={() =>
                set(
                  "benefits",
                  form.benefits.filter((_, i) => i !== index)
                )
              }
            >
              <FormField
                label="Benefit text"
                name={`benefit-${index}`}
                value={row.value}
                onChange={(v) => {
                  const next = [...benefitItems];
                  next[index] = { ...row, value: v };
                  set("benefits", next.map((x) => x.value));
                }}
              />
            </FormCard>
          )}
        />
        <button
          type="button"
          className="btn btn-sm btn-outline gap-2"
          onClick={() => set("benefits", [...form.benefits, ""])}
        >
          <Plus size={16} />
          Add benefit
        </button>
      </FormSection>
    </EditPageLayout>
  );
};

export default EditAbout;
