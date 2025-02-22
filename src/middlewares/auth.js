import jwt from "jsonwebtoken";
import Usuario from "../usuarios/usuario.model.js";

export const isAdmin = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return res.status(400).json({
                success: false,
                msg: "No hay token en la petición"
            });
        }

        token = token.replace(/^Bearer\s+/, "");

        const { uid } = jwt.verify(token, process.env.KEY);

        const user = await Usuario.findById(uid);

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Usuario no existe en la base de datos"
            });
        }

        if (user.status === false) {
            return res.status(400).json({
                success: false,
                msg: "Usuario previamente desactivado"
            });
        }

        if (user.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                success: false,
                msg: "No tienes permiso para realizar esta acción"
            });
        }

        req.usuario = user;
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al validar el token",
            error: err.message
        });
    }
};