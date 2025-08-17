import User from "../models/User.js";

// Admin: create user in own tenant | SuperAdmin: any tenant (must pass tenant in body)
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, tenant } = req.body;

    const tenantToUse =
      req.user.role === "SuperAdmin" ? tenant : req.user.tenant;

    if (!tenantToUse) return res.status(400).json({ message: "tenant required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const user = await User.create({
      username,
      email,
      password,
      role: role || "User",
      tenant: tenantToUse
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// List users (scoped)
export const listUsers = async (req, res) => {
  const filter = req.user.role === "SuperAdmin" ? {} : { tenant: req.user.tenant };
  const users = await User.find(filter).select("-password -refreshTokens").populate("tenant");
  res.json(users);
};

// (Optional) update role (Admin -> own tenant only)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // tenant guard for Admin/Manager
    if (req.user.role !== "SuperAdmin" && user.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    user.role = role;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getTeam = async (req, res) => {
  try {
    // Manager ke tenant ke users fetch karo
    const users = await User.find({ tenant: req.user.tenant }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
