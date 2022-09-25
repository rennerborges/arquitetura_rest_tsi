const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  isValidFormatId: (id) => ObjectId.isValid(id),
};
