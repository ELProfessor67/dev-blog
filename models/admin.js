import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const admin = new mongoose.Schema({
    name: {type: String, required: true},
    avatar: {
        public_id: {type: String, required: true},
        url: {type: String, required: true}
    },
    username: {type: String, required: true, unique: true, select: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false, min: [8,'password to short'], max: [30, 'password to long']},
    passwordResetToken: {type: String, default: undefined},
    passwordResetExpire: {type: Date, default: undefined},
    tokens: [{type: String, select: false}]
},{timestamps: true});


admin.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

mongoose.models = {};

export default  mongoose.model('admin',admin);