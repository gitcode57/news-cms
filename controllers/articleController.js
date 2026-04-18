const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const userModel = require('../models/User');
const fs = require('fs');
const Path = require('path');

const allArticles = async(req,res) => {
let articles;
    try {
        if(req.role === 'admin'){
            articles = await newsModel.find().populate('category','name').populate('author','fullname');
        }else{
            articles = await newsModel.find({author:req.id}).populate('category','name').populate('author','fullname');
        }
        res.render('admin/articles', {role: req.role, articles});   
    } catch (error) {
        console.log(error);
        res.status(500).send('Error Occurred');
    }  
 }
/*******  9739ba24-7926-4db2-b3f9-c50ce7df75c2  *******/    
const addArticlePage = async(req,res) => { 
    const categories = await categoryModel.find();
    res.render('admin/articles/create', {role: req.role, categories}); 
}
const addArticle = async(req,res) => {
    try {
        const {title, content, category} = req.body;
        const article = new newsModel({
            title,
            content,
            category,
            author:req.id,
            image: req.file.filename
        });
        await article.save();
        res.redirect('/admin/articles');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error Occured');
    }
 }
const updateArticlePage = async(req,res) => {
    const id = req.params.id;
    try{
        const article = await newsModel.findById(id).populate('category','name').populate('author','fullname');
    if(!article){
        return res.status(404).send('Article Not Found');
    }
    if(req.role == 'author'){
        if(article.author._id != req.id){
            return res.status(403).send('Unauthorized');
        }
    }
    const categories = await categoryModel.find();
    res.render('admin/articles/update', {role: req.role, article, categories});
    }catch(error){
        console.log(error);
        res.status(500).send('Error Occured');
    }
    
}
const updateArticle = async(req,res) => { 
    const id = req.params.id;
    try {
        const {title, content, category} = req.body;
        const article = await newsModel.findById(id);
        if(!article){
            return res.status(404).send('Article Not Found');
        }
       if(req.role == 'author'){
           if(article.author._id != req.id){
            return res.status(403).send('Unauthorized');
         }
        }

        article.title = title;
        article.content = content;
        article.category = category;
        if(req.file){
            const imagepath = Path.join(__dirname,'../public/uploads',article.image);
            fs.unlinkSync(imagepath);
            article.image = req.file.filename;
        }
        await article.save();
        res.redirect('/admin/articles');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error Occured');
    }

}
const deleteArticle = async(req,res) => { 
    const id = req.params.id;
    try {
        const article = await newsModel.findById(id);
        if(!article){
            return res.status(404).send('Article Not Found');
        }
        if(req.role == 'author'){
        if(article.author._id != req.id){
            return res.status(403).send('Unauthorized');
        }
    }
    const imagepath = Path.join(__dirname,'../public/uploads',article.image);
            fs.unlinkSync(imagepath);
        await article.deleteOne();
        
       res.json({success:true})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error Occured');
    }
}

module.exports = {
    allArticles,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
}
