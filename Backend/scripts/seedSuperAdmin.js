import "dotenv/config.js";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";

(async () => {
  try {
    await connectDB();

    let tenant = await Tenant.findOne({ name: "MainOrg" });
    if (!tenant) tenant = await Tenant.create({ name: "MainOrg" });

    const email = "superadmin@example.com";
    const exists = await User.findOne({ email });
    if (exists) {
      console.log("SuperAdmin already exists");
      process.exit(0);
    }

    await User.create({
      username: "superadmin",
      email,
      password: "SuperAdmin123!",
      role: "SuperAdmin",
      tenant: tenant._id
    });

    console.log("✅ SuperAdmin seeded:", email, "password=SuperAdmin123!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
