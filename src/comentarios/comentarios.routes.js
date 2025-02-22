import { Router } from "express";
import { createComment, getAllComments, getCommentById, updateCommentById, deleteCommentById } from "./comentarios.controller.js";
import { comentarioValidator } from "../middlewares/comentarios-validator.js";

const router = Router();

router.post("/addComment/:id", comentarioValidator, createComment);
router.get("/getAllComments", getAllComments);
router.get("/getComment/:id", getCommentById);
router.put("/updateComment/:commentId/:id", comentarioValidator, updateCommentById);
router.delete("/deleteComment/:commentId/:id", deleteCommentById);

export default router;