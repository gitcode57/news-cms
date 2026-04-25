const {body} = require('express-validator')

const loginValidation =[
    body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .matches(/^\S+$/)
    .withMessage('Username must not contain spaces')
    .isLength({min: 5, max: 10})
    .withMessage('Username must be of 5 to 10 characters long'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min: 5, max: 10})
    .withMessage('Password must be of 5 to 10 characters long')


]


module.exports = {
    loginValidation
}