export const verifyAdmin = (req, res, next) => {
  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const userEmail = (req.user?.email || "").trim().toLowerCase();

  if (!adminEmail) {
    return res.status(500).json({ message: "Server misconfiguration: ADMIN_EMAIL not set" });
  }

  if (userEmail !== adminEmail) {
    return res.status(403).json({ message: "Forbidden: admin access only" });
  }

  next();
};
