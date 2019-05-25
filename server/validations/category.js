import expressCheck from 'express-validator/check';

const { check, validationResult } = expressCheck;

export default (req, res, next) => {
    req.checkBody('name')
        .isLength({ min: 1 }).withMessage('Name cannot be empty');
        
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