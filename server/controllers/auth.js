import User from '../models/user';
import Country from '../models/country';

class Auth {
    static async login(req, res, next) {
        const { email, password } = req.body;

        let user = await User.findOne({ 'email': email }).populate('country');
        if (user && await user.validatePassword(password)) {
            const token = user.generateAuthToken();
            const updatedUser = user.toJSON();
            updatedUser.token = token;
            return res.status(200).send(updatedUser);
        }
        else
            return res.status(400).send({ message: 'Invalid email or password' });
    }

    static async loginSocial(req, res, next) {
        try{
            let user = await User.findOne({ 'email': req.body.email }).populate('country');
            if (user) {
                if (user.is_social_auth && req.body.password == user.password) {
                    const token = user.generateAuthToken();
                    const updatedUser = user.toJSON();
                    updatedUser.token = token;
                    return res.status(200).send(updatedUser);
                }
            }
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }

    static async register(req, res, next) {
        try {
            let existingUser = await User.findOne({ 'email': req.body.email });
            if (existingUser) 
                return res.status(400).send({ errors: {
                    'email': 'Email address already exists'
                }});

            let existingCountry = await Country.findOne({ _id: req.body.country });
            if (!existingCountry)
                return res.status(400).send({ errors: {
                    'country': 'Country not supported'
                }});

            var user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                country: req.body.country,
                phone: req.body.phone,
                is_social_auth: req.body.social_auth
            });
            if (req.body.social_auth)
                user.password = req.body.password;
            else
                await user.setPassword(req.body.password);

            var createdUser = await User.create(user);
            var updatedUser = (await User.findOne({ _id: createdUser._id }).populate('country')).toJSON();

            const token = createdUser.generateAuthToken();
            updatedUser.token = token;

            return res.status(200).send(updatedUser);
        }
        catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }
    
}

export default Auth;