import expressCheck from 'express-validator/check';

const { check, validationResult } = expressCheck;

export default (req, res, next) => {
    req.checkBody('category')
        .isLength({ min: 1 }).withMessage('Category cannot be empty')
        .isNumeric().withMessage('Category id is not valid');

    req.checkBody('name')
        .isLength({ min: 1 }).withMessage('Name is required');

    req.checkBody('phones')
        .isLength({ min: 1 }).withMessage('At least one phone number is required');

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