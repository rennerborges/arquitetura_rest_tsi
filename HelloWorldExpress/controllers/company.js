let companies = [
  {
    id: 1,
    nome: 'Google',
    email: 'renner@mail.com',
    cnpj: 51947847000119,
    status: 'ativo',
  },
  {
    id: 2,
    nome: 'Microsoft',
    email: 'rafael@mail.com',
    cnpj: 80410839000137,
    status: 'inativo',
  },
];

module.exports = {
  getAllCompanies: (req, res, next) => {
    const { filterStatus } = req.query;

    let companiesResponse = [...companies];

    if (filterStatus) {
      companiesResponse = companies.filter(
        (company) => company.status === 'ativo'
      );
    }

    return res.json({ company: companiesResponse });
  },
  getById: (req, res, next) => {
    const { idCompany } = req.params;

    const company = companies.find(
      (company) => company.id === Number(idCompany)
    );

    if (!company) {
      return res.status(404).send();
    }

    return res.json({ company });
  },
  addCompany: (req, res, next) => {
    const { nome, email, cnpj } = req.body;

    let newCompany = {
      id: companies.length + 1,
      nome,
      email,
      cnpj,
      status: 'ativo',
    };

    companies.push(newCompany);

    return res.status(201).json({ company: newCompany });
  },
  deleteCompany: (req, res, next) => {
    const { idCompany } = req.params;

    const indexCompany = companies.findIndex(
      (company) => company.id === Number(idCompany)
    );

    if (indexCompany === -1) {
      return res.status(404).send();
    }

    companies.splice(indexCompany, 1);

    return res.status(200).send();
  },
  updateCompany: (req, res, next) => {
    const { idCompany } = req.params;
    const { nome, email, cnpj } = req.body;

    const company = companies.find(
      (company) => company.id === Number(idCompany)
    );

    if (!company) {
      return res.status(404).send();
    }

    if (nome) company.nome = nome;
    if (email) company.email = email;
    if (cnpj) company.cnpj = cnpj;

    return res.json({ company });
  },
};
