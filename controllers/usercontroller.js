const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../models/User');
const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const settingModel = require('../models/settings');

const loginPage = async (req, res) => { 
   res.render('admin/login',{layout : false});
   
}
const adminlogin = async (req, res) => { 
    const {username, password} = req.body;
    try {
        const user = await userModel.findOne({username});
        if(!user) return res.status(404).send('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).send('Invalid credentials');
        const jwtData ={
            id: user._id, fullname: user.fullname,
            role: user.role
        }
        const token = jwt.sign(jwtData, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
}
const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/');
 }
const dashboard = async (req, res) => { 
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
        console.log(error);
        return res.status(400).send('Something went wrong');
    }

}
const settings = async (req, res) => {

    try {
        const setting = await settingModel.findOne();
        res.render('admin/settings', {role: req.role , setting});
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
     
 }
 const saveSettings = async (req, res) => {
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
        console.log(error);
        return res.status(400).send('Something went wrong');
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
const updateUserPage = async (req, res) => { 
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if(!user) return res.status(404).send('User not found');
        res.render('admin/users/update', {user , role: req.role});
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
    res.render('admin/users/update');
}
const updateUser = async (req, res) => { 
    const id= req.params.id;
    const {fullname, password, role} = req.body;
    try {
        const user = await userModel.findById(id);
        if(!user) return res.status(404).send('User not found');
        user.fullname = fullname || user.fullname;
        if(password){
            user.password = password;
        }
        user.role = role || user.role;
        await user.save();
        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
    
}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if(!user) return res.status(404).send('User not found');
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
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


