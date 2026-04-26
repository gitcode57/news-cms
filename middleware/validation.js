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

const UserValidation = [
    body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({min: 5, max: 20})
    .withMessage('Fullname must be of 5 to 20 characters long'),
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
    .withMessage('Password must be of 5 to 10 characters long') ,

    body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['author', 'admin'])
    .withMessage('Role must be either admin or author')

]

const UserUpdateValidation = [

      body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({min: 5, max: 20})
    .withMessage('Fullname must be of 5 to 20 characters long'),
    
    body('password')
    .optional({ checkFalsy: true })
    .isLength({min: 5, max: 10})
    .withMessage('Password must be of 5 to 10 characters long') ,

    body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['author', 'admin'])
    .withMessage('Role must be either admin or author')

]

const CategoryValidation = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({min: 5, max: 20})
    .withMessage('Category name must be of 5 to 20 characters long'),    
    
    body('description')
    .isLength({max: 100})
    .withMessage('Description must be less than 100 characters long')

]

const ArticleValidation = [
    body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({min: 7, max: 100})
    .withMessage('Title must be of 7 to 100 characters long'),  

    body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({min: 5, max: 1000})
    .withMessage('Content must be of 5 to 1000 characters long'),

     body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')

]

module.exports = {
    loginValidation,
    UserValidation,
    UserUpdateValidation,
    CategoryValidation,
    ArticleValidation

}