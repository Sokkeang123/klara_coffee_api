const express = require("express");
const sequelize = require("./config/db");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");

const app = express();
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/menu", require("./routes/menuRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/payment", require("./routes/paymentRoutes"));
app.use("/delivery", require("./routes/deliveryRoutes"));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

sequelize.sync().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});
