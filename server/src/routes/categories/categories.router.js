const express = require('express');
const multer = require('multer');

const categoriesRouter = express.Router();

const { addCategory, deleteCategory, updateCategory } = require('../../controllers/categories.controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/categories");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage });

categoriesRouter.post('/', upload.any(), addCategory);
categoriesRouter.delete('/:category_id', deleteCategory);
categoriesRouter.put('/:category_id',upload.any() ,updateCategory);

module.exports = categoriesRouter