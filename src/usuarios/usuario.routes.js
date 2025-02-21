import { Router } from "express";
import { getUserById, getUsers, updatePassword, updateUser, updateProfilePicture } from "./usuario.controller.js";
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/usuario-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);
router.get("/", getUsers);
router.put("/updatePassword/:uid", updatePasswordValidator, updatePassword);
router.put("/updateUser/:uid", updateUserValidator, updateUser);
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

export default router;