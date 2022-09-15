const yup = require('yup');

const { ValidarCNPJ } = require('../utils/cnpj');

module.exports = (req, res, next) => {
  const schema = yup.object().shape({
    nome: yup.string().required('Informe o nome'),
    email: yup.string().email().required('Informe o e-mail'),
    cnpj: yup
      .string()
      .required('Informe o CNPJ')
      .test('is-valid-cnpj', 'Informe um CNPJ válido', (value) =>
        ValidarCNPJ(value)
      ),
  });

  return schema
    .validate(req.body)
    .then(() => next())
    .catch((error) => {
      error.status = 400;
      next(error);
    });
};
