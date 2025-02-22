import { Schema, model } from "mongoose";

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la categoría es obligatorio"],
        unique: true,
        maxLength: [50, "El nombre de la categoría no puede exceder los 50 caracteres"]
    },
    descripcion: {
        type: String,
        maxLength: [250, "La descripción no puede exceder los 250 caracteres"]
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

categoriaSchema.statics.createDefaultCategory = async function() {
    const defaultCategory = await this.findOne({ nombre: "General" });
    if (!defaultCategory) {
        await this.create({ nombre: "General", descripcion: "Categoría por defecto" });
    }
};

export default model("Categoria", categoriaSchema);