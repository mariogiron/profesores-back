import Curso from '../models/curso.model.js';

export const createCurso = async (req, res) => {
    const curso = await Curso.create(req.body);
    res.json(curso);
};
