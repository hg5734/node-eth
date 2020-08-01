import CustomError from "../../utils/error";
import { errorManager } from "../../config/errorManager";
import AssetService from "../../database/services/assets.service";
import UserDbService from "../../database/services/users.service";
import TransactionDbService from '../../database/services/transaction.service';
import EthService from '../eth';
import * as bcryptjs from 'bcryptjs';
import { vars } from '../../config/vars';
import logger from "../../utils/logger";
const { ASSET_ALREADY_EXIST, USER_ALREADY_EXIST, NOT_FOUND } = errorManager;
const { salt } = vars;

export default class AppService {

  static async createUser(reqBody) {
    let { email, password, name, role } = reqBody;
    let userExist = await UserDbService.findUser({ email });
    if (userExist) {
      throw new CustomError({ ...USER_ALREADY_EXIST });
    } else {
      let dbPassword = bcryptjs.hashSync(password, salt)
      let userObj = {
        password: dbPassword,
        email,
        name,
        role
      }
      await UserDbService.saveUser(userObj);
      return true;
    }
  }
  static async getAssetList() {
    return await AssetService.findAssets({});
  }

  static async addAsset(reqBody) {
    let { name, ethAddress, assetAddress, symbol } = reqBody;
    ethAddress = ethAddress.toUpperCase();
    assetAddress = assetAddress.toUpperCase();
    let assetExist = await AssetService.findAsset({ assetAddress, ethAddress });
    if (assetExist) {
      throw new CustomError({ ...ASSET_ALREADY_EXIST });
    } else {
      let aseetObj = {
        name,
        ethAddress,
        assetAddress,
        symbol
      }
      await AssetService.saveAsset(aseetObj);
      // synced the asset logs
      await this.syncAssetLogs(ethAddress, assetAddress);
      return true;
    }
  }

  static async syncAssetLogs(ethAddress, assetAddress) {
    try {
      let assetExist = await AssetService.findAsset({
        ethAddress,
        assetAddress
      });
      if (!assetExist) {
        throw new CustomError({ ...NOT_FOUND });
      } else {
        let { blockNumber, result } = await EthService.getAssetLogs(ethAddress, assetAddress, assetExist.lastSyncBlock || 0);
        // Saved event logs
        if (result && result.length) {
          await TransactionDbService.bulkCreate(result, null);
        }
        // last sync block
        if (blockNumber) {
          await AssetService.updateAsset({ _id: assetExist }, { lastSyncBlock: blockNumber });
        }
      }
      return true;
    } catch (error) {
      logger.error('error in sync asset' + error);
      return false;
    }
  }

  static async getAssetLogs(query) {
    let { ethAddress, assetAddress } = query;
    ethAddress = ethAddress.toUpperCase();
    assetAddress = assetAddress.toUpperCase();
    
    // sync the latest logs
    await this.syncAssetLogs(ethAddress, assetAddress);
    return TransactionDbService.findTransactions({
      ethAddress,
      assetAddress
    }, null, null);
  }

}
