import express from 'express';
import userController from '../../controllers/user-controller.js';

const router = express.Router();

router.post(
    '/signup',
    userController.signup
);

router.get('/get',(req, res) => {
    res.send('<h1>Home2</h1>');
})
router.get('/get2',userController.check);

export default router;