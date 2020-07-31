
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import UserDbService from '../../database/services/users.service';
import * as bcryptjs from 'bcryptjs';
import { vars } from '../../config/vars';
const { salt } = vars;
const { INVALID_LOGIN_ID, INVALID_PASSWORD } = errorManager;
import jwt from '../../middlewares/auth';

export default class AuthService {

  static async login(reqBody) {
    let { email, password } = reqBody;
    let user = await UserDbService.findUser({ email });
    if (!user) {
      throw new CustomError({ ...INVALID_LOGIN_ID });
    } else {
      const hashPassword = bcryptjs.hashSync(password, salt);
      if (user.password !== hashPassword) {
        throw new CustomError({ ...INVALID_PASSWORD });
      }
      const token = jwt.generate({
        uuid: user._id,
        name: `${user.name}`,
        email: user.email,
        role: user.role,
      });
      let resultUser = user.toObject();
      delete resultUser.password;
      return {
        token,
        ...resultUser
      };
    }
  }

}
