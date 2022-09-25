const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelName = 'Company';

const modelSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cnpj: { type: String, required: true, unique: true },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  usuario: { type: String, required: true },
});

module.exports = mongoose.model(modelName, modelSchema);
