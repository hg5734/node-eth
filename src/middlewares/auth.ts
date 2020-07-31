import * as jwt from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';
import { vars } from '../config/vars';
import CustomError from '../utils/error';
import { errorManager } from '../config/errorManager';

const {
  TOKEN_EXPIRED,
  TOKEN_UNAUTHORIZED,
  NO_TOKEN,
} = errorManager;


const { jwtSecret, jwtExpiryTime } = vars;

export default class TokenHandler {
  static authorize() {
    return (req: Request, res: Response, next: NextFunction) =>{
      try {
        // check and verify validity of the token
        const token = req.headers['x-access-token'] || req.query.token || req.body.token;
        if (token && token != null) {
          return jwt.verify(token, jwtSecret, async (err: Error, decoded: any) => {
            if (err) {
              if (err.name === 'TokenExpiredError') {
                return next(new CustomError({ ...TOKEN_EXPIRED }));
              }
              return next(new CustomError({ ...TOKEN_UNAUTHORIZED }));
            }
            if (decoded) {
              req['decoded'] = decoded;
              return next();
            }
            return next(new CustomError({ ...TOKEN_EXPIRED }));
          });
        }
        return next(new CustomError({ ...NO_TOKEN }));
      }
      catch (err) {
        return next(new CustomError({ ...TOKEN_UNAUTHORIZED }));
      }
    }
  }


  static generate(user: any) {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * jwtExpiryTime),
      ...user
    }, jwtSecret);
  }
}
