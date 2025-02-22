import { Router } from "express";
import { createPublication, editPublication, deletePublication, getPublications } from "./publicaciones.controller.js";
import { crearPublicacionValidator, editarPublicacionValidator, eliminarPublicacionValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

router.post("/createPublication", crearPublicacionValidator, createPublication);
router.put("/editPublication/:id", editarPublicacionValidator, editPublication);
router.delete("/deletePublication/:id", eliminarPublicacionValidator, deletePublication);
router.get("/getPublications", getPublications);

export default router;