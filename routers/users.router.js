import express from "express";
import * as usersController from "../controllers/users.controller.js";
import deleteValidator from "../middlewares/deleteUser.validator.js";

const router = express.Router();

router.post("/", usersController.create);
router.get("/:id/books", usersController.list);
router.delete("/:id", deleteValidator, usersController.destroy);

export default router;
