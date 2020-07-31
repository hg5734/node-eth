
import AssetModel from '../models/assets.model';
import { BaseService } from './base.service';

export default class AssetService extends BaseService {

    static saveAsset(object) {
        let AssetObj = new AssetModel(object);
        return AssetObj.save();
    }

    static findAsset(query) {
        return AssetModel.findOne(query)
    }

    static findAssets(query) {
        return AssetModel.find(query)
    }

    static updateAsset(query, object) {
        return AssetModel.update(query, object)
    }

    static findOneAndUpdate(query, object , option?:any) {
        return AssetModel.findOneAndUpdate(query, object, option)
    }

}

