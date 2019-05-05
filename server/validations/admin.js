import expressCheck from 'express-validator/check';

const { check, validationResult } = expressCheck;

export default (req, res, next) => {
    req.checkBody('username')
        .isLength({ min: 1 }).withMessage('Username cannot be empty');

    req.checkBody('password')
        .isLength({ min: 1 }).withMessage('Password cannot be empty');

    req.checkBody('confirm_password')
        .equals(req.body.password).withMessage('Passwords do not match');

    const errors = req.validationErrors();
    if (errors) {
        let responseErrors = {};
        errors.forEach(error => {
            responseErrors[error.param] = error.msg
        });
        return res.status(422).json({ errors: responseErrors });
    }
    return next();
}