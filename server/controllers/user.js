import User from '../models/user';

class Users {
    static async profile(req, res, next) {
        if (req.user) {
            var user = await User.findOne({ _id: req.user._id }).populate('country');
            return res.status(200).send(user);
        }
        else
            return res.status(401).send();
    }
}

export default Users;