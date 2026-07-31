// Creation and configuration of the Express APP

import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

import cursosRoutes from './routes/cursos.routes.js';
// Route configuration
import estudiantesRoutes from './routes/estudiantes.routes.js';
import profesoresRoutes from './routes/profesores.routes.js';

app.use('/estudiantes', estudiantesRoutes);
app.use('/cursos', cursosRoutes);
app.use('/profesores', profesoresRoutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found',
    });
});

// Error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errores = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json(errores);
    }
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

export default app;
