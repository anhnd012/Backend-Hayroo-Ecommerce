const { query } = require("../config/db.config");

const {
  create,
  selectByID,
  get_price_by_prod_id,
  deleted,
  prod_id_by_prod_id_in_specific_cart,
  update,
} = require("../sql/query");

const { cartsModel_id, cartsModel } = require("../models/carts.model");
const {
  cartDetailModel_cartID,
  cartDetailModel,
} = require("../models/cartDetail.model");

const { productModel_prod_id } = require("../models/products.model");


async function checkCartDetail(req, res) {
  const cart_id = req.session.cart_id;
  const { prod_id, quantity } = req.body;
  //console.log(req.body);
  try {
    const validate_quantity = await cartDetailModel_cartID.validateAsync(
      quantity
    );
    const cartDetail = {
      cart_id,
      ...req.body,
    };
   
    const getValue = await getByProdID(cart_id, prod_id);
    
    if (getValue == 1) {
      const resAddCartDetail = await addCartDetail(cartDetail);
      return res.status(200).json(resAddCartDetail);
    } else if (getValue == 0) {
      
    }
    const cart_detail_id = await getCartDetailIdByProdID(prod_id);
    const price = await getPriceByProdID(prod_id);
    const updateQuantity = parseInt(quantity) + getValue.quantity;
    const updateCartDetailObject = {
      prod_id,
      quantity: updateQuantity,
      subtotal: updateQuantity * price,
      cart_detail_id,
    };
    const response = await updateCartDetail(updateCartDetailObject);
    return res.status(200).json({
      message: response.command,
      rowCount: response.rowCount,
    });
  } catch (err) {
    return res.status(400).json({
      err: err.message,
    })
  }
}

async function addCartDetail(cartDetail) {
  try {
    const price = await getPriceByProdID(cartDetail.prod_id);
    const cartDetailObject = {
      ...cartDetail,
      subtotal: price * parseInt(cartDetail.quantity),
    };
    const validate = await cartDetailModel.validateAsync(cartDetailObject);
    const createSQL = await create("Cart Detail", cartDetailObject);
    const response = await query(createSQL, [
      ...Object.values(cartDetailObject),
    ]);
    return {
      message: response.command,
      rowCount: response.rowCount,
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteCartDetail(req, res) {
  // Object | String
  const cart_detail_id = req.params.cart_detail_id;
  try {
    const validate = await cartDetailModel_cartID.validateAsync(
      parseInt(cart_detail_id)
    );
    const deleteSQL = await deleted("Cart Detail", {
      cart_detail_id: parseInt(cart_detail_id),
    });
    const response = await query(deleteSQL, [parseInt(cart_detail_id)]);
    return res.status(200).json({
      message: response.command,
      rowCount: response.rowCount,
    });
  } catch (err) {
    return res.status(400).json({
      err: err.message,
    });
  }
}

async function getByProdID(cart_id, prod_id) {
  const id = prod_id;
  try {
    const validate_prod_id = await productModel_prod_id.validateAsync(id);
    const response = await query(prod_id_by_prod_id_in_specific_cart, [
      cart_id,
      id,
    ]);
    if (response.rows.length == 0) {
      return 1;
    }
    const prod_id = response.rows[0].prod_id;
    const quantity = response.rows[0].quantity;
    const object = {
      prod_id,
      quantity,
    };
    console.log(object);
    return object;
  } catch (err) {
    throw new Error(err)
  }
}

async function getCartDetailIdByProdID(prod_id) {
  try {
    const validate = await cartDetailModel_cartID.validateAsync(prod_id);
    const selectSQL = await selectByID("Cart Detail", { prod_id: prod_id });
    const response = await query(selectSQL, [prod_id]);
    return response.rows[0].cart_detail_id;
  } catch (err) {
    throw new Error(err)
  }
}

async function updateCartDetail(cartDetail) {
  try {
    const validate = await cartDetailModel.validateAsync(cartDetail);
    const quantity = await cartDetailModel_cartID.validateAsync(
      cartDetail.quantity
    );
    const updateSQL = await update("Cart Detail", cartDetail);
    const response = await query(updateSQL, [...Object.values(cartDetail)]);
    return response;
  } catch (err) {
    throw new Error(err)
  }
}

async function getPriceByProdID(prod_id) {
  try {
    const validate_prod_id = await productModel_prod_id.validateAsync(prod_id);
    const price = await query(get_price_by_prod_id, [prod_id]);
    //console.log(price.rows[0].price);
    return price.rows[0].price;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  checkCartDetail,
  deleteCartDetail,
  updateCartDetail
};
