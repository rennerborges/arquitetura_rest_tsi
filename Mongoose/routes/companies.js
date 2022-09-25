const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const CreateValidator = require('../validates/companies-create');

router.get('/', companyController.getAllCompanies);
router.get('/:idCompany', companyController.getById);
router.post('/', CreateValidator, companyController.addCompany);
router.delete('/:idCompany', companyController.deleteCompany);
router.patch('/:idCompany', companyController.updateCompany);

module.exports = router;
