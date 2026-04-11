const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const userModel = require('../models/User');

const allArticles = async(req,res) => {
    res.render('admin/articals');   
 }
const addArticlePage = async(req,res) => { 
    res.render('admin/articals/create'); 
}
const addArticle = async(req,res) => { }
const updateArticlePage = async(req,res) => {
    res.render('admin/articals/update');
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
