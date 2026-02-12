const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuId: { type: integer, example: 1 }
 *                     quantity: { type: integer, example: 2 }
 *               totalCost: { type: number, example: 5.0 }
 *     responses:
 *       200: { description: Order created successfully }
 */
router.post("/", auth, orderController.createOrder);

module.exports = router;
