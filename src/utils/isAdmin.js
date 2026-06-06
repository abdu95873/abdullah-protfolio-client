export const getAdminEmail = () =>
  (import.meta.env.VITE_ADMIN_EMAIL || "").trim().toLowerCase();

export const isAdminUser = (user) => {
  const adminEmail = getAdminEmail();
  if (!adminEmail || !user?.email) return false;
  return user.email.toLowerCase() === adminEmail;
};
