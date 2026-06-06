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
  { value: "email", label: "Email" },
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "whatsapp", label: "WhatsApp" },
];

const getContactSortId = (item, index) =>
  item._sortKey || `contact-${item.label}-${index}`;

const EditContact = () => {
  const { portfolio, updateSection, saving } = usePortfolio();
  const [form, setForm] = useState(portfolio.contact);

  useEffect(() => {
    setForm(portfolio.contact);
  }, [portfolio.contact]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      await updateSection("contact", form);
      showSaveSuccess("Contact saved");
    } catch (err) {
      showSaveError("Could not save contact", err);
    }
  };

  return (
    <EditPageLayout
      title="Contact"
      description="Drag ⋮⋮ to reorder contact cards on the site."
      saving={saving}
      onSave={handleSave}
    >
      <FormSection title="Section header">
        <FormField
          label="Section title"
          name="contact-title"
          value={form.title}
          onChange={(v) => set("title", v)}
          placeholder="Contact Me"
        />
      </FormSection>

      <FormSection title="Contact links" description="Drag to reorder.">
        <SortableList
          items={form.items}
          getItemId={getContactSortId}
          onReorder={(items) => set("items", items)}
          renderItem={(item, index, dragHandle) => (
            <FormCard
              title={`Link ${index + 1}`}
              subtitle={item.label}
              dragHandle={dragHandle}
              onRemove={() =>
                set(
                  "items",
                  form.items.filter((_, i) => i !== index)
                )
              }
            >
              <FormField
                label="Icon type"
                name={`contact-icon-${index}`}
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
                label="Display label"
                name={`contact-label-${index}`}
                value={item.label}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, label: v };
                  set("items", items);
                }}
                placeholder="Email"
              />
              <FormField
                label="Visible text"
                name={`contact-value-${index}`}
                hint="Text shown on the card"
                value={item.value}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, value: v };
                  set("items", items);
                }}
              />
              <FormField
                label="Link URL"
                name={`contact-href-${index}`}
                hint="Full link including https:// or mailto:"
                value={item.href}
                onChange={(v) => {
                  const items = [...form.items];
                  items[index] = { ...item, href: v };
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
                _sortKey: `contact-${Date.now()}`,
                icon: "email",
                label: "",
                value: "",
                href: "",
              },
            ])
          }
        >
          <Plus size={16} />
          Add contact link
        </button>
      </FormSection>
    </EditPageLayout>
  );
};

export default EditContact;
