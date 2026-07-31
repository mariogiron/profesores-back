import mongoose from 'mongoose';

const estudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios'],
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor, introduce un email válido',
        ],
    },
    edad: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
        min: [0, 'La edad no puede ser negativa'],
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
    },
});

export default mongoose.model('Estudiante', estudianteSchema);
