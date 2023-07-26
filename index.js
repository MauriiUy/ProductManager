const express = require('express');
const app = express();
const port = 8080;

const routes = require('./routes'); // Importa las rutas desde el archivo routes.js
app.use('/', routes); // Usa las rutas definidas en el archivo routes.js

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});

const ProductManager = require('./ProductManager');

const productManager = new ProductManager('Usuarios.json');

const product = {
  title: "Producto 1",
  description: "Descripción 1",
  price: 10,
  thumbnail: "thumbnail1.jpg",
  code: "ABC123",
  stock: 50
};

const product2 = {
  title: "Producto 2",
  description: "Descripción 2",
  price: 110,
  thumbnail: "thumbnail1.jpg",
  code: "ABC1232",
  stock: 501
};

const product3 = {
  title: "Producto 3",
  description: "Descripción 3",
  price: 101,
  thumbnail: "thumbnail1.jpg",
  code: "ABC1231",
  stock: 52
};
const product4 = {
  title: "Producto 4",
  description: "Descripción 4",
  price: 101,
  thumbnail: "thumbnail1.jpg",
  code: "ABC1231",
  stock: 52
};
const product5 = {
  title: "Producto 5",
  description: "Descripción 5",
  price: 101,
  thumbnail: "thumbnail1.jpg",
  code: "ABC1231",
  stock: 52
};
const product6 = {
  title: "Producto 6",
  description: "Descripción 6",
  price: 101,
  thumbnail: "thumbnail1.jpg",
  code: "ABC1231",
  stock: 52
};
const product7 = {
  title: "Producto 7",
  description: "Descripción 3",
  price: 101,
  thumbnail: "thumbnail1.jpg",
  code: "ABC1231",
  stock: 52
};

async function addProducts() {
  try {
    await productManager.addProduct(product);
    console.log("Producto 1 agregado");

    await productManager.addProduct(product2);
    console.log("Producto 2 agregado");

    const response = await productManager.addProduct(product3);
    console.log("Producto 3 agregado:", response);

  
    const productIdToDelete = 2;
    return productManager.deleteProduct(productIdToDelete);
  } catch (err) {
    console.log("Error:", err);
  }
}

addProducts()

  .then(deletedProductId => {
    console.log("Producto eliminado con ID:", deletedProductId);
    return productManager.getProducts();
  })
  
  .catch(err => {
    console.log("Error:", err);
  })

  
  .then(() => {
    const productIdToUpdate = 1;
    const updates = {
      title: "Producto 1",
      description: "Descripción 1",
      thumbnail: "thumbnail1.jpg",
      code: "ABC123",
      price: 15,
      stock: 60
    };
    return productManager.updateProduct(productIdToUpdate, updates);
  })
  .then(updatedProduct => {
    console.log("Producto actualizado:", updatedProduct);
    return productManager.getProducts();
  })
  .then(products => {
    console.log("Lista de productos actualizada:", products);
  })
  .catch(err => {
    console.log("Error:", err);
  });
