// eslint-disable-next-line no-unused-vars
import * as express from 'express';
import CustomResponse from '../utils/response';
import logger from '../utils/logger';
import CustomError from '../utils/error';
import * as expressValidation from 'express-validation';
import { errorManager } from '../config/errorManager';
const { VALIDATION_ERROR } = errorManager;

export default class ErrorHandler {
  static notFound(req: any, res: any) {
    const response = new CustomResponse();
    return response.setResponse(res, {
      status: false,
      message: 'NOT_FOUND'
    });
  }

  static handle(
    err: any,
    req?: express.Request,
    res?: express.Response,
    next? : express.NextFunction
  ): any {
    function extractErrorMsg(error: any) {
      const errormsg = error.map((er: { messages: any; }) => er.messages);
      return errormsg.toString().replace(/['"]+/g, '');
    }

    if (err instanceof expressValidation.ValidationError) {
      err = new CustomError({
        ...VALIDATION_ERROR,
        message: extractErrorMsg(err.errors)
      });
    }
    else if (!(err instanceof CustomError)) {
      if (err instanceof Error) {
        err = new CustomError({
          message: err.message
        });
      }
    }
    logger.error(`[${err.type}] [${err.message}]`);
    const response = new CustomResponse();
    return response.setResponse(res, {
      status: false,
      message: err.type,
      messageText: err.message
    });
  }
}
