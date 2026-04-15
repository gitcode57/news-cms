const express = require('express');
const router = express.Router();


const articleController = require('../controllers/articleController');
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');

// login routes
router.get('/',userController.loginPage);
router.post('/index',userController.adminlogin);
router.get('/logout',userController.logout);
router.get('/dashboard',userController.dashboard);
router.get('/settings',userController.settings);

// user crud routes

router.get('/users',userController.allUsers);
router.get('/add-user',userController.addUserPage);
router.post('/add-user',userController.addUser);
router.get('/update-user/:id',userController.updateUserPage);
router.post('/update-user/:id',userController.updateUser);
router.delete('/delete-user/:id',userController.deleteUser);

// category crud routes
router.get('/category',categoryController.allCategory);
router.get('/add-category',categoryController.addCategoryPage);
router.post('/add-category',categoryController.addCategory);
router.get('/update-category/:id',categoryController.updateCategoryPage);
router.post('/update-category/:id',categoryController.updateCategory);
router.get('/delete-category/:id',categoryController.deleteCategory);

// Article crud routes
router.get('/articles',articleController.allArticles);
router.get('/add-article',articleController.addArticlePage);
router.post('/add-article',articleController.addArticle);
router.get('/update-article/:id',articleController.updateArticlePage);
router.post('/update-article/:id',articleController.updateArticle);
router.get('/delete-article/:id',articleController.deleteArticle);

// delete comment
router.get('/comment',commentController.allComments);


module.exports = router;