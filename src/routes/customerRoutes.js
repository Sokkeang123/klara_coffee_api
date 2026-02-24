const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const customerController = require("../controllers/customerController");

router.get("/", auth, role("Admin"), customerController.getCustomers);

module.exports = router;