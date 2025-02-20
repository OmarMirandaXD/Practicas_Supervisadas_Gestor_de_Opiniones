"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js";
import usuarioRoutes from "../src/usuarios/usuario.routes.js";
import publicacionesRoutes from "../src/publicaciones/publicaciones.routes.js";
import comentariosRoutes from "../src/comentarios/comentarios.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js"

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
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

const routes = (app) => {
    app.use("/practicasS/v1/auth", authRoutes);
    app.use("/practicasS/v1/usuario", usuarioRoutes);
    app.use("/practicasS/v1/publicaciones", publicacionesRoutes);
    app.use("/practicasS/v1/comentarios", comentariosRoutes);
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}
