import express from 'express';
import { PayableController } from '../controllers/payable.controller';

const router = express.Router();
const payableController = new PayableController();

router.post('/', payableController.create);
router.get('/', payableController.getAll);
router.get('/:id', payableController.getById);
router.put('/:id', payableController.update);
router.delete('/:id', payableController.delete);

export { router as payableRoutes };
