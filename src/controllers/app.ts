import * as express from 'express';
import AppService from '../services/app/index';
import CustomResponse from '../utils/response';

export default class AppController {

  static async assetList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const answer = await AppService.getAssetList();
      const response = new CustomResponse();
      return response.setResponse(res, { result: answer });
    }
    catch (error) {
      next(error);
    }
  }

  static async addAsset(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req.body };
      const answer = await AppService.addAsset(reqBody);
      const response = new CustomResponse();
      return response.setResponse(res, { result: answer });
    }
    catch (error) {
      next(error);
    }
  }

  static async logsList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      let { ethAddress, assetAddress } = req.query;
      const answer = await AppService.getAssetLogs({ ethAddress, assetAddress });
      const response = new CustomResponse();
      return response.setResponse(res, { result: answer });
    }
    catch (error) {
      next(error);
    }
  }



}
