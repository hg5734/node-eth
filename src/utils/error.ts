
export default class CustomError extends Error {
  code: number

  type : any

  constructor({ message, type = 'UNKNOWN', code = 500 }) {
    super(message);

    this.type = type;
    this.message = message;
    this.code = code;
    this.name = this.constructor.name;
  }
}
