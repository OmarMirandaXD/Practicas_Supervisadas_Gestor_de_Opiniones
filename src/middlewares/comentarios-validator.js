import { body } from "express-validator";
import { validarCampos } from "./validate-campos.js";

export const comentarioValidator = [
    body("texto").notEmpty().withMessage("El texto del comentario es requerido"),
    validarCampos
];