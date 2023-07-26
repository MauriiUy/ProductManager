const express = require('express');
const router = express.Router();

const ProductManager = require('./ProductManager');
const productManager = new ProductManager('Usuarios.json');

// Ruta para obtener todos los productos
router.get('/products', (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    const limitedProducts = productManager.getProducts().slice(0, limit);
    return res.json(limitedProducts);
  }
  return res.json(productManager.getProducts());
});

// Ruta para obtener un producto por ID
router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = productManager.getProductById(productId);
  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;