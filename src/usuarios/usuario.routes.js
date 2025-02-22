import { Router } from "express";
import { getUserById, getUsers, updatePassword, updateUser } from "./usuario.controller.js";
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/usuario-validator.js";

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);
router.get("/", getUsers);
router.put("/updatePassword/:uid", updatePasswordValidator, updatePassword);
router.put("/updateUser/:uid", updateUserValidator, updateUser);

export default router;