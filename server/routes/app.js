import express from 'express';

//Controllers
import AuthController from '../controllers/auth';

//Middleware
import auth from '../middleware/auth';
import userValidation from '../validations/user';

var router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', userValidation, AuthController.register);

export default router;