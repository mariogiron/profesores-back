import mongoose from 'mongoose';

const cursoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del curso es obligatorio'],
            trim: true,
            minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
            maxlength: [100, 'El nombre no puede superar los 100 caracteres'],
        },
        descripcion: {
            type: String,
            required: [true, 'La descripción del curso es obligatoria'],
            trim: true,
            minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
            maxlength: [
                500,
                'La descripción no puede superar los 500 caracteres',
            ],
        },
        plazas: {
            type: Number,
            required: [true, 'El número de plazas es obligatorio'],
            min: [1, 'El curso debe tener al menos 1 plaza'],
            max: [1000, 'El curso no puede tener más de 1000 plazas'],
        },
        fechaInicio: {
            type: Date,
            validate: {
                validator: (value) =>
                    value instanceof Date && !Number.isNaN(value.getTime()),
                message: 'La fecha de inicio debe ser una fecha válida',
            },
        },
    },
    {
        timestamps: true,
    },
);

const Curso = mongoose.model('Curso', cursoSchema);

export default Curso;
