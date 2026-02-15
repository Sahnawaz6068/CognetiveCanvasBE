import express from 'express';
import userController from '../../controllers/user-controller.js';
import AI from '../../ai/aippt.js'

const router = express.Router();

router.post(
    '/signup',
    userController.signup
);


router.get('/get2',userController.check);

router.post('/ai-ppt',AI.generateJsonPpt);

export default router;