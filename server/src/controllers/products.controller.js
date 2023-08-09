const { query } = require("../config/db.config");
const { create, update, deleted, select, selectByID } = require('../sql/query');

const { productModel, productModel_prod_id, getProductId } = require("../models/products.model");

// const { add_product, update_product, delete_product } = require("../sql/query");

async function addProduct(req, res) {
  const prod_image = req.files[0].filename;
  console.log(prod_image);
  const created_at = new Date();
  const updated_at = created_at;
  const productObject = {
    ...req.body,
    prod_image,
    created_at,
    updated_at,
  };

  try {
    const validate = await productModel.validateAsync(productObject);
    const productCreated = Object.values(productObject);
    console.log(productCreated);
    const sqlCreate = await create("Products", productObject);
    const response = await query(sqlCreate, productCreated);
    console.log(response)
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

async function deleteProduct(req, res) {
  const prod_id = parseInt(req.params.prod_id);
  const productObject = {
    prod_id: prod_id
  }
  try{

    const validate_product_id = await productModel_prod_id.validateAsync(prod_id);
    const deleteSQL = await deleted("Products", productObject);
    console.log(deleteSQL);
    const response = await query(deleteSQL, [prod_id]);

    return res.status(200).json({
      message: response.command,
      rowCount: response.rowCount,
    })
  }catch(err){
    return res.status(400).json({
      error: err.message,
    })
  }
}

async function updateProduct (req, res){
  const updated_at = new Date();
  const prod_id = parseInt(req.params.prod_id);
  const images = req.files;
  const productObject = {
    images,
    ...req.body,
    updated_at,
    prod_id
  } 
  
  try{
    const validate = await productModel.validateAsync(productObject);
    // getProductId();

    const updateSQL = await update("Products", productObject);
    // const response = await query(update_product,[productObject.prod_name, productObject.prod_desc,
    //   productObject.cate_id, productObject.sold, productObject.quantity, images, productObject.price,
    //   productObject.prod_status, updated_at]);
    const response = await query(updateSQL, [...Object.values(productObject)]);
    return res.status(200).json({
      message: response.command,
      rowCount: response.rowCount,
    })
  }catch(err){
    return res.status(400).json({
      err : err.message,
    })
  }
  
}

async function loadProducts (req, res) {
  try{
    const selectSQL = await select("Products");
    const response = await query(selectSQL);
    //console.log(response.rows);
    return res.status(200).json({
      message: response.command,
      rowCount: response.rowCount,
      value: response.rows,
    })
  }catch(err){
    return res.status(400).json({
      err : err.message,
    })
  }
}

async function getSpecificProduct (req, res) {
  const prod_id = req.params.prod_id;
  console.log(prod_id);
  if(typeof(parseInt(prod_id)) != 'number') {
    return res.status(400).json({
      error: "Param is not a number"
    })
  }

  const productObject = {
    prod_id
  }

  const sql = await selectByID("Products", productObject);
  const response = await query(sql, [parseInt(prod_id)]);
  console.log(response.rows);
  return res.status(200).json({
    message: response.command,
    rowCount: response.rowCount,
    value: response.rows[0]
  })
}

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  loadProducts,
  getSpecificProduct
};
