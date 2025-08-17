import Tenant from "../models/Tenant.js";
import User from "../models/User.js";

export const createTenant = async (req, res) => {
  try {
    const { name } = req.body;
    const tenant = await Tenant.create({ name });
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listTenants = async (_req, res) => {
  const tenants = await Tenant.find().sort({ createdAt: -1 });
  res.json(tenants);
};

// (Optional) create Admin for a tenant quickly
export const createTenantAdmin = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { username, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const admin = await User.create({
      username,
      email,
      password,
      role: "Admin",
      tenant: tenantId
    });
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
