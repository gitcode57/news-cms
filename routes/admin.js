const express = require('express');
const router = express.Router();



const articleController = require('../controllers/articleController');
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/usercontroller');
const commentController = require('../controllers/commentController');
const isLoggedIn = require('../middleware/isLoggedin');
const isAdmin = require('../middleware/isAdmin');
const Upload = require('../middleware/multer');
const isValid = require('../middleware/validation');

// login routes
router.get('/',userController.loginPage);
router.post('/index',isValid.loginValidation ,userController.adminlogin);
router.get('/logout',userController.logout);
router.get('/dashboard',isLoggedIn,userController.dashboard);
router.get('/settings',isLoggedIn,isAdmin,userController.settings);
router.post('/save-settings',isLoggedIn,isAdmin,Upload.single('website_logo'),userController.saveSettings);
// user crud routes

router.get('/users',isLoggedIn,isAdmin,userController.allUsers);
router.get('/add-user',isLoggedIn,isAdmin,userController.addUserPage);
router.post('/add-user',isLoggedIn,isAdmin,userController.addUser);
router.get('/update-user/:id',isLoggedIn,isAdmin,userController.updateUserPage);
router.post('/update-user/:id',isLoggedIn,isAdmin,userController.updateUser);
router.delete('/delete-user/:id',isLoggedIn,isAdmin,userController.deleteUser);

// category crud routes
router.get('/category',isLoggedIn,isAdmin,categoryController.allCategory);
router.get('/add-category',isLoggedIn,isAdmin,categoryController.addCategoryPage);
router.post('/add-category',isLoggedIn,isAdmin,categoryController.addCategory);
router.get('/update-category/:id',isLoggedIn,isAdmin,categoryController.updateCategoryPage);
router.post('/update-category/:id',isLoggedIn,isAdmin,categoryController.updateCategory);
router.delete('/delete-category/:id',isLoggedIn,isAdmin,categoryController.deleteCategory);

// Article crud routes
router.get('/articles',isLoggedIn,articleController.allArticles);
router.get('/add-article',isLoggedIn,articleController.addArticlePage);
router.post('/add-article',isLoggedIn,Upload.single('image'),articleController.addArticle);
router.get('/update-article/:id',isLoggedIn,articleController.updateArticlePage);
router.post('/update-article/:id',isLoggedIn,Upload.single('image'),articleController.updateArticle);
router.delete('/delete-article/:id',isLoggedIn,articleController.deleteArticle);

// delete comment
router.get('/comment',isLoggedIn,commentController.allComments);

router.use(isLoggedIn, ( req, res, next) => {
        res.status(404).render('admin/404',{
            role: req.role,
            message: 'Page Not Found'
        });

    }); 

    router.use( (err, req, res, next) => {
        console.error(err.stack);
        const status = err.status || 500;
        let view;
        switch (status) {
            case 401:
                view = 'admin/401';
                break;
            case 404:
                view = 'admin/404';
                break;
            case 500: 
                 view = 'admin/500'
            default:
                view = 'admin/500';
                
        }

        res.status(status).render(view,{
            message: err.message || 'Internal server error',
              role: req.role,
        });

    }); 


module.exports = router;