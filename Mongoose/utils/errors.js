module.exports = class Error {
  static Error404(message) {
    return this.createError(message, 404);
  }
  static Error400(message) {
    return this.createError(message, 400);
  }

  static createError(message, status) {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
  }
};
