class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    // this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
