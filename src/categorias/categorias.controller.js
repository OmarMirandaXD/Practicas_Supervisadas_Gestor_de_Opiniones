import Categoria from "./categorias.model.js";

export const createCategory = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const nuevaCategoria = new Categoria({ nombre, descripcion });
        await nuevaCategoria.save();

        res.status(201).json({
            success: true,
            msg: 'Categoría creada',
            categoria: nuevaCategoria,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al crear la categoría',
            error: err.message
        });
    }
};

export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({
                success: false,
                msg: "Categoría no encontrada"
            });
        }

        categoria.nombre = nombre || categoria.nombre;
        categoria.descripcion = descripcion || categoria.descripcion;
        categoria.fechaActualizacion = Date.now();

        await categoria.save();

        res.status(200).json({
            success: true,
            msg: 'Categoría actualizada',
            categoria
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la categoría',
            error: err.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({
                success: false,
                msg: "Categoría no encontrada"
            });
        }

        await Categoria.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: 'Categoría eliminada'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar la categoría',
            error: err.message
        });
    }
};

export const getCategories = async (_req, res) => {
    try {
        const categorias = await Categoria.find();

        res.status(200).json({
            success: true,
            categorias
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener las categorías',
            error: err.message
        });
    }
};