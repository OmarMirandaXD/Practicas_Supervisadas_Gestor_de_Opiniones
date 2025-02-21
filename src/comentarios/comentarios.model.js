import { Schema, model } from "mongoose";

const comentarioSchema = new Schema({
    texto: {
        type: String,
        required: [true, "El texto del comentario es requerido"]
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: "Publicacion",
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model("Comentario", comentarioSchema);