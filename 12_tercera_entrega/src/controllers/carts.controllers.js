import { response, request } from "express";
import cartsService from "../services/carts.service.js";
import productsService from "../services/products.service.js";
import {v4 as uuidv4} from 'uuid';
import TicketModel from "../dao/models/ticket.model.js";
import { sendMessage } from "../messages/sms/twilio.js"
import { ticketConfirmation } from '../messages/email/nodemailer.js';

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
    purchaseCart = async (req, res) => {
        try {
            const cartId = req.params.idcart;
            const email = req.body.email;
            const cart = await cartsService.getCartById(cartId);
            if(cart){
                if(!cart.products.length){
                    return res.send("Please, add your products before to generate the purchase")
                }
                const ticketProducts = [];
                const rejectedProducts = [];
                for(let i=0; i<cart.products.length;i++){
                    const cartProduct = cart.products[i];
                    const productDB = await productsService.getProductById(cartProduct.product._id);
                    if(cartProduct.quantity<=productDB.stock){
                        await cartsService.deleteProductInCart(cartId,cartProduct.product._id.toString())
                        ticketProducts.push(cartProduct);
                    } else {
                        rejectedProducts.push(cartProduct);
                    }
                }

                const newTicket = {
                    code:uuidv4(),
                    purchase_datetime: new Date().toLocaleString(),
                    amount:500,
                    purchaser:email,
                    products: ticketProducts
                }
                const ticketCreated = await TicketModel.create(newTicket);
                //await sendMessage(`The ticket with your purchase ${newTicket.code} was successfully created at ${newTicket.purchase_datetime}!`)
                let messageTicketConfirmation = `The ticket with your purchase ${newTicket.code} was successfully created at ${newTicket.purchase_datetime}!`
                await ticketConfirmation(email,messageTicketConfirmation)
                res.send(ticketCreated)
            } else {
                res.send("Cart doesn't exist")
            }
        } catch (error) {
            res.send(error.message)
        }
    } 
}

export default ProductsController;