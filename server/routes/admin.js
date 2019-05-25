import express from 'express';

//Controllers
import AuthController from '../controllers/admin/auth';
import AdminController from '../controllers/admin/admin';
import CountryController from '../controllers/admin/country';
import CategoryController from '../controllers/admin/category';

//Middleware
import auth from '../middleware/admin_auth';
import super_auth from '../middleware/admin_super';
import adminValidation from '../validations/admin';
import countryValidation from '../validations/country';
import categoryValidation from  '../validations/category';
import countryContactValidation from '../validations/country_contact';

var router = express.Router();

router.post('/login', AuthController.login);

router.get('/admins', auth, super_auth, AdminController.fetch);
router.post('/admins', auth, super_auth, adminValidation, AdminController.create);

router.get('/countries', auth, CountryController.fetch);
router.post('/countries', auth, countryValidation, CountryController.create);
router.get('/countries/:id', auth, CountryController.fetchOne);
router.put('/countries/:id', auth, countryValidation, CountryController.updateOne);

router.get('/countries/:id/contacts', auth, CountryController.fetchContacts);
router.post('/countries/:id/contacts', auth, countryContactValidation, CountryController.createContact);
router.get('/countries/:id/contacts/:contactid', auth, CountryController.fetchOneContact);
router.put('/countries/:id/contacts/:contactid', auth, countryContactValidation, CountryController.updateOneContact);
router.delete('/countries/:id/contacts/:contactid', auth, CountryController.deleteOneContact);

router.get('/categories', auth, CategoryController.fetch);
router.post('/categories', auth, categoryValidation, CategoryController.create);
router.get('/categories/:id', auth, CategoryController.fetchOne);
router.put('/categories/:id', auth, categoryValidation, CategoryController.updateOne);



export default router;