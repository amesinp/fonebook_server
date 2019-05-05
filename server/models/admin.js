import 'dotenv/config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    is_super: {
        type: Boolean,
        required: true,
        default: false
    }
});

adminSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, is_super: this.is_super }, process.env.PRIVATE_KEY_ADMIN, {
        expiresIn: 1800
    });
    return token;
}

adminSchema.methods.setPassword = async function(password) {
    let hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
}

adminSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.toJSON = function() {
    return {
        'username': this.username,
        'is_super': this.is_super
    };
}

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;