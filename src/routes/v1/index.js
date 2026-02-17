import express from 'express';
import userController from '../../controllers/user-controller.js';
import AI from '../../ai/aippt.js';
import pptOperation from '../../ai/pptOperation.js';
import { createOrUpdateCanvas } from '../../controllers/canvas-controller.js';

const router = express.Router();

router.post(
    '/signup',
    userController.signup
);
router.post('/signin', userController.signin);

router.get('/get2',userController.check);

router.post('/ai-ppt',AI.generateJsonPpt);
router.post('/save-ppt',pptOperation.savePpt);
router.get('/ppt',pptOperation.getAllPPT);
router.get('/ppt/:id',pptOperation.getSinglePPT);


router.patch('/canvas', createOrUpdateCanvas);

export default router;