import express from "express";
import { Gig } from "../../Models/index.js";
import { requireRole, verifyToken } from "../../Middleware/auth.js";
import { validateGig } from "../../Middleware/validate.js";

const router = express.Router();

const attachFreelancerFromToken = (req, _res, next) => {
  req.body.freelancer_id = req.user._id.toString();
  next();
};

router.post("/create/gig", verifyToken, requireRole("freelancer", "admin"), attachFreelancerFromToken, validateGig, async (req, res) => {
  try {
    const { freelancer_id, title, description, price, revision, category, delivery_time, images, coverimage, gig_extras, gig_tags } = req.body;

    if (!freelancer_id || !title || !description || !price || !category || !delivery_time || !coverimage || !gig_tags) {
      return res.status(400).json({ error: "Missing required gig fields." });
    }

    const gigData = {
      freelancer_id,
      title,
      description,
      price,
      revision,
      category,
      delivery_time,
      images: images || [],
      coverimage: coverimage,
      gig_extras: gig_extras || [],
      gig_tags: gig_tags,
      isApproved: false, 
    };

    const newGig = new Gig(gigData);
    await newGig.save();

    return res.status(201).json({
      message: "Gig created successfully. Pending admin approval.",
      gig: newGig,
    });
  } catch (error) {
    console.error("Error in /create_gig:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

export default router;
