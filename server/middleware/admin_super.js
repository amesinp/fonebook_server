export default (req, res, next) => {
    if (!req.user.is_super)
        return res.status(401).send("Access denied");
    next();
};