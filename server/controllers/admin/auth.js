import Admin from '../../models/admin';

class Auth {
    static async login(req, res, next) {
        const { username, password } = req.body;

        let adminUser = await Admin.findOne({ 'username': username });
        if (adminUser && await adminUser.validatePassword(password)) {
            const token = adminUser.generateAuthToken();
            return res.status(200).send({ token: token });
        }
        else
            return res.status(400).send({ message: 'Invalid username or password' });
    }
    
}

export default Auth;