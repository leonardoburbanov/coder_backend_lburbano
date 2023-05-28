import { Router } from "express";
import productModel from "../models/products.js";
import cartModel from "../models/carts.js";
import userModel from '../models/User.model.js';

const router = Router();


const adminAcces = (req,res,next) =>{
    console.log(req.session.user.rol);
    if(req.session.user.rol !== 'admin'){
        console.log('Solo se admite rol Admin');
        return res.redirect('/');
    } 
    next();
}


const publicAcces = (req,res,next) =>{
    if(req.session.user) return res.redirect('/profile');
    next();
}

const privateAcces = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/');
    next();
}

router.get('/users', privateAcces, adminAcces, async (req,res)=>{
    const users = await userModel.find().lean();
    const user = req.session.user;

     res.render('users', {
        users, user
    }) 
})


router.get('/register', publicAcces, (req,res)=>{
    res.render('register')
})

router.get('/', publicAcces, (req,res)=>{
    res.render('login')
})

router.get('/profile', privateAcces ,(req,res)=>{
    res.render('profile',{
        user: req.session.user
    })
})


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
            nextPage,
            user: req.session.user
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

