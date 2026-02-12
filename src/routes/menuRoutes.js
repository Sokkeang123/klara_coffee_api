const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Coffee menu management
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     responses:
 *       200: { description: List of menu items }
 */
router.get("/", auth, menuController.getAllMenu);

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Add a new menu item (Admin only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: Latte }
 *               description: { type: string, example: Hot coffee with milk }
 *               price: { type: number, example: 2.5 }
 *     responses:
 *       201: { description: Menu item created }
 *       401: { description: Unauthorized }
 */
router.post("/", auth, role("Admin"), menuController.createMenu);

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Update a menu item (Admin only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *     responses:
 *       200: { description: Menu item updated }
 */
router.put("/:id", auth, role("Admin"), menuController.updateMenu);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Delete a menu item (Admin only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Menu item deleted }
 */
router.delete("/:id", auth, role("Admin"), menuController.deleteMenu);

module.exports = router;
