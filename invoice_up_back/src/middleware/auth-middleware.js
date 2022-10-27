import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config({ path: './variables.env' });

export function Auth() {
  return (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ auth: false, message: 'O token não foi informado.' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          auth: false,
          message: 'Falha ao autenticar o token.',
        });
      }

      req.user = decoded;

      next();
    });
  };
}

export default {
  Auth,
};
