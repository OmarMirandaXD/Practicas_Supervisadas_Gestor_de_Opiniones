import Comentario from './comentarios.model.js';
import Publicacion from '../publicaciones/publicaciones.model.js';

export const createComment = async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const autor = req.usuario._id;

        const publicacion = await Publicacion.findById(id);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        const nuevoComentario = new Comentario({ ...data, autor, publicacion: id });
        await nuevoComentario.save();

        res.status(201).json({
            success: true,
            comentario: nuevoComentario
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error: err.message
        });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const query = {};
        const comments = await Comentario.find(query).populate('autor').populate('publicacion');
        res.status(200).json({
            success: true,
            comentarios: comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios",
            error: error.message
        });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const comment = await Comentario.findById(req.params.id).populate('autor').populate('publicacion');
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            comentario: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el comentario",
            error: error.message
        });
    }
};

export const updateCommentById = async (req, res) => {
    try {
        const data = req.body;
        const comment = await Comentario.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }
        if (comment.autor.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar este comentario'
            });
        }
        const updatedComment = await Comentario.findByIdAndUpdate(req.params.id, data, { new: true });
        res.status(200).json({
            success: true,
            comentario: updatedComment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error al actualizar el comentario",
            error: error.message
        });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const comment = await Comentario.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }
        if (comment.autor.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este comentario'
            });
        }
        await Comentario.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Comentario eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: error.message
        });
    }
};