import { response, request } from "express";
import productsService from "../services/products.service.js";

class Product {
    constructor(title, description, price, thumbnail = null, code, stock, status = true, category) {
      if (!title || !description || !price || !code || !stock) {
        throw new Error('All main fields required: title, description, price, code, stock');
      }
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
      this.status = status;
      this.category = category;
    }
  }


class ProductsController {
  getProducts = async (req, res) => {
    try {
      let limit;
      let result;
      let page;
      let sort;
      let query;
      if(req.query.limit){
          limit = parseInt(req.query.limit)
      }else{
          limit = 10
      }
      if(req.query.page){
          page = parseInt(req.query.page)
      }else{
          page=1
      }
      if(req.query.query){
          query=JSON.parse(req.query.query)
          if(query.status!=null || query.category!=null || query.stock!=null){
              query = query
          }else{
              throw new Error("The query is not correct")
          }
      }else{
          query={}
      }
      if(req.query.sort){
          sort = req.query.sort
          if(sort=='asc'){
              sort = 'price'
          }else if(sort=='desc'){
              sort = '-price'
          }
      }else{
          sort = null
      }

      let params = {
          limit: limit,
          input_page: page,
          query: query,
          sort: sort
      }
      result = await productsService.getProducts(params)
      let products = result.docs;
      let nextLink=null;
      let prevLink=null;
      let host = req.headers.host;
      if(result.hasPrevPage==true){
          prevLink= 'http://'+host+'/api/products?page='+result.prevPage
      }
      if(result.hasNextPage==true){
          nextLink= 'http://'+host+'/api/products?page='+result.nextPage
      }

      res.send({
          status: 'Success',
          code:200,
          payload: products,
          totalPages: result.totalPages,
          prevPage: result.prevPage,
          nextPage: result.nextPage,
          page: result.page,
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          prevLink: prevLink,
          nextLink: nextLink
      })
      }catch(error){
          res.status(400).send({error:error.message});
      }
  };
  getProductById = async (req, res) => {
    try{
      const idProduct = req.params.idProduct;
      let product = await productsService.getProductById(idProduct)
      let response;
      if(!product){
          response = {
              error:"Product not found."
          }
      }else{
          response = {product}
      }
      res.send(response)
    }catch(error){
      res.status(400).send({error:error.message});
    }
  }

  addProduct = async (req, res) => {
    const {title, description, price, thumbnail, code, stock, status , category} = req.body;
    try {
        let product = new Product(title, description, price, thumbnail, code, stock, status , category);
        let products = await productsService.addProduct(product);
        res.send({
            data:product,
            message:"Product created"
        });
    }catch(error){
        res.status(400).send({error:error.message});
        }
    }
    updateProduct= async (req, res) => {
        const idProduct = req.params.idProduct;
        const productUpdate = req.body;
        try {
            let products = await productsService.updateProduct(idProduct,productUpdate)
            res.send({products})
        }catch(error){
            res.status(400).send({error:error.message});
        }
    }
    deleteProduct= async (req, res) => {
        const idProduct = req.params.idProduct;
        try {
            let product_deleted = await productsService.deleteProduct(idProduct)
            res.send({product_deleted})
        }catch(error){
            res.status(400).send({error:error.message});
        }
    }
    getProductById = async (req, res) => {
        const idProduct = req.params.idProduct;
        let product = await productsService.getProductById(idProduct)
        let response;
        if(!product){
            response = {
                error:"Product not found."
            }
        }else{
            response = {product}
        }
        res.send(response)
    }
}

export default ProductsController;