import Country from '../models/country';

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
}

export default Countries;