import 'dotenv/config';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        unique: true
    }
});

categorySchema.methods.toJSON = function() {
    return {
        'id': this._id,
        'name': this.name
    };
}

const Category = mongoose.model('Category', categorySchema);
export default Category;