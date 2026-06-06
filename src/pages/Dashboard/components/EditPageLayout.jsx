import PageHeader from "./PageHeader";
import SaveBar from "./SaveBar";

const EditPageLayout = ({
  title,
  description,
  saving,
  onSave,
  saveLabel = "Save changes",
  children,
}) => (
  <div className="pb-28">
    <PageHeader title={title} description={description} />
    <div className="space-y-6">{children}</div>
    <SaveBar saving={saving} onSave={onSave} label={saveLabel} />
  </div>
);

export default EditPageLayout;
