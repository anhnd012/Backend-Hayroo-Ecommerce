const { query } = require('../config/db.config');

const { create, selectByID, get_cartId_by_userId, add_cart } = require('../sql/query');

const { cartsModel_id, cartsModel } = require('../models/carts.model');
const { cartDetailModel_cartID } = require('../models/cartDetail.model');


async function addCart (req, res) {
    const cart_id = await checkCartByUserID(parseInt(req.user));

    if(cart_id === 0){
        const cartObject = {
            user_id : parseInt(req.user),
            total_price: 0,
        };

        try{
            const validate = await cartsModel.validateAsync(cartObject);
            const createSQL = await create("Carts", cartObject);
            const response = await query(createSQL, [Object.values(cartObject)]);
        }catch(err){
             return res.status(500).json({
                err: err.message
             })
        }   
    }
    req.session.cart_id = cart_id;
    console.log(req.session);
    return res.status(200).json({
        message: "Success"
        //rowCount: response.rowCount,
    })
    
}

async function loadCartDetail (cart_id){
    try{
        const validate = await cartDetailModel_cartID.validateAsync(cart_id);
        const selectSQL = await selectByID("Cart Detail", {cart_id: cart_id});
        const response = await query(selectSQL, [cart_id]);
        return response;
    }catch(err){
        console.log(err.message);
        return 0;
    }
}

async function checkCartByUserID (user_id) {
    if(!user_id){
        return 0
    }

    const cartObject = {
        user_id: user_id
    };
    
    try{
        const validate = await cartsModel_id.validateAsync(cartObject.user_id);
        const selectSQL = await selectByID("Carts", cartObject);
        console.log(selectSQL);
        //const response = await query(get_cartId_by_userId, [cartObject.user_id])
        const response = await query(selectSQL, [cartObject.user_id])
        return response.rows[0].cart_id;
    }catch(err){
        console.log(err.message);
        return 0;
    }
}

module.exports = {
    addCart,
    loadCartDetail
}