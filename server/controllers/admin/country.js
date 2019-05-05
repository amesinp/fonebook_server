import Country from '../../models/country';

class Countries {
    static async fetch(req, res, next) {
        try {
            var countries = await Country.find({});
            return res.status(200).send(countries);
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }
    
    static async fetchOne(req, res, next) {
        try {
            var country = await Country.findOne({ _id: req.params.id });
            return res.status(200).send(country);
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }
    
    static async create(req, res, next) {
        try {
            let country = new Country(req.body);
            country._id = (await Country.count()) + 1;
            
            var createdCountry = await Country.create(country);
            return res.status(200).send(createdCountry);
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }

    static async updateOne(req, res, next) {
        try {
            var country = await Country.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true});
            return res.status(200).send(country);
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }
}

export default Countries;