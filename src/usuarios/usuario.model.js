import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        maxLength: [25, "El nombre no puede exceder los 25 caracteres"]
    },
    surname: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        maxLength: [25, "El apellido no puede exceder los 25 caracteres"]
    },
    username: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    phone: {
        type: String,
        minLength: [8, "El teléfono debe tener al menos 8 caracteres"],
        maxLength: [8, "El teléfono no puede exceder los 8 caracteres"],
        required: [true, "El teléfono es obligatorio"]
    },
    role: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: ["USUARIO_ROLE", "ADMIN_ROLE"],
        default: "USUARIO_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true 
});

usuarioSchema.methods.toJSON = function () {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

export default model("Usuario", usuarioSchema);