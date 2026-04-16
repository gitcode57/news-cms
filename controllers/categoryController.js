const categoryModel = require('../models/Category');

 const allCategory = async (req, res) => {
  const categories = await categoryModel.find();
   res.render('admin/categories', {categories, role: req.role});
  }
 const addCategoryPage = async (req, res) => {
   res.render('admin/categories/create', {role: req.role});
  }
 const addCategory = async (req, res) => { 
    try {
        await categoryModel.create(req.body);
        res.redirect('/admin/category');
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
 }
 const updateCategoryPage = async (req, res) => { 
    try {
        const id = req.params.id;
        const category = await categoryModel.findById(id);
        if(!category) return res.status(404).send('Category not found');

        res.render('admin/categories/update', {category, role: req.role});
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
 }
 const updateCategory = async (req, res) => {
  const id = req.params.id;
      try {
        const category = await categoryModel.findByIdAndUpdate(id, req.body);
        if(!category) return res.status(404).send('Category not found');
        res.redirect('/admin/category');
      } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
      }
  }
 const deleteCategory = async (req, res) => {
  const id = req.params.id;
    try {
        const category = await categoryModel.findByIdAndDelete(id);
        if(!category) return res.status(404).send('Category not found');
       res.json({success: true});
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
  }

 module.exports = {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
 }


