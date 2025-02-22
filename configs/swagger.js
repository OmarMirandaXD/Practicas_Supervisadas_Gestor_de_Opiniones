import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Practicas_Supervisadas_Gestor_de_Opiniones",
            version: "1.0.0",
            description: "API para gestor de Opiniones",
            contact:{
                name: "Ludwin Omar Xocoy Miranda",
                email: "omar.xocoy2007@gmail.com"
            }
        },
        servers:[
            {
                url: "http://localhost:3001/practicasS/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/usuarios/usuario.routes.js",
        "./src/publicaciones/publicaciones.routes.js",
        "./src/comentarios/comentarios.routes.js",
        "./src/categorias/categorias.routes.js",        
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}