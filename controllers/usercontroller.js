const userModel = require('../models/User');

const loginPage = async (req, res) => { 
   res.render('admin/login',{layout : false});
   
}
const adminlogin = async (req, res) => { }
const logout = async (req, res) => { }
const dashboard = async (req, res) => { 
    res.render('admin/dashboard');
}
const settings = async (req, res) => {
    res.render('admin/settings');
 }

const allUsers = async (req, res) => { 
    const users = await userModel.find();
    
    res.render('admin/users', { users });
}
const addUserPage = async (req, res) => { 
    res.render('admin/users/create');
}
const addUser = async (req, res) => {
  await userModel.create(req.body)
    res.redirect('/admin/users')

 }
const updateUserPage = async (req, res) => { 
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if(!user) return res.status(404).send('User not found');
        res.render('admin/users/update', {user});
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
    settings
}


