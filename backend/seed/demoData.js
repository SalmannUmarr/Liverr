import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {
  FreelancerPortfolio,
  Gig,
  Messages,
  Order,
  Review,
  Transaction,
  User,
} from "../Models/index.js";

const mongoUri = process.env.MONGODB_URI || process.env.ConnectionString;

if (!mongoUri) {
  console.error("Missing MONGODB_URI or ConnectionString in backend/.env");
  process.exit(1);
}

const demoPassword = "Demo12345";
const passwordHash = await bcrypt.hash(demoPassword, 10);

const demoUsers = [
  {
    username: "liverr_admin",
    email: "admin@liverr.demo",
    role: "admin",
    verified: true,
  },
  {
    username: "amna_client",
    email: "client@liverr.demo",
    role: "client",
    verified: true,
  },
  {
    username: "hamza_startup",
    email: "startup@liverr.demo",
    role: "client",
    verified: true,
  },
  {
    username: "zara_designs",
    email: "designer@liverr.demo",
    role: "freelancer",
    verified: true,
  },
  {
    username: "ali_codes",
    email: "developer@liverr.demo",
    role: "freelancer",
    verified: true,
  },
  {
    username: "sana_growth",
    email: "marketer@liverr.demo",
    role: "freelancer",
    verified: true,
  },
];

const gigImages = {
  design:
    "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200",
  web:
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
  mobile:
    "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1200",
  marketing:
    "https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1200",
  content:
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
  video:
    "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

const profileFor = (freelancerId, skills, completedOrders, rating) => ({
  freelancer_id: freelancerId,
  completed_orders: completedOrders,
  overall_rating: rating,
  education: [
    {
      degree: "BS Computer Science",
      graduation_year: 2024,
    },
  ],
  skills,
});

const gigFor = (freelancerId, data) => ({
  freelancer_id: freelancerId,
  title: data.title,
  description: data.description,
  price: data.price,
  revision: data.revision,
  category: data.category,
  delivery_time: data.delivery_time,
  coverimage: data.coverimage,
  images: [data.coverimage],
  gig_extras: data.gig_extras,
  isApproved: true,
  gig_tags: data.gig_tags,
});

async function seed() {
  await mongoose.connect(mongoUri);

  const demoEmails = demoUsers.map((user) => user.email);
  const existingDemoUsers = await User.find({ email: { $in: demoEmails } }).select("_id");
  const demoUserIds = existingDemoUsers.map((user) => user._id);
  const existingDemoGigs = await Gig.find({ freelancer_id: { $in: demoUserIds } }).select("_id");
  const demoGigIds = existingDemoGigs.map((gig) => gig._id);
  const existingDemoOrders = await Order.find({
    $or: [
      { client_id: { $in: demoUserIds } },
      { freelancer_id: { $in: demoUserIds } },
      { gig_id: { $in: demoGigIds } },
    ],
  }).select("_id");
  const demoOrderIds = existingDemoOrders.map((order) => order._id);

  await Promise.all([
    Messages.deleteMany({
      $or: [{ sender_id: { $in: demoUserIds } }, { receiver_id: { $in: demoUserIds } }],
    }),
    Review.deleteMany({
      $or: [
        { order_id: { $in: demoOrderIds } },
        { reviewer_id: { $in: demoUserIds } },
        { reviewee_id: { $in: demoUserIds } },
      ],
    }),
    Transaction.deleteMany({ order_id: { $in: demoOrderIds } }),
    Order.deleteMany({ _id: { $in: demoOrderIds } }),
    Gig.deleteMany({ _id: { $in: demoGigIds } }),
    FreelancerPortfolio.deleteMany({ freelancer_id: { $in: demoUserIds } }),
    User.deleteMany({ _id: { $in: demoUserIds } }),
  ]);

  const createdUsers = await User.insertMany(
    demoUsers.map((user) => ({
      ...user,
      password: passwordHash,
      isActive: true,
      created_at: new Date("2026-04-30T10:00:00.000Z"),
    }))
  );

  const users = Object.fromEntries(createdUsers.map((user) => [user.email, user]));
  const designer = users["designer@liverr.demo"];
  const developer = users["developer@liverr.demo"];
  const marketer = users["marketer@liverr.demo"];
  const client = users["client@liverr.demo"];
  const startup = users["startup@liverr.demo"];

  await FreelancerPortfolio.insertMany([
    profileFor(
      designer._id,
      [
        { name: "Brand Identity", level: "Expert" },
        { name: "UI Design", level: "Expert" },
        { name: "Figma", level: "Expert" },
      ],
      42,
      4.9
    ),
    profileFor(
      developer._id,
      [
        { name: "React", level: "Expert" },
        { name: "Node.js", level: "Expert" },
        { name: "MongoDB", level: "Intermediate" },
      ],
      36,
      4.8
    ),
    profileFor(
      marketer._id,
      [
        { name: "SEO", level: "Expert" },
        { name: "Social Media", level: "Expert" },
        { name: "Copywriting", level: "Intermediate" },
      ],
      29,
      4.7
    ),
  ]);

  const gigs = await Gig.insertMany([
    gigFor(designer._id, {
      title: "I will design a premium logo and brand identity kit",
      description:
        "A complete visual identity package with logo concepts, brand colors, typography, and social media starter assets.",
      price: 25000,
      revision: 3,
      category: "Design",
      delivery_time: 5,
      coverimage: gigImages.design,
      gig_extras: [
        { title: "Brand guidelines PDF", price: 8000 },
        { title: "Extra logo concept", price: 5000 },
      ],
      gig_tags: ["logo", "branding", "figma", "identity"],
    }),
    gigFor(designer._id, {
      title: "I will create modern UI screens for your web app",
      description:
        "Clean, responsive UI screens for SaaS dashboards, marketplaces, landing pages, and product flows.",
      price: 30000,
      revision: 4,
      category: "Design",
      delivery_time: 7,
      coverimage: gigImages.web,
      gig_extras: [
        { title: "Clickable Figma prototype", price: 7000 },
        { title: "Design system mini kit", price: 12000 },
      ],
      gig_tags: ["ui", "ux", "web design", "dashboard"],
    }),
    gigFor(developer._id, {
      title: "I will build a responsive MERN website",
      description:
        "Full-stack React, Node, Express, and MongoDB development with authentication, APIs, and deployment setup.",
      price: 65000,
      revision: 3,
      category: "Programming",
      delivery_time: 10,
      coverimage: gigImages.web,
      gig_extras: [
        { title: "Admin dashboard", price: 18000 },
        { title: "Deployment support", price: 10000 },
      ],
      gig_tags: ["mern", "react", "node", "mongodb"],
    }),
    gigFor(developer._id, {
      title: "I will fix bugs and optimize your React app",
      description:
        "Bug fixing, API integration cleanup, performance improvements, and production build troubleshooting.",
      price: 18000,
      revision: 2,
      category: "Programming",
      delivery_time: 3,
      coverimage: gigImages.mobile,
      gig_extras: [
        { title: "Detailed bug report", price: 3000 },
        { title: "Extra feature adjustment", price: 6000 },
      ],
      gig_tags: ["react", "bug fix", "frontend", "api"],
    }),
    gigFor(marketer._id, {
      title: "I will create a social media growth strategy",
      description:
        "A practical content calendar, audience research, hashtag strategy, and campaign plan for your brand.",
      price: 22000,
      revision: 2,
      category: "Marketing",
      delivery_time: 5,
      coverimage: gigImages.marketing,
      gig_extras: [
        { title: "30 post captions", price: 7000 },
        { title: "Competitor audit", price: 6000 },
      ],
      gig_tags: ["marketing", "social media", "strategy", "content"],
    }),
    gigFor(marketer._id, {
      title: "I will write SEO website copy that converts",
      description:
        "Homepage, service page, and product copy written for search visibility and better conversion.",
      price: 20000,
      revision: 3,
      category: "Writing",
      delivery_time: 4,
      coverimage: gigImages.content,
      gig_extras: [
        { title: "Keyword research", price: 5000 },
        { title: "Meta titles and descriptions", price: 4000 },
      ],
      gig_tags: ["seo", "copywriting", "website copy", "content"],
    }),
    gigFor(designer._id, {
      title: "I will edit a clean promotional video for your product",
      description:
        "Short promotional video editing with captions, light motion graphics, and social-ready exports.",
      price: 28000,
      revision: 2,
      category: "Video",
      delivery_time: 6,
      coverimage: gigImages.video,
      gig_extras: [
        { title: "Vertical reel version", price: 4500 },
        { title: "Subtitle pack", price: 3500 },
      ],
      gig_tags: ["video", "editing", "promo", "reels"],
    }),
  ]);

  const orders = await Order.insertMany([
    {
      gig_id: gigs[0]._id,
      client_id: client._id,
      freelancer_id: designer._id,
      total_amount: gigs[0].price,
      status: "Completed",
      delivery_date: new Date("2026-05-04T12:00:00.000Z"),
      requirements: "Need a bold identity for a student startup named CampusCart.",
      revision_count: 1,
    },
    {
      gig_id: gigs[2]._id,
      client_id: startup._id,
      freelancer_id: developer._id,
      total_amount: gigs[2].price,
      status: "In Progress",
      delivery_date: new Date("2026-05-15T12:00:00.000Z"),
      requirements: "Build a marketplace MVP with login, gig listing, and order tracking.",
      revision_count: 0,
    },
    {
      gig_id: gigs[4]._id,
      client_id: client._id,
      freelancer_id: marketer._id,
      total_amount: gigs[4].price,
      status: "Completed",
      delivery_date: new Date("2026-05-07T12:00:00.000Z"),
      requirements: "Create Instagram and LinkedIn campaign plan for launch week.",
      revision_count: 0,
    },
  ]);

  await Transaction.insertMany([
    { order_id: orders[0]._id, amount: orders[0].total_amount, status: "Completed" },
    { order_id: orders[1]._id, amount: orders[1].total_amount, status: "Pending" },
    { order_id: orders[2]._id, amount: orders[2].total_amount, status: "Completed" },
  ]);

  await Review.insertMany([
    {
      order_id: orders[0]._id,
      reviewer_id: client._id,
      reviewee_id: designer._id,
      rating: 5,
      comment: "The brand kit looked polished and was delivered before the deadline.",
    },
    {
      order_id: orders[2]._id,
      reviewer_id: client._id,
      reviewee_id: marketer._id,
      rating: 5,
      comment: "Clear strategy, useful calendar, and very easy to present.",
    },
  ]);

  await Messages.insertMany([
    {
      sender_id: client._id,
      receiver_id: designer._id,
      content: "Hi Zara, can you make the logo feel premium but still student-friendly?",
      is_read: true,
    },
    {
      sender_id: designer._id,
      receiver_id: client._id,
      content: "Absolutely. I will send two style directions first so you can choose the tone.",
      is_read: false,
    },
    {
      sender_id: startup._id,
      receiver_id: developer._id,
      content: "Ali, the MVP needs client and freelancer dashboards before demo day.",
      is_read: true,
    },
    {
      sender_id: developer._id,
      receiver_id: startup._id,
      content: "Got it. I will finish the API wiring first, then polish the dashboards.",
      is_read: false,
    },
  ]);

  console.log("Demo data seeded successfully.");
  console.log(`Created ${createdUsers.length} users, ${gigs.length} gigs, ${orders.length} orders.`);
  console.log("Demo logins:");
  console.log(`  Admin:      admin@liverr.demo / ${demoPassword}`);
  console.log(`  Client:     client@liverr.demo / ${demoPassword}`);
  console.log(`  Freelancer: developer@liverr.demo / ${demoPassword}`);
}

try {
  await seed();
} catch (error) {
  console.error("Failed to seed demo data:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
