export const requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};

export const enforceSameTenant = (req, res, next) => {
  if (req.user.role === "SuperAdmin") return next();
  const tenantId = req.user.tenant?.toString();
  const targetTenantId = (req.params.tenantId || req.body.tenant || req.query.tenantId || "").toString();
  if (tenantId && targetTenantId && tenantId === targetTenantId) return next();
  return res.status(403).json({ message: "Forbidden: cross-tenant access" });
};
