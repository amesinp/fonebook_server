import expressCheck from 'express-validator/check';

const { check, validationResult } = expressCheck;

export default (req, res, next) => {
    req.checkBody('name')
        .isLength({ min: 1 }).withMessage('Name cannot be empty');

    req.checkBody('phone_code')
        .isLength({ min: 1 }).withMessage('Phone code cannot be empty')
        .isNumeric().withMessage('Phone code must be numeric');

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