import CustomError from "../../utils/error";
import { errorManager } from "../../config/errorManager";
import AssetService from "../../database/services/assets.service";
import UserDbService from "../../database/services/users.service";
import * as bcryptjs from 'bcryptjs';
import { vars } from '../../config/vars';
const { ASSET_ALREADY_EXIST, USER_ALREADY_EXIST } = errorManager;
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
    let aseetExist = await AssetService.findAsset({ assetAddress });
    if (aseetExist) {
      throw new CustomError({ ...ASSET_ALREADY_EXIST });
    } else {
      let aseetObj = {
        name,
        ethAddress,
        assetAddress,
        symbol
      }
      await AssetService.saveAsset(aseetObj);
      return true;
    }
  }


}
