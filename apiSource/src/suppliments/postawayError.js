export default class PostawayError extends Error {
  constructor(statusCode, errorMessage) {
    super(errorMessage);
    this.statusCode = statusCode;
  }
}
