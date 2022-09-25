const mongoose = require('mongoose');

module.exports = () => {
  const url = process.env.DB || 'mongodb://localhost:27017/AulaRest';
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(url, options);

  mongoose.connection.once('open', () => {
    console.log('[Mongoose] Conectado em ' + url);
  });

  mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] Erro na conexão: ' + err);
  });
};
