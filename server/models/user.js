import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: Schema.Types.Number,
        ref: 'Country'
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
        expiresIn: '365d'
    });
    return token;
}

userSchema.methods.setPassword = async function(password) {
    let hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
}

userSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.toJSON = function() {
    return {
        'name': this.first_name + " " + this.last_name,
        'email': this.email,
        'country': this.country.name,
        'phone': "+" + this.country.phone_code + this.phone
    };
}

const User = mongoose.model('User', userSchema);
export default User;