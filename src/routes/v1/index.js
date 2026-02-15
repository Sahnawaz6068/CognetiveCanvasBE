import express from 'express';
import userController from '../../controllers/user-controller.js';
import AI from '../../ai/aippt.js';
import pptOperation from '../../ai/pptOperation.js';

const router = express.Router();

router.post(
    '/signup',
    userController.signup
);


router.get('/get2',userController.check);

router.post('/ai-ppt',AI.generateJsonPpt);
router.post('/save-ppt',pptOperation.savePpt);

export default router;