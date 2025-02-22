import { hash, verify } from "argon2";
import User from "../usuarios/usuario.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const { body: data } = req;
        const encryptedPassword = await hash(data.password);
        
        const user = await User.create({
            ...data,
            password: encryptedPassword
        });

        return res.status(201).json({
            message: "El usuario ha sido creado",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.error("Error al registrar el usuario:", err);
        return res.status(500).json({
            message: "Error al registrar el usuario",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el usuario con el correo ingresado"
            });
        }

        const validPassword = await verify(usuario.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(usuario.id);

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                token
            }
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            message: "Inicio de sesión fallido, error del servidor",
            error: err.message
        });
    }
};