import Country from '../../models/country';
import CountryContact from '../../models/country_contact';
import Category from '../../models/category';

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
            let id = 1;
            let lastCountry = await Country.findOne().sort({ _id: -1 });
            if (lastCountry)
                id += lastCountry._id;

            let country = new Country(req.body);
            country._id = id;
            
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
    
    static async fetchContacts(req, res, next) {
        try {
            var id = req.params.id;
            var contacts = await CountryContact.find({ country: id }).populate('country').populate('category');
            return res.status(200).send(contacts);
        }
        catch (err) {
            return res.status(500).send({ 'message': err.message });
        }
    }

    static async fetchOneContact(req, res, next) {
        try {
            var countryId = req.params.id;
            var contactId = req.params.contactid;

            var contact = await CountryContact.findOne({ 
                _id: contactId,
                country: countryId
            }).populate('country').populate('category');
            return res.status(200).send(contact);
        }
        catch (err) {
            return res.status(500).send({ 'message': err.message });   
        }
    }

    static async createContact(req, res, next) {
        try {
            var countryId = req.params.id;
            var country = await Country.findOne({ _id: countryId });
            if (!country)
                return res.status(400).send({ errors: {
                    'country': 'Country does not exist'
                }});

            var categoryId = req.body.category;
            var category = await Category.findOne({ _id: categoryId });
            if (!category)
                return res.status(400).send({ errors: {
                    'category': 'Category does not exist'
                }});
                
            let id = 1;
            let lastContact = await CountryContact.findOne().sort({ _id: -1 });
            if (lastContact)
                id += lastContact._id;

            var contact = new CountryContact({
                _id: id,
                country: countryId,
                category: categoryId,
                name:  req.body.name,
                phones: req.body.phones,
                emails: req.body.emails
            });
            var createdContact = await CountryContact.create(contact);
            var updatedContact = (await CountryContact.findOne({ _id: createdContact._id }).populate('country').populate('category')).toJSON();

            return res.status(200).send(updatedContact);
        }
        catch (err) {
            return res.status(500).send({ 'message': err.message });
        }
    }

    static async updateOneContact(req, res, next) {
        try {
            var contactId = req.params.contactid;

            var categoryId = req.body.category;
            var category = await Category.findOne({ _id: categoryId });
            if (!category)
                return res.status(400).send({ errors: {
                    'category': 'Category does not exist'
                }});

            var contact = await CountryContact.findOneAndUpdate({ 
                _id: contactId
            }, {
                category: categoryId,
                name:  req.body.name,
                phones: req.body.phones,
                emails: req.body.emails
            }, { new: true }).populate('country').populate('category');
            return res.status(200).send(contact);
        }
        catch (err) {
            return res.status(500).send({ 'message': err.message });   
        }
    }

    static async deleteOneContact(req, res, next) {
        try {
            var contactId = req.params.contactid;

            var deletedContact = await CountryContact.deleteOne({ _id: contactId });
            if (deletedContact.ok == "1") {
                return res.status(200).send({ 'message': "Contact deleted successfully" });
            }
            return res.status(500).send({ 'message': "An error occured deleting contact" });
        }
        catch (err) {
            return res.status(500).send({ 'message': err.message });   
        }
    }
}

export default Countries;