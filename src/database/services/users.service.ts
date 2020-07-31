
import UserModel from '../models/users.model';
import { BaseService } from './base.service';

export default class UserService extends BaseService {

    static saveUser(object) {
        let userObj = new UserModel(object);
        return userObj.save();
    }

    static findUser(query) {
        return UserModel.findOne(query)
    }

    static findUsers(query) {
        return UserModel.find(query)
    }

    static updateUser(query, object) {
        return UserModel.update(query, object)
    }

    static findOneAndUpdate(query, object , option?:any) {
        return UserModel.findOneAndUpdate(query, object, option)
    }

}

