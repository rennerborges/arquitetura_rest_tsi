let users = [
  { id: 1, nome: 'Renner', email: 'renner@mail.com' },
  { id: 2, nome: 'Rafael', email: 'rafael@mail.com' },
];

module.exports = {
  getAllUsers: (req, res, next) => {
    return res.json({ users });
  },
  getById: (req, res, next) => {
    const { idUser } = req.params;

    const user = users.find((user) => user.id === Number(idUser));

    if (!user) {
      return res.status(404).send();
    }

    return res.json({ user });
  },
  addUser: (req, res, next) => {
    const { nome, email } = req.body;

    let newUser = {
      id: users.length + 1,
      nome,
      email,
    };

    users.push(newUser);

    return res.status(201).json({ user: newUser });
  },
  deleteUser: (req, res, next) => {
    const { idUser } = req.params;

    const indexUser = users.findIndex((user) => user.id === Number(idUser));

    if (indexUser === -1) {
      return res.status(404).send();
    }

    users.splice(indexUser, 1);

    return res.status(200).send();
  },
  updateUser: (req, res, next) => {
    const { idUser } = req.params;
    const { nome, email } = req.body;

    const user = users.find((user) => user.id === Number(idUser));

    if (!user) {
      return res.status(404).send();
    }

    if (nome) user.nome = nome;
    if (email) user.email = email;

    return res.json({ user });
  },
};
