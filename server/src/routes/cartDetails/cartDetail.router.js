const express = require('express');
const multer = require('multer');
const cartDetailRouter = express.Router();

const { deleteCartDetail, checkCartDetail, updateCartDetail } = require('../../controllers/cartDetail.controller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/categories");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
});


const upload = multer({storage: storage});

cartDetailRouter.post('/', upload.any(), checkCartDetail);
cartDetailRouter.delete('/:cart_detail_id', deleteCartDetail);
cartDetailRouter.put('/:cart_detail_id', updateCartDetail);

module.exports = cartDetailRouter;