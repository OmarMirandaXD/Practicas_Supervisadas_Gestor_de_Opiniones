import mongoose from 'mongoose';
import { hash } from 'argon2';
import Usuario from '../src/usuarios/usuario.model.js';
import Categoria from '../src/categorias/categorias.model.js';

const createDefaultAdmin = async () => {
    try {
        const adminExists = await Usuario.findOne({ role: "ADMIN_ROLE" });
        if (!adminExists) {
            const adminData = {
                name: "Admin",
                surname: "User",
                username: "admin",
                email: "admin@example.com",
                password: await hash("adminpassword"), // Cambia "adminpassword" por la nueva contraseña si es necesario
                phone: "12345678",
                role: "ADMIN_ROLE"
            };
            await Usuario.create(adminData);
            console.log("Admin user created successfully");
        } else {
            console.log("Admin user already exists");
        }

        const categoryExists = await Categoria.findOne({ nombre: "Default Category" });
        if (!categoryExists) {
            const categoryData = {
                nombre: "Default Category",
                descripcion: "Esta es una categoría predeterminada"
            };
            await Categoria.create(categoryData);
            console.log("Default category created successfully");
        } else {
            console.log("Default category already exists");
        }
    } catch (err) {
        console.error("Error creating admin user or default category:", err);
    }
};

export default createDefaultAdmin;