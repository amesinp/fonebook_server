import Category from '../../models/category';

class Categories {
    static async fetch(req, res, next) {
        try {
            var categories = await Category.find({});
            return res.status(200).send(categories);
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }
    
    static async fetchOne(req, res, next) {
        try {
            var category = await Category.findOne({ _id: req.params.id });
            return res.status(200).send(category);
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }
    
    static async create(req, res, next) {
        try {
            let id = 1;
            let lastCategory = await Category.findOne().sort({ _id: -1 });
            if (lastCategory)
                id += lastCategory._id;

            let category = new Category(req.body);
            category._id = id;
            
            var createdCategory = await Category.create(category);
            return res.status(200).send(createdCategory);
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }

    static async updateOne(req, res, next) {
        try {
            var category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true});
            return res.status(200).send(category);
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }
}

export default Categories;