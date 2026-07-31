import Estudiante from '../models/estudiante.model.js';

export const getEstudiantes = async (req, res) => {
    const estudiantes = await Estudiante.find().populate('curso');
    res.json(estudiantes);
};

export const getEstudianteById = async (req, res) => {
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id).populate('curso');
    if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json(estudiante);
};

export const createEstudiante = async (req, res) => {
    const estudiante = await Estudiante.create(req.body);
    res.json(estudiante);
};

export const updateEstudiante = async (req, res) => {
    const { id } = req.params;
    const estudiante = await Estudiante.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json(estudiante);
};

export const deleteEstudiante = async (req, res) => {
    const { id } = req.params;
    const estudiante = await Estudiante.findByIdAndDelete(id);
    if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json({ message: 'Estudiante eliminado' });
};
