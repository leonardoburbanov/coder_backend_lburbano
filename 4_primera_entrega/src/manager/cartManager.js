import fs from 'fs';
import __dirname from '../utils.js';
import ProductManager from "./productManager.js";
const path_products = __dirname+'/files/Products.json'
const productManager = new ProductManager(path_products);

export default class CartManager {
    constructor(path){
        this.path = path

    }

    addProductInCart = async (id_cart, id_product) => {
        const productExists = await productManager.getProductById(id_product)
        if(!productExists){
            throw Error('Product not exists.');
        }else{
            const carts = await this.getCarts();
        let cart_found = carts.find(cart => cart.id == id_cart)
        if(!cart_found){
            throw Error('Cart not exists.');
            return;
        }else{
            let productsInCart = cart_found.products;
            const productIndex = productsInCart.findIndex(product => product.id == id_product)

            if(productIndex !== -1){
                productsInCart[productIndex].quantity = productsInCart[productIndex].quantity + 1
            }else{
                let product = {
                    id: id_product,
                    quantity : 1
                }
                productsInCart.push(product)
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts,null, '\t'))
            return carts
            }
        }
        
    }
    getCarts = async () =>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const users = JSON.parse(data);
            return users;
        }else{
            return [];
        }
    }
    addCart = async (cart) => {
        const carts = await this.getCarts();

        if(carts.length === 0){
            cart.id = 1
        }else{
            cart.id = carts[carts.length-1].id+1;
        }
        carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts,null, '\t'))
        return carts
    }
    getCartById = async(id_cart)=>{
        let carts = await this.getCarts();
        let cart_found = carts.find(cart => cart.id == id_cart)
        if(cart_found){
            return cart_found
        }else{
            return;
        }
    }
    updateCart = async(id_cart,object_to_update)=>{
        let carts = await this.getCarts();
        let cart_found = carts.find(cart => cart.id == id_cart)
        if(cart_found){
            let new_carts = []
            carts.forEach(element => {
                if(element.id == id_cart){
                    Object.assign(element,object_to_update)
                    new_carts.push(element)
                }else{
                    new_carts.push(element)
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(new_carts,null, '\t'))
            return new_carts;   
        }else{
            return 'Error in update operation. cart not found.'
        }
    
       

    }

    deleteCart = async(id_cart)=>{
        let carts = await this.getCarts();
        let cart_found = carts.find(cart => cart.id == id_cart)
        if(cart_found){
            let new_carts = []
            carts.forEach(element => {
                if(element.id == id_cart){
                    
                }else{
                    new_carts.push(element)
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(new_carts,null, '\t'))
            return cart_found;   
        }else{
            return 'Error in delete operation. cart not found.'
        }
    
       

    }

}