import { Router } from "express";
import { createPublication, editPublication, deletePublication, getPublications } from "./publicaciones.controller.js";
import { validarJWT } from "../helpers/validar-jwt.js";
import { crearPublicacionValidator, editarPublicacionValidator, eliminarPublicacionValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

router.post("/createPublication", [validarJWT, crearPublicacionValidator], createPublication);
router.put("/editPublication/:id", [validarJWT, editarPublicacionValidator], editPublication);
router.delete("/deletePublication/:id", [validarJWT, eliminarPublicacionValidator], deletePublication);
router.get("/getPublications", getPublications);

export default router;