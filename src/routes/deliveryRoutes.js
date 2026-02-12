const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Delivery
 *   description: Delivery management
 */

/**
 * @swagger
 * /delivery:
 *   post:
 *     summary: Add delivery details for an order
 *     tags: [Delivery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId: { type: integer, example: 1 }
 *               method: { type: string, enum: ["Pickup", "Delivery"] }
 *               location: { type: string, example: Palmgreve Estate }
 *     responses:
 *       200: { description: Delivery details added }
 */
router.post("/", auth, deliveryController.addDelivery);

module.exports = router;
