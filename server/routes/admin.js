import express from 'express';

//Controllers
import AuthController from '../controllers/admin/auth';
import AdminController from '../controllers/admin/admin';

//Middleware
import auth from '../middleware/admin_auth';
import super_auth from '../middleware/admin_super';
import adminValidation from '../validations/admin';

var router = express.Router();

router.post('/login', AuthController.login);

router.get('/admins', auth, super_auth, AdminController.fetch);
router.post('/admins', auth, super_auth, adminValidation, AdminController.create);

export default router;