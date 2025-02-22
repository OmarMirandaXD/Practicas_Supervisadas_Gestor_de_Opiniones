"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import mongoose from "mongoose" // Importa mongoose
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js";
import usuarioRoutes from "../src/usuarios/usuario.routes.js";
import publicacionesRoutes from "../src/publicaciones/publicaciones.routes.js";
import comentariosRoutes from "../src/comentarios/comentarios.routes.js";
import categoriasRoutes from "../src/categorias/categorias.routes.js"; 
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import createDefaultAdmin from "./createAdmin.js"; // Importa la función para crear el administrador y la categoría por defecto
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const conectarDB = async () => {
    try {
        await dbConnection();
        await createDefaultAdmin(); // Crea el administrador y la categoría por defecto después de conectar a la base de datos
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
}

const routes = (app) => {
    app.use("/practicasS/v1/auth", authRoutes);
    app.use("/practicasS/v1/usuario", usuarioRoutes);
    app.use("/practicasS/v1/publicaciones", publicacionesRoutes);
    app.use("/practicasS/v1/comentarios", comentariosRoutes);
    app.use("/practicasS/v1/categorias", categoriasRoutes);
}

export const initServer = async () => {
    const app = express();
    try {
        middlewares(app);
        await conectarDB();
        routes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
}