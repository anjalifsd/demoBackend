const Product = require('../models/Product.js');

// Retrieve and return all Products from the database associated with the user
exports.findAll =  async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Something went wrong while getting the list of Products."
    });
  }
};

// Create and Save a new Product associated with the user
exports.create =  async (req, res) => {
  try {
    console.log('userid => ', req.user.id);
    console.log('user => ', req.user);

    // Validate request
    if (!req.body) {
      return res.status(400).send({
        message: "Please fill all required fields"
      });
    }

    // Create a new Product with associated user ID
    const product = new Product({
      product_name: req.body.product_name,
      category: req.body.category,
      userId: req.user.id,
    });

    // Save Product in the database
    const data = await product.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Something went wrong while creating a new Product."
    });
  }
};

// Find a single Product with an id associated with the user
exports.findOne = (req, res) => {
  Product.findOne({ _id: req.params.id, userId: req.user._id })
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      res.send(product);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error getting Product with id " + req.params.id
      });
    });
};

// Update a Product identified by the id associated with the user
exports.update =(req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required fields"
    });
  }
  // Find Product and update it with the request body
  Product.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, {
    product_name: req.body.product_name,
    category: req.body.category,
  }, { new: true })
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      res.send(product);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating Product with id " + req.params.id
      });
    });
};

// Delete a Product with the specified id associated with the user
exports.delete = (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      res.send({ message: "Product deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete Product with id " + req.params.id
      });
    });
};
