import express from 'express';
import ProductManager from "./manager/productManager.js";
const path = './src/files/Products.json'

const PORT = 8080;
const app = express();

//Rutas listas para test
// http://localhost:8080/products
// http://localhost:8080/products?limit=5
// http://localhost:8080/products/2
// http://localhost:8080/products/34123123

//Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager(path);

app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT)
})


app.get('/products', async (req, res)=>{
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

app.get('/products/:idProduct', async (req,res)=>{

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