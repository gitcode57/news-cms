const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const {validationResult} = require('express-validator')
const userModel = require('../models/User');
const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const settingModel = require('../models/settings');

const loginPage = async (req, res) => { 
   res.render('admin/login',{layout : false});
   
}
const adminlogin = async (req, res, next) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('admin/login', {layout: false, errors: errors.array()});
    }

    const {username, password} = req.body;
    try {
        const user = await userModel.findOne({username});
        if(!user) return next(createError('User not found', 404));
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(createError('Invalid credentials', 400));
        const jwtData ={
            id: user._id, fullname: user.fullname,
            role: user.role
        }
        const token = jwt.sign(jwtData, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error);
        return next(createError('Something went wrong', 400));
    }
}
const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/');
 }
const dashboard = async (req, res, next) => { 
    try{
        const usercount = await userModel.countDocuments();
        const categorycount = await categoryModel.countDocuments();
        if(req.role === 'admin'){
            var articlecount = await newsModel.countDocuments();
        }else{
            var articlecount = await newsModel.countDocuments({author:req.id});
        }
        res.render('admin/dashboard', {role: req.role, fullname: req.fullname, usercount, categorycount, articlecount});

    }catch(error){
       next(error);
    }

}
const settings = async (req, res, next) => {

    try {
        const setting = await settingModel.findOne();
        res.render('admin/settings', {role: req.role , setting});
    } catch (error) {
        console.log(error);
        return next(createError('Something went wrong', 401));
    }
     
 }
 const saveSettings = async (req, res, next) => {
    try{
        const {website_title,  website_footer} = req.body;
        const data = {
            website_title,
            website_logo: req.file ? req.file.filename : null,
            website_footer
        }
        const setting = await settingModel.findOneAndUpdate({}, data, {new: true , upsert: true });
        res.redirect('/admin/settings');

    }catch(error){
       next(error);
 }

 }
const allUsers = async (req, res) => { 
    const users = await userModel.find();
    
    res.render('admin/users', { users ,role: req.role});
}
const addUserPage = async (req, res) => { 
    res.render('admin/users/create', {role: req.role});
}
const addUser = async (req, res) => {
  await userModel.create(req.body)
    res.redirect('/admin/users');

 }
const updateUserPage = async (req, res, next) => { 
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if(!user) return next(createError('User not found', 404));
        res.render('admin/users/update', {user , role: req.role});
    } catch (error) {
        next(error);
    }
    res.render('admin/users/update');
}
const updateUser = async (req, res, next) => { 
    const id= req.params.id;
    const {fullname, password, role} = req.body;
    try {
        const user = await userModel.findById(id);
        if(!user) return next(createError('User not found', 404));
        user.fullname = fullname || user.fullname;
        if(password){
            user.password = password;
        }
        user.role = role || user.role;
        await user.save();
        res.redirect('/admin/users');
    } catch (error) {
       next(error);
    }
    
}
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if(!user) return next(createError('User not found', 404));
        res.json({ success: true });
    } catch (error) {
       next(error);
    }
 }

module.exports = {
    loginPage,
    adminlogin,
    logout,
    allUsers,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser,
    dashboard,
    settings,
    saveSettings
}


