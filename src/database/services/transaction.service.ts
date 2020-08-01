
import TransactionModel from '../models/transaction.model';
import { BaseService } from './base.service';

export default class TransactionService extends BaseService {

    static saveTransaction(object) {
        let TransactionObj = new TransactionModel(object);
        return TransactionObj.save();
    }

    static findTransaction(query) {
        return TransactionModel.findOne(query)
    }

    static findTransactions(query, projection?: any, options?: any) {
        return TransactionModel.find(query, projection, options);
    }

    static updateTransaction(query, object) {
        return TransactionModel.update(query, object)
    }

    static findOneAndUpdate(query, object, option?: any) {
        return TransactionModel.findOneAndUpdate(query, object, option)
    }

    static bulkCreate(transactions, options?: any) {
        return TransactionModel.insertMany(transactions, options);
    }

}

