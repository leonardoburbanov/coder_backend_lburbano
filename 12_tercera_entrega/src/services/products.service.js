import productsDaoMemory from "../dao/products.dao.js";

class ProductsService {
  getProducts(params) {
    return productsDaoMemory.getProducts(params);
  }

  addProduct(product) {
    return productsDaoMemory.addProduct(product);
  }
  getProductById(idProduct){
    return productsDaoMemory.getProductById(idProduct);
  }
  updateProduct(idProduct,newProduct){
    return productsDaoMemory.updateProduct(idProduct,newProduct);
  }
  deleteProduct(idProduct){
    return productsDaoMemory.deleteProduct(idProduct);
  }
}

export default new ProductsService();
