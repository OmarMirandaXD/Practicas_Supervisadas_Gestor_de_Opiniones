import jwt from "jsonwebtoken"
import User from "../usuarios/usuario.model.js"

export const validarJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "There is no token in the request"
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid } = jwt.verify(token, process.env.KEY)

        const user = await User.findById(uid)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist in the DB"
            })
        }

        if (user.status === false) {
            return res.status(400).json({
                success: false,
                message: "Previously deactivated user"
            })
        }

        req.usuario = user
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error validating token",
            error: err.message
        })
    }
}