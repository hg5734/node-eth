import * as mongoose from 'mongoose';
const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ethAddress: {
        type: String,
        required: true
    },
    assetAddress: {
        type: String,
        required: true,
        unique : true
    },
    symbol: {
        type: String,
    }
});

export default mongoose.model('assets', assetSchema);