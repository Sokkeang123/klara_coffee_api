const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment endpoints
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId: { type: string, example: ORD12345 }
 *               method: { type: string, enum: [QR, Card, Cash], example: QR }
 *               amount: { type: number, example: 2.5 }
 *     responses:
 *       200: { description: Payment created }
 */
router.post("/", auth, paymentController.addPayment);

/**
 * @swagger
 * /payment/confirm:
 *   post:
 *     summary: Confirm a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentId: { type: string, example: PAY12345 }
 *     responses:
 *       200: { description: Payment confirmed }
 */
router.post("/confirm", auth, paymentController.confirmPayment);

module.exports = router;
