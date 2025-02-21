import Comentario from './comentarios.model.js';

export const createComment = async (req, res) => {
    try {
        const newComment = new Comentario(req.body);
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comentario.find().populate('autor').populate('publicacion');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const comment = await Comentario.findById(req.params.id).populate('autor').populate('publicacion');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCommentById = async (req, res) => {
    try {
        const updatedComment = await Comentario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const deletedComment = await Comentario.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};