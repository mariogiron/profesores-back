import Router from 'express';

const router = Router();

import { createCurso } from '../controllers/cursos.controller.js';

router.post('/', createCurso);

export default router;
