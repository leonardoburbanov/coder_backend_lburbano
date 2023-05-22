import { Router } from "express";
import productModel from "../models/products.js";
import cartModel from "../models/carts.js";

const router = Router();

router.get("/products", async (req,res)=>{

    const {page = 1} = req.query;

    const {docs, hasPrevPage, hasNextPage, nextPage, prevPage ,totalPages  } = await productModel.paginate({},{limit:4, page, lean:true })
    const products = docs;
    if(page <= totalPages && page >0 && docs.length > 0){
        res.render('products', {
            products,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        })
    }else{
        res.status(400).send({error:'Page not exists'})
    }
    

})

router.get("/products/:idproduct", async (req,res)=>{

    const idProduct = req.params.idproduct

    const product = await productModel.find({"_id":idProduct})
    const carts = await cartModel.find()
    res.render('product_detail', {
        product:product[0].toJSON(),
        carts: carts.map(cart => cart.toJSON())
    })

})

router.get("/carts/:idcart", async (req,res)=>{

    const idCart = req.params.idcart

    const carts = await cartModel.find({"_id":idCart}).populate('products.product')
    const products = carts[0].products;
    res.render('carts', {
        idCart,
        products: products.map(product => product.toJSON())
    })

})

export default router;

