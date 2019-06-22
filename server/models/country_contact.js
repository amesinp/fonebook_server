import 'dotenv/config';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const contactSchema = new Schema({
    _id: Number,
    country: {
        type: Schema.Types.Number,
        ref: 'Country'
    },
    category: {
        type: Schema.Types.Number,
        ref: 'Category'
    },
    name: {
        type: String,
        required: true
    },
    phones: {
        type: Object,
        required: true,
    },
    emails: {
        type: Object
    }
});

/*contactSchema.methods.toJSON = function() {
    return {
        'id': this._id,
        'country': this.country.name,
        'category': this.category.name,
        'name': this.name,
        'phones': this.phones,
        'emails': this.emails
    };
}*/

contactSchema.methods.toJSON = function() {
    return {
        'names': {
            'display': this.name
        },
        'identifier': 'c' + this._id,
        'phones': this.phones,
        'emails': this.emails,
        'category': this.category.name,
        'is_country': true
    };
}

const CountryContact = mongoose.model('CountryContact', contactSchema);
export default CountryContact;