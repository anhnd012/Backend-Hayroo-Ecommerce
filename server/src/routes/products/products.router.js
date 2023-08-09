const express = require("express");
const multer = require("multer");

const productRouter = express.Router();

const {
  addProduct,
  deleteProduct,
  updateProduct,
  loadProducts,
  getSpecificProduct
} = require("../../controllers/products.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

productRouter.post("/", upload.any(), addProduct);
productRouter.delete("/:prod_id", deleteProduct);
productRouter.put("/:prod_id", upload.any(), updateProduct);
productRouter.get("/", loadProducts);
productRouter.get("/:prod_id", getSpecificProduct);

module.exports = productRouter;
