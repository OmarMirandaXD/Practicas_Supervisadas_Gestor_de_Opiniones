import { hash, verify } from "argon2";
import Usuario from "./usuario.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            usuario
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            usuarios
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newPassword } = req.body;
        const usuario = await Usuario.findById(uid);
        const contrasenaIgual = await verify(usuario.password, newPassword);

        if (contrasenaIgual) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }
        const contrasenaEncriptada = await hash(newPassword);
        await Usuario.findByIdAndUpdate(uid, { password: contrasenaEncriptada }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            usuario: usuarioActualizado,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let nuevaFotoPerfil = req.file ? req.file.filename : null;

        if (!nuevaFotoPerfil) {
            return res.status(400).json({
                success: false,
                msg: 'No se proporcionó una nueva foto de perfil',
            });
        }

        const usuario = await Usuario.findById(uid);

        if (usuario.profilePicture) {
            const rutaFotoPerfilAntigua = join(__dirname, "../../public/uploads/profile-pictures", usuario.profilePicture);
            await fs.unlink(rutaFotoPerfilAntigua);
        }

        usuario.profilePicture = nuevaFotoPerfil;
        await usuario.save();

        res.status(200).json({
            success: true,
            msg: 'Foto de perfil actualizada',
            usuario,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto de perfil',
            error: err.message
        });
    }
};