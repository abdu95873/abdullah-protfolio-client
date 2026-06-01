/** Firestore rejects `undefined`; strip it recursively. */
export const sanitizeForFirestore = (value) => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeForFirestore(item))
      .filter((item) => item !== undefined);
  }
  if (typeof value === "object" && value.constructor === Object) {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      if (key === "_sortKey") continue;
      const cleaned = sanitizeForFirestore(val);
      if (cleaned !== undefined) {
        result[key] = cleaned;
      }
    }
    return result;
  }
  return value;
};

export const normalizeProjectsSection = (projects) => {
  const items = (projects?.items ?? []).map((item, index) => ({
    id: (item?.id && String(item.id).trim()) || `project-${index + 1}`,
    title: String(item?.title ?? ""),
    description: String(item?.description ?? ""),
    tech: String(item?.tech ?? ""),
    link: String(item?.link ?? ""),
    image: String(item?.image ?? ""),
  }));

  return sanitizeForFirestore({
    label: projects?.label ?? "",
    title: projects?.title ?? "",
    description: projects?.description ?? "",
    items,
  });
};

export const getFirestoreErrorMessage = (error) => {
  const code = error?.code || "";
  const message = error?.message || "Unknown error";

  if (message.includes("initializeFirestore")) {
    return "Firestore was initialized twice. Hard refresh the page (Ctrl+Shift+R), then save again.";
  }
  if (code === "permission-denied") {
    return "Permission denied. Log in with your admin email and check Firestore rules in Firebase Console.";
  }
  if (
    code === "unavailable" ||
    message.toLowerCase().includes("offline") ||
    message.toLowerCase().includes("client is offline")
  ) {
    return [
      "Cannot connect to Firestore.",
      "1) Firebase Console → abdullah-portfolio-client → Firestore → Create database",
      "2) Publish rules (see firestore.rules in project)",
      "3) Log in as abdu95873@gmail.com",
      "4) Refresh this page and try Save again",
    ].join(" ");
  }
  if (code === "invalid-argument") {
    return `Invalid data: ${message}`;
  }
  if (message.includes("longer than")) {
    return "Data is too large. Use ImgBB image URLs, not huge pasted text.";
  }

  return message;
};
