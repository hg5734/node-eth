import * as mongoose from 'mongoose'

export class BaseService {

    static convertIdIntoObject(id) {
        console.log(mongoose.Types.ObjectId(''+id))
        return mongoose.Types.ObjectId(id);
    }

}