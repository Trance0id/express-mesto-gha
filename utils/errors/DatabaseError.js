module.exports = class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
