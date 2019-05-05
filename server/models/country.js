import 'dotenv/config';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const countrySchema = new Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    phone_code: {
        type: String,
        required: true,
    }
});

countrySchema.methods.toJSON = function() {
    return {
        'id': this._id,
        'name': this.name,
        'phone_code': this.phone_code
    };
}

const Country = mongoose.model('Country', countrySchema);
export default Country;