import productModel from "./models/products.model.js";

class ProductsDaoMemory {
    checkDuplicatedProduct = async (code) =>{
      let result = await productModel.find({code: code})
      if(result.length > 0){
          return true
      }
      else{
          return false
      }
  }
  getProducts = async (params) =>{
      const { limit, input_page, query,sort } = params
      const {docs, hasPrevPage, hasNextPage, nextPage, prevPage,totalDocs,page,totalPages} = await productModel.paginate(query,{limit:limit, page:input_page,sort: sort,lean:true})
      return {docs, hasPrevPage, hasNextPage, nextPage, prevPage,totalDocs,page,totalPages};
  }

  addProduct = async (product) => {
      let product_duplicated = await this.checkDuplicatedProduct(product.code)
      if(product_duplicated==true){
          throw new Error("Product with duplicated code")
      }else{
      await productModel.create(product);
      return product
      }
  }
  getProductById = async(idProduct)=>{
    try{
        let product_found = await productModel.find({_id:idProduct})
        if(product_found){
            return product_found[0]
        }else{
        throw new Error('Error in get operation. Product not found.')
        }
    }catch(error){
        throw new Error('Error in get operation. Product not found.')
    }
  }
  updateProduct = async(id_product,newProduct)=>{
      let product_found = await productModel.find({_id:id_product})
      if(product_found){
          let result = await productModel.updateOne({_id:id_product},{$set:newProduct})
          let products = await this.getProducts();
          return products;   
      }else{
          throw new Error('Error in update operation. Product not found.')
          return;
      }
  }
  deleteProduct = async(id_product)=>{
      let products = await this.getProducts();
      let product_found = await productModel.find({_id:id_product});
      if(product_found){
          const result = await productModel.deleteOne({_id:id_product});
          products = await this.getProducts();
          return product_found;   
      }else{
          throw new Error('Error in delete operation. Product not found.')
          return;
      }
  }
}

export default new ProductsDaoMemory();