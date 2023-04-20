import { Router } from 'express';
import ProductManager from "../manager/productManager.js";
import __dirname from '../utils.js';
const path = __dirname+'/files/Products.json'


const manager = new ProductManager(path);
const router = Router();

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


router.get('/', async (req, res)=>{
    let limit;
    let products = await manager.getProducts()
    if(req.query.limit){
        limit = req.query.limit
        products = products.slice(0,limit)
    }
    res.send({
        products
    })
})

router.post('/', async (req, res)=>{
    const {title, description, price, thumbnail, code, stock, status , category} = req.body;
    try {
        let product = new Product(title, description, price, thumbnail, code, stock, status , category);
        let products = await manager.addProduct(product);
        const io = await req.app.get("socket");
        await io.emit('products', products);
        res.send({
            products
        });
    }catch(error){
        res.status(400).send({error:error.message});
    }
})

router.put('/:idProduct', async (req, res)=>{
    const idProduct = req.params.idProduct;
    const productUpdate = req.body;
    try {
        let products = await manager.updateProduct(idProduct,productUpdate)
        res.send({products})
    }catch(error){
        res.status(400).send({error:error.message});
    }

})

router.delete('/:idProduct', async (req, res)=>{
    const idProduct = req.params.idProduct;
    try {
        let product_deleted = await manager.deleteProduct(idProduct)
        let products = await manager.getProducts()
        const io = await req.app.get("socket");
        await io.emit('products', products);
        res.send({product_deleted})
    }catch(error){
        res.status(400).send({error:error.message});
    }

})

router.get('/:idProduct', async (req,res)=>{

    const idProduct = req.params.idProduct;

    let product = await manager.getProductById(idProduct)
    console.log(product)
    let response;
    if(!product){
        response = {
            error:"Product not found."
        }
    }else{
        response = {product}
    }
    res.send(response)
})

export default router;