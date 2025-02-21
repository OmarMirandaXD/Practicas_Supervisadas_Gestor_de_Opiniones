import { Schema, model } from "mongoose";

const publicacionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El título es requerido"],
        maxLength: [100, "El título no puede exceder los 100 caracteres"]
    },
    categoria: {
        type: String,
        required: [true, "La categoría es requerida"]
    },
    texto: {
        type: String,
        required: [true, "El texto es requerido"]
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
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

publicacionSchema.methods.editar = function (nuevoTitulo, nuevaCategoria, nuevoTexto) {
    if (nuevoTitulo) this.titulo = nuevoTitulo;
    if (nuevaCategoria) this.categoria = nuevaCategoria;
    if (nuevoTexto) this.texto = nuevoTexto;
    this.fechaActualizacion = Date.now();
    return this.save();
};

publicacionSchema.methods.eliminar = function (usuarioId) {
    if (this.autor.toString() === usuarioId.toString()) {
        return this.remove();
    } else {
        throw new Error("No tienes permiso para eliminar esta publicación");
    }
};

export default model("Publicacion", publicacionSchema);