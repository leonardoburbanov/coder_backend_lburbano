import { Router } from 'express';
import axios from 'axios';


const router = Router();
const PORT = 8080
router.get('/', async (req, res)=>{
    let getProducts = await axios.get('http://localhost:'+PORT+'/api/products')
    let products = getProducts.data
    await res.render('index',products)
})
router.get('/realtimeproducts', async (req, res)=>{
    let getProducts = await axios.get('http://localhost:'+PORT+'/api/products')
    let products = getProducts.data
    await res.render('realTimeProducts',products)
})
export default router;