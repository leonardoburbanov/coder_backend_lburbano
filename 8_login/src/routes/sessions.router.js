import { Router } from 'express';
import userModel from '../models/User.model.js';

const router = Router();

const adminUser = {
    first_name: 'Admin',
    last_name: 'Coderhouse',
    email: 'adminCoder@coder.com',
    password: 'adminCod3r123',
    age: '7',
    rol: 'admin'
  };


  router.post('/register', async (req, res) =>{
    
    const {first_name, last_name, email, rol, age, password} = req.body;

    if(email==adminUser.username){
        return res.status(400).send({status:"error", error:"User already exists"});
    }else{
        const exist = await userModel.findOne({email});
        if(exist){
            return res.status(400).send({status:"error", error:"User already exists"});
        }
        const user = {
            first_name, last_name, email, rol, age, password
        };
    
        const result = await userModel.create(user);
        res.send({status:"succes", message:"User registered"});
    }
})

router.post('/login', async (req,res)=>{
    const { email, password } = req.body;

    if(email === adminUser.email && password === adminUser.password){
        req.session.user = await {
            name: `${adminUser.first_name} ${adminUser.last_name}`,
            email: adminUser.email,
            age: adminUser.age,
            rol: adminUser.rol
        }
        res.send({status:"success", payload:req.res.user, message:"Primer logueo!!"})
    }else{
        const user = await userModel.findOne({email,password})

        if(!user){
            return res.status(400).send({status:"error", error:"Datos incorrectos"})
        }
      
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: user.rol
        }
        res.send({status:"success", payload:req.res.user, message:"Primer logueo!!"})
    }
})

router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
        res.redirect('/');
    })
})

export default router;