import express from 'express';
import { ReceivableController } from '../controllers/receivable.controller';

const router = express.Router();
const receivableController = new ReceivableController();

router.post('/', receivableController.create);
router.get('/', receivableController.getAll);
router.get('/:id', receivableController.getById);
router.put('/:id', receivableController.update);
router.delete('/:id', receivableController.delete);

export { router as receivableRoutes };
