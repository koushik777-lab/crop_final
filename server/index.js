import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@energic.in";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// --- Mongoose Schemas & Models ---
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  image: String
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  benefits: [String],
  usageGuide: String,
  safetyInstructions: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [String],
  price: Number,
  unit: String,
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

// --- Mock Data to seed if DB is empty ---
const seedCategories = [
  { name: "Fertilizers", slug: "fertilizers" },
  { name: "Pesticides", slug: "pesticides" },
  { name: "Herbicides", slug: "herbicides" },
  { name: "Growth Regulators", slug: "growth-regulators" },
  { name: "Organic Products", slug: "organic-products" }
];

async function seedDatabaseIfEmpty() {
  const catCount = await Category.countDocuments();
  if (catCount === 0) {
    console.log("Database is empty. Seeding initial categories and products...");
    const createdCats = await Category.insertMany(seedCategories);
    
    const seedProducts = [
      {
        name: "EnergicN Nitrogen Booster",
        slug: "energicn-nitrogen-booster",
        description: "High quality nitrogen fertilizer for rapid plant growth and healthy leaves.",
        category: createdCats.find(c => c.slug === "fertilizers")._id,
        price: 1200,
        unit: "50kg bag",
        inStock: true,
        featured: true
      },
      {
        name: "CropShield Organic Pesticide",
        slug: "cropshield-organic-pesticide",
        description: "Eco-friendly pest control solution safe for organic farming.",
        category: createdCats.find(c => c.slug === "pesticides")._id,
        price: 850,
        unit: "1L bottle",
        inStock: true,
        featured: true
      },
      {
        name: "GrowMax Plant Regulator",
        slug: "growmax-plant-regulator",
        description: "Advanced hormonal balance for enhanced fruit and flower growth.",
        category: createdCats.find(c => c.slug === "growth-regulators")._id,
        price: 450,
        unit: "500ml",
        inStock: true,
        featured: true
      },
      {
        name: "EarthCare Organic Compost",
        slug: "earthcare-organic-compost",
        description: "Rich organic matter to improve soil health and water retention.",
        category: createdCats.find(c => c.slug === "organic-products")._id,
        price: 600,
        unit: "40kg bag",
        inStock: true,
        featured: true
      }
    ];
    await Product.insertMany(seedProducts);
    console.log("Seeding complete!");
  }
}

// --- API Routes ---
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const { category, featured, search, limit = 12, page = 1 } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (featured === "true") query.featured = true;
    if (search) query.name = { $regex: search, $options: "i" };

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category")
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    res.json({
      products,
      total,
      page: parsedPage,
      pages: Math.ceil(total / parsedLimit) || 1
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

app.get("/api/products/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

app.get("/api/inquiries", async (req, res) => {
  res.json([]);
});

app.post("/api/inquiries", async (req, res) => {
  const { name, email, phone, company, message, type, product } = req.body;
  
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Energic Crop Science" <${process.env.EMAIL_USER}>`,
      to: "koushiksarkar741777@gmail.com",
      subject: `New Inquiry: ${type.toUpperCase()} from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f0fdf4; border: 1px solid #dcfce7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #166534 0%, #15803d 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">New Business Inquiry</h1>
            <p style="color: #dcfce7; margin: 5px 0 0 0; font-size: 14px;">Energic Crop Science Platform</p>
          </div>
          
          <div style="padding: 30px; background-color: white;">
            <div style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #f0fdf4;">
              <h2 style="color: #166534; font-size: 18px; margin-top: 0;">Sender Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
                  <td style="padding: 8px 0; color: #166534; font-size: 14px; font-weight: 600;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${phone}</td>
                </tr>
                ${company ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Company:</td><td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${company}</td></tr>` : ''}
              </table>
            </div>

            <div style="margin-bottom: 25px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #16a34a;">
              <h2 style="color: #166534; font-size: 16px; margin-top: 0;">Inquiry Info</h2>
              <p style="margin: 5px 0; font-size: 14px; color: #475569;">Type: <span style="color: #16a34a; font-weight: 700;">${type.replace('_', ' ').toUpperCase()}</span></p>
              ${product ? `<p style="margin: 5px 0; font-size: 14px; color: #475569;">Interested Product: <span style="color: #16a34a; font-weight: 700;">${product}</span></p>` : ''}
            </div>

            <div>
              <h2 style="color: #166534; font-size: 18px; margin-top: 0;">Message Content</h2>
              <div style="padding: 20px; background-color: #f0fdf4; border-radius: 12px; color: #1e293b; font-size: 14px; line-height: 1.6; border: 1px dashed #bbf7d0;">
                ${message}
              </div>
            </div>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">This email was automatically generated by the Energic Crop Science Contact System.</p>
            <p style="color: #16a34a; font-size: 12px; font-weight: bold; margin-top: 5px;">© 2026 Energic Crop Science. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.get("/api/orders", async (req, res) => {
  res.json([]);
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ token: "mock-admin-token", user: { id: "u1", name: "Admin", email, role: "admin" } });
  } else if (email && password) {
    res.json({ token: "mock-user-token", user: { id: "u2", name: "User", email, role: "user" } });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/auth/register", (req, res) => {
  res.json({ token: "mock-token", user: { id: "u2", name: req.body.name, email: req.body.email, role: "user" } });
});

app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.includes("mock-admin-token")) {
    res.json({ user: { id: "u1", name: "Admin", email: ADMIN_EMAIL, role: "admin" } });
  } else {
    res.json({ user: { id: "u2", name: "User", email: "user@example.com", role: "user" } });
  }
});

// --- CRUD Endpoints ---
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      slug: req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const newCategory = new Category({
      ...req.body,
      slug: req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    });
    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
});

app.patch("/api/inquiries/:id/status", async (req, res) => {
  // In a full implementation, you'd update the Inquiry model here
  res.json({ success: true });
});

app.patch("/api/orders/:id/status", async (req, res) => {
  // In a full implementation, you'd update the Order model here
  res.json({ success: true });
});

app.post("/api/seed", async (req, res) => {
  try {
    await seedDatabaseIfEmpty();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error seeding", error });
  }
});

// Database connection & Server start
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      console.log("Connected to MongoDB!");
      await seedDatabaseIfEmpty();
    })
    .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.log("WARNING: No MONGODB_URI provided. App might not function properly without DB.");
}

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
