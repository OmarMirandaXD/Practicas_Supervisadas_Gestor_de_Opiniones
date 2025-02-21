import { Router } from "express";
import { createComment, getAllComments, getCommentById, updateCommentById, deleteCommentById } from "./comentarios.controller.js";
import { validarJWT } from "../helpers/validar-jwt.js";
import { comentarioValidator } from "../middlewares/comentarios-validator.js";

const router = Router();

router.post("/addComment/:id", [validarJWT, comentarioValidator], createComment);
router.get("/getAllComments", validarJWT, getAllComments);
router.get("/getComment/:id", validarJWT, getCommentById);
router.put("/updateComment/:commentId/:id", [validarJWT, comentarioValidator], updateCommentById);
router.delete("/deleteComment/:commentId/:id", validarJWT, deleteCommentById);

export default router;