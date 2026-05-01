import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requirePremiumAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.sub).lean();

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.account_type !== "premium") {
      return res.status(403).json({
        error: "Premium account required",
      });
    }

    req.user = {
      id: user._id,
      email: user.email,
      account_type: user.account_type,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
