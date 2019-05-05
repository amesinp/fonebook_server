import express from 'express';

//Controllers
import AuthController from '../controllers/admin/auth';
import AdminController from '../controllers/admin/admin';
import CountryCountroller from '../controllers/admin/country';

//Middleware
import auth from '../middleware/admin_auth';
import super_auth from '../middleware/admin_super';
import adminValidation from '../validations/admin';
import countryValidation from '../validations/country';

var router = express.Router();

router.post('/login', AuthController.login);

router.get('/admins', auth, super_auth, AdminController.fetch);
router.post('/admins', auth, super_auth, adminValidation, AdminController.create);

router.get('/countries', auth, CountryCountroller.fetch);
router.post('/countries', auth, countryValidation, CountryCountroller.create);
router.get('/countries/:id', auth, CountryCountroller.fetchOne);
router.put('/countries/:id', auth, countryValidation, CountryCountroller.updateOne);

export default router;