const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const userModel = require('../models/User');

const allArticles = async(req,res) => {
    res.render('admin/articals', {role: req.role});   
 }
const addArticlePage = async(req,res) => { 
    res.render('admin/articals/create', {role: req.role}); 
}
const addArticle = async(req,res) => { }
const updateArticlePage = async(req,res) => {
    res.render('admin/articals/update', {role: req.role});
 }
const updateArticle = async(req,res) => { }
const deleteArticle = async(req,res) => { }

module.exports = {
    allArticles,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
}
