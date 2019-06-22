import 'dotenv/config';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    identifier: {
        type: String
    },
    category: {
        type: String,
    },
    names: {
        type: Object
    },
    company: {
        type: String
    },
    job: {
        type: String
    },
    phones: {
        type: Object
    },
    emails: {
        type: Object
    },
    addresses: {
        type: Object
    },
    website: {
        type: String
    },
    notes: {
        type: String
    },
    avatar: {
        type: String
    },
    birth_date: {
        type: Date
    },
    custom: {
        type: Object
    },
});

contactSchema.methods.toJSON = function() {
    return {
        'identifier': this.identifier,
        'names': this.names,
        'category': this.category,
        'phones': this.phones,
        'emails': this.emails,
        'company': this.company,
        'addresses': this.addresses,
        'website': this.website,
        'notes': this.notes,
        //'avatar': this.avatar,
        'birth_date': this.birth_date,
        'custom': this.custom,
        'is_country': false
    };
}

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;