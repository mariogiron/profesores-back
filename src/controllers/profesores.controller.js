import Profesor from '../models/profesor.model.js';

export const getProfesores = async (req, res) => {
    const profesores = await Profesor.find();
    res.json(profesores);
};

export const getProfesorById = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findById(id);
    if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.json(profesor);
};

export const createProfesor = async (req, res) => {
    const profesor = await Profesor.create(req.body);
    res.status(201).json(profesor);
};

export const updateProfesor = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.json(profesor);
};

export const deleteProfesor = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findByIdAndDelete(id);
    if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.json({ message: 'Profesor eliminado' });
};
