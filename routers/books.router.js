import express from "express";
import * as booksController from "../controllers/books.controller.js";
import modifyingBookValidator from "../middlewares/modifyingBook.validator.js";

const router = express.Router();

router.get("/", booksController.list);
router.get("/:id", booksController.get);
router.patch("/:id", modifyingBookValidator, booksController.modify);

export default router;
