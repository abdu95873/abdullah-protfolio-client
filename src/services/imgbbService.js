const IMGBB_URL = "https://api.imgbb.com/1/upload";

const getApiKey = () => import.meta.env.VITE_IMGBB_API_KEY?.trim();

export const uploadToImgbb = async (file) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("ImgBB API key missing. Add VITE_IMGBB_API_KEY to .env.local");
  }

  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append("image", file);

  const response = await fetch(IMGBB_URL, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error?.message || "ImgBB upload failed");
  }

  return {
    url: result.data.url,
    displayUrl: result.data.display_url,
    deleteUrl: result.data.delete_url,
    thumbUrl: result.data.thumb?.url,
  };
};

export const uploadToImgbbFromUrl = async (imageUrl) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("ImgBB API key missing. Add VITE_IMGBB_API_KEY to .env.local");
  }

  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append("image", imageUrl);

  const response = await fetch(IMGBB_URL, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error?.message || "ImgBB upload failed");
  }

  return result.data.url;
};
