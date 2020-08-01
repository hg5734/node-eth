import * as mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
    toAddress: {
        type: String
    },
    fromAddress: {
        type: String
    },
    value: {
        type: String,
    },
    eventType: {
        type: String
    },
    blockNo: {
        type: Number
    },
    assetAddress: {
        type: String,
        required: true
    },
    ethAddress :{
        type: String,
        required: true
    },
    transactionHash :{
        type :String
    }
});

export default mongoose.model('transactions', transactionSchema);