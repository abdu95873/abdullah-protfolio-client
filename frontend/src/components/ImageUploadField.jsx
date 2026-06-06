import { useRef, useState } from "react";
import { Upload, Loader2, ImageIcon } from "lucide-react";
import { uploadToImgbb } from "../services/imgbbService";

const ImageUploadField = ({
  label,
  name = "image",
  value,
  onChange,
  hint = "JPG, PNG or WebP — max 32 MB. Hosted on ImgBB.",
}) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const id = `upload-${name}`;

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > 32 * 1024 * 1024) {
      setError("Image must be under 32 MB.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const { url } = await uploadToImgbb(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
      </label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}

      {value ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <img
            src={value}
            alt="Preview"
            className="max-h-52 w-full object-contain p-2"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
          <ImageIcon size={32} />
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="btn btn-sm w-fit gap-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={16} />
            Upload image
          </>
        )}
      </button>

      <FormFieldInline
        label="Image URL"
        name={`${name}-url`}
        value={value || ""}
        onChange={onChange}
        placeholder="https://i.ibb.co/..."
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

const FormFieldInline = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={name} className="text-sm font-semibold text-slate-800">
      {label}
    </label>
    <input
      id={name}
      name={name}
      className="input input-bordered input-sm w-full bg-white"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ImageUploadField;
