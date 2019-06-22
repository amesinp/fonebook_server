import Contact from '../models/contact';
import CountryContact from '../models/country_contact';
import User from '../models/user';

class UserContacts {
    static async fetch(req, res, next) {
        try {
            let user = await User.findOne({ _id: req.user._id });
            if (user) {
                let countryContacts = await CountryContact.find({ country: user.country }).populate('category');
                let mainContacts = await Contact.find({ user: user._id });

                return res.status(200).send(countryContacts.concat(mainContacts));
            }
            return res.status(401).send('Unauthorized');
        }
        catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }

    static async create(req, res, next) {
        try {
            let user = req.user;
            req.body.user = user._id;

            let contact = new Contact(req.body);
            let createdContact = await Contact.create(contact);

            if (createdContact) 
                return res.status(200).send(createdContact);
            
            return res.status(400).send({ 'message': 'An error occurred creating contact' });
        }
        catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }

    static async sync(req, res, next) {
        try {
            let user = await User.findOne({ _id: req.user._id });
            if (user) {
                let contacts = req.body.contacts;
                
                let total = contacts.length;
                let errorCount = 0;
                let successCount = 0;

                contacts.forEach(async function(contact) {
                    contact.user = user._id;

                    var existingContact = await Contact.findOne({ identifier: contact.identifier });
                    if (existingContact)
                        contact._id = existingContact._id;

                    if (contact.identifier == null) {
                        var lastContact = await Contact.findOne().sort({ _id: -1 });
                        if (lastContact)
                            contact.identifier = lastContact.identifier + 1;
                        else
                            contact.identifier = 1;
                    }

                    Contact.updateOne(
                        { identifier: contact.identifier },
                        contact,
                        { upsert: true },
                        function(err) {
                            if (err) errorCount++;
                            else successCount++;

                            if ((errorCount + successCount) == total) {
                                return res.status(200).send({
                                    success: successCount,
                                    error: errorCount,
                                    message: successCount + ' contacts synced succesfully'
                                });
                            }
                        }
                    );
                });
            }
            else
                return res.status(401).send('Unauthorized');
        }
        catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }
}

export default UserContacts;