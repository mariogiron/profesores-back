import mongoose from 'mongoose';

const profesorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
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
    especialidad: {
        type: String,
        required: [true, 'La especialidad es obligatoria'],
    },
    experiencia: {
        type: Number,
        default: 0,
        min: [0, 'La experiencia no puede ser negativa'],
    },
});

export default mongoose.model('Profesor', profesorSchema);
