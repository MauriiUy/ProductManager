const fs = require('fs');

class ProductManager {
  constructor(file) {
    this.products = [];
    this.idProduct = 0;
    this.path = `${process.cwd()}/files/${file}`;
  }

  getProducts() {
    return this.products;
  }

  async addProduct(product) {
    try {
      this.idProduct++;
      const { title, description, price, thumbnail, code, stock } = product;
      const newProduct = {
        id: this.idProduct,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const product = JSON.parse(data);
        return product;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  }

//ACTUALIZAR OBJETOS

  async updateProduct(id, updatedData) {
    try {
      const product = this.products.find((product) => product.id === id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }

      const updatedProduct = { id, ...updatedData };
      const index = this.products.findIndex((product) => product.id === id);
      this.products[index] = updatedProduct;

      await fs.promises.writeFile(this.path, JSON.stringify(this.products));

      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }
//ELIMINAR
  async deleteProduct(id) {
    try {
      const index = this.products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }

      this.products.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));

      return id;
    } catch (error) {
      console.log(error);
    }
  }

}


module.exports = ProductManager;