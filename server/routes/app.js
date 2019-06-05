import express from 'express';

//Controllers
import AuthController from '../controllers/auth';
import UserController from '../controllers/user';
import CountryController from '../controllers/country';

//Middleware
import auth from '../middleware/auth';
import userValidation from '../validations/user';

var router = express.Router();

router.get('/countries', CountryController.fetch);

router.post('/login', AuthController.login);
router.post('/loginsocial', AuthController.loginSocial);
router.post('/register', userValidation, AuthController.register);

router.get('/profile', auth, UserController.profile);

export default router;