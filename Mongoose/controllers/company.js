const Company = require('../models/company');
const Error = require('../utils/errors');
const { isValidFormatId } = require('../utils/mongoose');

module.exports = {
  getAllCompanies: async (req, res, next) => {
    try {
      const companies = await Company.find();
      return res.json({ companies });
    } catch (error) {
      return next(Error.Error400(error.message));
    }
  },
  getById: async (req, res, next) => {
    const { idCompany } = req.params;

    try {
      if (!isValidFormatId(idCompany)) {
        return next(Error.Error400('Invalid id'));
      }

      const company = await Company.findById(idCompany);

      if (!company) {
        return next(Error.Error404('Company not found'));
      }

      return res.json({ company });
    } catch (error) {
      return next(Error.Error400(error.message));
    }
  },
  addCompany: async (req, res, next) => {
    const { nome, email, cnpj } = req.body;

    let newCompany = {
      nome,
      email,
      cnpj,
      usuario: 'system',
      status: 'ativo',
    };

    const company = new Company(newCompany);

    try {
      await company.save();

      return res.status(201).json({ company });
    } catch (error) {
      return next(Error.Error400(error.message));
    }
  },
  deleteCompany: async (req, res, next) => {
    const { idCompany } = req.params;

    try {
      if (!isValidFormatId(idCompany)) {
        return next(Error.Error400('Invalid id'));
      }

      const company = await Company.findByIdAndDelete(idCompany);

      if (!company) {
        return next(Error.Error404('Company not found'));
      }

      return res.status(200).send();
    } catch (error) {
      return next(Error.Error400(error.message));
    }
  },
  updateCompany: async (req, res, next) => {
    const { idCompany } = req.params;
    try {
      if (!isValidFormatId(idCompany)) {
        return next(Error.Error400('Invalid id'));
      }

      const company = await Company.findByIdAndUpdate(idCompany, {
        ...req.body,
      });

      if (!company) {
        return next(Error.Error404('Company not found'));
      }

      return res.status(200).send();
    } catch (error) {
      return next(Error.Error400(error.message));
    }
  },
};
