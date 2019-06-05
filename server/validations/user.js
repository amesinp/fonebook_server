import expressCheck from 'express-validator/check';

const { check, validationResult } = expressCheck;

export default (req, res, next) => {
    req.checkBody('first_name')
        .isLength({ min: 1 }).withMessage('First name is required');

    req.checkBody('last_name')
        .isLength({ min: 1 }).withMessage('Last name is required');

    req.checkBody('email')
        .isLength({ min: 1 }).withMessage('Email is required')
        .isEmail().withMessage('Email address is not valid');
    
    req.checkBody('country')
        .isLength({ min: 1 }).withMessage('Country is required');

    req.checkBody('phone')
        .isLength({ min: 1 }).withMessage('Phone number is required')
        .isNumeric().withMessage('Phone number must be numeric');
    
    req.checkBody('password')
        .isLength({ min: 1 }).withMessage('Password is required');

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