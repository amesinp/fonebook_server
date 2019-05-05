import Admin from '../../models/admin';

class Admins {
    static async create(req, res, next) {
        try {
            const { username, password, is_super } = req.body;
            var existingAdmin = await Admin.findOne({ 'username': username });
            if (existingAdmin)
                return res.status(400).send({ 'message': 'Username already exists' });
            
            var admin = new Admin({
                username: username,
                is_super: is_super
            });
            await admin.setPassword(password);

            var createdAdmin = await Admin.create(admin);
            return res.status(200).send(createdAdmin.toJSON());
        }
        catch(err) {
            return res.status(500).send({ 'message': err.message });
        }
    }

    static async fetch(req, res, next) {
        try {
            var admins = await Admin.find({});
            return res.status(200).send(admins);
        }
        catch(err) {
            return res.status(500).send(err);
        }
    }
}

export default Admins;