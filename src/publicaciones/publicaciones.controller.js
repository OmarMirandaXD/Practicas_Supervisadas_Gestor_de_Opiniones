import Publicacion from "./publicaciones.model.js";
import Categoria from "../categorias/categorias.model.js";

export const createPublication = async (req, res) => {
    try {
        const data = req.body;
        const autor = req.usuario._id;

        let categoria;
        if (data.categoria) {
            categoria = await Categoria.findById(data.categoria);
            if (!categoria) {
                return res.status(404).json({
                    success: false,
                    msg: "Categoría no encontrada"
                });
            }
        } else {
            categoria = await Categoria.findOne({ nombre: "Default Category" });
            if (!categoria) {
                return res.status(500).json({
                    success: false,
                    msg: "Categoría predeterminada no encontrada"
                });
            }
        }

        const nuevaPublicacion = new Publicacion({ ...data, autor, categoria: categoria._id });
        await nuevaPublicacion.save();

        res.status(201).json({
            success: true,
            msg: 'Publicación agregada',
            publicacion: nuevaPublicacion,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al agregar la publicación',
            error: err.message
        });
    }
};

export const editPublication = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const publicacion = await Publicacion.findById(id);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }

        if (publicacion.autor.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                msg: "No tienes permiso para editar esta publicación"
            });
        }

        await publicacion.editar(data.titulo, data.categoria, data.texto);

        res.status(200).json({
            success: true,
            publicacion
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al editar la publicación",
            error: err.message
        });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await Publicacion.findById(id);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }

        if (publicacion.autor.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                msg: "No tienes permiso para eliminar esta publicación"
            });
        }

        await Publicacion.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Publicación eliminada"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar la publicación",
            error: err.message
        });
    }
};

export const getPublications = async (_req, res) => {
    try {
        const publicaciones = await Publicacion.find();

        res.status(200).json({
            success: true,
            publicaciones
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener las publicaciones",
            error: err.message
        });
    }
};