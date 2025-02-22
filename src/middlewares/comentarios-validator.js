import { body } from "express-validator";
import { validarCampos } from "./validate-campos.js";
import { validarJWT } from "../helpers/validar-jwt.js";

export const comentarioValidator = [
    validarJWT,
    body("texto").notEmpty().withMessage("El texto del comentario es requerido"),
    validarCampos
];