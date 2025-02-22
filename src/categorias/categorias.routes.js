import { Router } from "express";
import { createCategory, editCategory, deleteCategory, getCategories } from "./categorias.controller.js";
import { categoriaValidator } from "../middlewares/categorias-validator.js";
import { isAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/createCategory", [isAdmin, categoriaValidator], createCategory);
router.put("/editCategory/:id", [isAdmin, categoriaValidator], editCategory);
router.delete("/deleteCategory/:id", isAdmin, deleteCategory);
router.get("/getCategories", getCategories);

export default router;