export const adminOnly = (req, res, next) => {
  if (!req.user || !["admin", "superadmin"].includes(req.user.role)) {
    return res.status(403).json({ msg: "Access denied" });
  }

  next();
};