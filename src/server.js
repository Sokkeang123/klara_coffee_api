const express = require("express");
const sequelize = require("./config/db");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const path = require("path");

const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
// ✅ Serve uploaded images
// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/menu", require("./routes/menuRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/payment", require("./routes/paymentRoutes"));
app.use("/delivery", require("./routes/deliveryRoutes"));
app.use("/customers", require("./routes/customerRoutes"));
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ✅ Upload error handler (multer errors / file type errors)
app.use((err, req, res, next) => {
  if (err) return res.status(400).json({ message: err.message });
  next();
});

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// sequelize.sync().then(() => {
//   app.listen(5000, () => console.log("Server running on port 5000"));
// });
