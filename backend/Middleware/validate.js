import mongoose from "mongoose";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const sanitizeString = (value) => {
  if (typeof value !== "string") return value;

  return value
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 1000);
};

const sanitizeBody = (body) => {
  Object.keys(body).forEach((key) => {
    if (typeof body[key] === "string") {
      body[key] = sanitizeString(body[key]);
    }

    if (Array.isArray(body[key])) {
      body[key] = body[key].map((item) => {
        if (typeof item === "string") return sanitizeString(item);
        if (item && typeof item === "object") return sanitizeBody(item);
        return item;
      });
    }

    if (body[key] && typeof body[key] === "object" && !Array.isArray(body[key])) {
      body[key] = sanitizeBody(body[key]);
    }
  });

  return body;
};

export const sanitizeRequestBody = (req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeBody(req.body);
  }

  next();
};

export const validateSignup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.length < 4) {
    return res.status(400).json({ message: "Username must be at least 4 characters long" });
  }

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (!passwordPattern.test(password || "")) {
    return res.status(400).json({
      message: "Password must be at least 8 characters and include a letter and number",
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !emailPattern.test(email) || !password) {
    return res.status(400).json({ message: "Valid email and password are required" });
  }

  next();
};

export const validateForgotPassword = (req, res, next) => {
  const { email } = req.body;

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  next();
};

export const validateResetPassword = (req, res, next) => {
  const { token, password } = req.body;

  if (!token || token.length < 32) {
    return res.status(400).json({ message: "Valid reset token is required" });
  }

  if (!passwordPattern.test(password || "")) {
    return res.status(400).json({
      message: "Password must be at least 8 characters and include a letter and number",
    });
  }

  next();
};

export const validateGig = (req, res, next) => {
  const { freelancer_id, title, description, price, category, delivery_time, coverimage, gig_tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(freelancer_id)) {
    return res.status(400).json({ error: "Valid freelancer ID is required" });
  }

  if (!title || !description || !category || !coverimage) {
    return res.status(400).json({ error: "Title, description, category, and cover image are required" });
  }

  const numericPrice = Number(price);
  const numericDeliveryTime = Number(delivery_time);

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }

  if (!Number.isFinite(numericDeliveryTime) || numericDeliveryTime <= 0) {
    return res.status(400).json({ error: "Delivery time must be a positive number" });
  }

  if (!Array.isArray(gig_tags) || gig_tags.length === 0) {
    return res.status(400).json({ error: "At least one gig tag is required" });
  }

  req.body.price = numericPrice;
  req.body.delivery_time = numericDeliveryTime;
  next();
};

export const validateOrder = (req, res, next) => {
  const { gig_id, client_id, freelancer_id, total_amount, delivery_date } = req.body;

  const ids = { gig_id, client_id, freelancer_id };
  const invalidId = Object.entries(ids).find(([, value]) => !mongoose.Types.ObjectId.isValid(value));

  if (invalidId) {
    return res.status(400).json({ message: `Valid ${invalidId[0]} is required` });
  }

  const numericAmount = Number(total_amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Total amount must be a positive number" });
  }

  if (!delivery_date || Number.isNaN(Date.parse(delivery_date))) {
    return res.status(400).json({ message: "Valid delivery date is required" });
  }

  req.body.total_amount = numericAmount;
  next();
};
