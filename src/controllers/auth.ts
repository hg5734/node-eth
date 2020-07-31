import * as express from 'express';
import UserService from '../services/auth/index';
import CustomResponse from '../utils/response';

export default class AuthController {

  static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req.body };
      const answer = await UserService.login(reqBody);
      const response = new CustomResponse();
      return response.setResponse(res, { result: answer });
    }
    catch (error) {
      next(error);
    }
  }
}
