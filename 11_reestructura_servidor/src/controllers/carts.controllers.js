import { response, request } from "express";
import cartsService from "../services/carts.service.js";

class Cart {
    constructor(products = []) {
      this.products = products;
    }
  }


class ProductsController {
  getCarts = async (req, res) => {
    let limit;
    let carts = await cartsService.getCarts()
    if(req.query.limit){
        limit = req.query.limit
        carts = carts.slice(0,limit)
    }
    res.send({
        carts
    })
  };
  addCart = async (req, res) => {
    const {products} = req.body;
    try {
        let cart = new Cart(products);
        let carts = await cartsService.addCart(cart);
        res.send({
            carts
        });
    }catch(error){
        res.status(400).send({error:error.message});
    }
  }

  getCartById = async (req, res) => {
    const idcart = req.params.idcart;

    let cart = await cartsService.getCartById(idcart)
    let products = cart.products
    let response;
    if(!cart){
        response = {
            error:"cart not found."
        }
        res.status(400).send(response)
    }else{
        res.send({products})
    }
  }
  addProductInCart= async (req, res) => {
    const idcart = req.params.idcart;
    const idproduct = req.params.idproduct;
    try {
        let carts = await cartsService.addProductInCart(idcart,idproduct)
        res.send(carts)
    }catch(error){
        res.status(400).send({error:error.message})
    }
  }
  updateProductInCart = async (req, res) => {
    const idcart = req.params.idcart;
    const idproduct = req.params.idproduct;
    const quantity = req.body.quantity;
    try {
        let carts = await cartsService.updateProductInCart(idcart,idproduct,quantity)
        res.send(carts)
    }catch(error){
        res.status(400).send({error:error.message})
    }
  }
  deleteProductInCart = async (req, res) => {
    const idcart = req.params.idcart;
    const idproduct = req.params.idproduct;
    try {
        let carts = await cartsService.deleteProductInCart(idcart,idproduct)
        res.send(carts)
    }catch(error){
        res.status(400).send({error:error.message})
    }
    }
    deleteCart = async (req, res) => {
        const idcart = req.params.idcart;
        try {
            let carts = await cartsService.deleteCart(idcart)
            res.send({carts})
        }catch(error){
            res.status(400).send({error:error.message});
        }
    
    }
    updateCart = async (req, res) => {
        const idcart = req.params.idcart;
        const newProducts = req.body;
        try {
            let carts = await cartsService.updateCart(idcart,newProducts)
            res.send({carts})
        }catch(error){
            res.status(400).send({error:error.message});
        }
    
    } 
}

export default ProductsController;