import productsDaoMemory from "./products.dao.js";
import cartModel from "./models/carts.model.js";

class CartsDaoMemory {
  deleteProductInCart = async (id_cart, id_product) => {
    let cart_found = await cartModel.find({_id:id_cart})
    if(!cart_found[0]){
        throw Error('Cart not exists.');
        return;
    }else{
        let productsInCart = cart_found[0].products;
        const productIndex = productsInCart.findIndex(product => product.product._id == id_product)
        if(productIndex !== -1){
            productsInCart.splice(productIndex)
        }else{
            throw Error('Product does not exists in Cart.');
        }
        await cartModel.updateOne({_id:id_cart},{$set:{products:productsInCart}});
        let carts = this.getCarts();
        return carts
        }
  }
  addProductInCart = async (id_cart, id_product) => {
      const productExists = await productsDaoMemory.getProductById(id_product)
      if(!productExists){
          throw Error('Product not exists.');
      }else{
      let cart_found = await cartModel.find({_id:id_cart})
      if(!cart_found[0]){
          throw Error('Cart not exists.');
          return;
      }else{
          let productsInCart = cart_found[0].products;
          const productIndex = productsInCart.findIndex(product => product.product._id == id_product)
          if(productIndex !== -1){
              productsInCart[productIndex].quantity = productsInCart[productIndex].quantity + 1
          }else{
              let product = {
                  product: id_product,
                  quantity : 1
              }
              productsInCart.push(product)
          }
          await cartModel.updateOne({_id:id_cart},{$set:{products:productsInCart}});
          let carts = this.getCarts();
          return carts
          }
      }
      
  }

  updateProductInCart = async (id_cart, id_product, quantity) => {
      const productExists = await productsDaoMemory.getProductById(id_product)
      if(!productExists){
          throw Error('Product not exists.');
      }else{
      let cart_found = await cartModel.find({_id:id_cart})
      if(!cart_found[0]){
          throw Error('Cart not exists.');
          return;
      }else{
          let productsInCart = cart_found[0].products;
          const productIndex = productsInCart.findIndex(product => product.product._id == id_product)
          if(productIndex !== -1){
              productsInCart[productIndex].quantity = quantity
          }else{
              throw Error('Product does not exist in the cart')
          }
          await cartModel.updateOne({_id:id_cart},{$set:{products:productsInCart}});
          let carts = this.getCarts();
          return carts
          }
      }
      
  }
  getCarts = async () =>{
      const carts = await cartModel.find();
      return carts
  }
  addCart = async (cart) => {
      await cartModel.create(cart);
      let carts = await this.getCarts();
      return carts
  }
  getCartById = async(id_cart)=>{
      let cart_found = await cartModel.find({_id:id_cart}).populate('products.product')
      if(cart_found[0]){
          return cart_found[0]
      }else{
          return;
      }
  }
  updateCart = async(id_cart,newProducts)=>{
      let carts = await this.getCarts();
      let cart_found = await cartModel.find({_id:id_cart})
      if(cart_found){
          let result = await cartModel.updateOne({_id:id_cart},{$set:{products:newProducts}})
          carts = this.getCarts();
          return carts;   
      }else{
          return 'Error in update operation. cart not found.'
      }
  }

  deleteCart = async(id_cart)=>{
      let cart_found = await cartModel.find({_id:id_cart})
      if(cart_found.length!=0){
          let productsInCart = []
          await cartModel.updateOne({_id:id_cart},{$set:{products:productsInCart}});
          let carts = this.getCarts();
          return carts
      }else{
          throw new Error('Error in delete operation. Cart not found.')
      }
  }
}

export default new CartsDaoMemory();