import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type :String
    },
    password: String,
    role : {
        type : String,
        default : 'ADMIN'
    }
});

export default mongoose.model('users', userSchema);
