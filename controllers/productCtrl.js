const Products = require('../models/productModel');
require("dotenv").config();
const productCtrl = {
  
  getProducts: async (req, res) => {
    console.log('product')
    try {
      const products = await Products.find();
      

      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.msg });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      console.log(product)

      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        name,
        price,
        description,
        countInStock,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const newProduct = new Products({
        name: name,
        price,
        description,
        countInStock,
        images,
        category,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    console.log('edit')
    try {
      const { name, price, description, countInStock, images, category } = req.body;
      console.log(name, price, description, countInStock, images, category )
      if (!images) return res.status(400).json({ msg: "No image upload" });

     const pro= await Products.findOneAndUpdate(
        { _id: req.params.id },
        { name, price, description, countInStock, images, category }
      );
      console.log(pro)
      res.json({ msg: "Updated a Product" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
