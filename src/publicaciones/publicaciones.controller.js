import Publicacion from "./publicaciones.model.js";

export const createPublication = async (req, res) => {
    try {
        const { titulo, categoria, texto } = req.body;
        const autor = req.usuario._id;

        const nuevaPublicacion = new Publicacion({ titulo, categoria, texto, autor });
        await nuevaPublicacion.save();

        res.status(201).json({
            success: true,
            publicacion: nuevaPublicacion
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al crear la publicación",
            error: err.message
        });
    }
};

export const editPublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, categoria, texto } = req.body;
        const publicacion = await Publicacion.findById(id);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        if (publicacion.autor.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para editar esta publicación"
            });
        }

        await publicacion.editar(titulo, categoria, texto);

        res.status(200).json({
            success: true,
            publicacion
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al editar la publicación",
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
                message: "Publicación no encontrada"
            });
        }

        if (publicacion.autor.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para eliminar esta publicación"
            });
        }

        await Publicacion.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Publicación eliminada"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: err.message
        });
    }
};

export const getPublications = async (_req, res) => {
    try {
        const publicaciones = await Publicacion.find().populate("autor", "name username");

        res.status(200).json({
            success: true,
            publicaciones
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message
        });
    }
};