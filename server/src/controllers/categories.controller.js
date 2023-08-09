const { query } = require("../config/db.config");
const { create, update, deleted, select } = require('../sql/query');

const {
  categoryModel,
  categoryModel_category_id,
} = require("../models/categories.model");

const {
  add_category,
  delete_category,
  update_category,
} = require("../sql/query");

async function addCategory(req, res) {
  const cate_image = req.files;

  const created_at = new Date();
  const updated_at = created_at;

  const categoryObject = {
    ...req.body,
    cate_image,
    created_at,
    updated_at,
  };

  try {
    const validate = await categoryModel.validateAsync(categoryObject);
    const categoryCreated = Object.values(categoryObject);
    console.log(categoryCreated);
    const sqlCreate = await create("Categories", categoryObject);
    const response = await query(sqlCreate, categoryCreated);
    return res.status(200).json({
      message: response.command,
      rowCount: response.rowCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function deleteCategory(req, res) {
  const category_id = parseInt(req.params.category_id);
  const categoryObject = {
    category_id: category_id,
  };
  
  try {
    const validate = await categoryModel_category_id.validateAsync(
      categoryObject.category_id
    );

    const sqlDelete = await deleted('Categories', categoryObject);
    const response = await query(sqlDelete, [categoryObject.category_id]);
    console.log(response);
    return res.status(200).json({
      message: response.command,
      rowCount: response.rowCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function updateCategory(req, res) {
  const category_id = parseInt(req.params.category_id);
  const cate_image = req.files;
  const updated_at = new Date();

  const categoryObject = {
    category_id,
    ...req.body,
    cate_image,
    updated_at,
  };

  try{
        const validate_category_id = await categoryModel_category_id.validateAsync(
            categoryObject.category_id
        );
    
      const validate = await categoryModel.validateAsync(categoryObject);
    
      const response = await query(update_category, [
        categoryObject.category_name,
        categoryObject.cate_description,
        cate_image,
        categoryObject.cate_status,
        updated_at,
        categoryObject.category_id,
      ]);
      return res.status(200).json({
        message: response.command,
        rowCount: response.rowCount,
      });

  }catch(err){
    return res.status(400).json({
        error: err.message,
    });
  }
}

module.exports = {
  addCategory,
  deleteCategory,
  updateCategory,
};
