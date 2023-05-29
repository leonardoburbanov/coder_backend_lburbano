import { Router } from 'express';
import userModel from '../models/User.model.js';
import { createHash, validatePassword } from '../utils.js';
import passport from 'passport';

const router = Router();

const adminUser = {
    first_name: 'Admin',
    last_name: 'Coderhouse',
    email: 'adminCoder@coder.com',
    password: 'adminCod3r123',
    age: '7',
    rol: 'admin'
  };


router.post('/register', passport.authenticate('register', { failureRedirect:'/failregister'} ),async (req, res) =>{
    res.send({status:"success", message:"User registered"});
})

router.get('/failregister', async (req,res)=>{
    console.log('Fallo en el registro');
    res.send({error: 'Error en el registro'})
})

router.post('/login', passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req,res)=>{
    if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        rol: req.user.rol
    }
    res.send({status:"success", payload:req.user, message:"Primer logueo!!"})
})

router.get('/faillogin', async (req,res)=>{

    console.log('Fallo en el ingreso');
    res.send({error: 'Error en el ingreso'})

})

router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req,res)=>{
})

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), async (req,res)=>{

    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        rol: req.user.rol,
        githubProfile: req.user.githubProfile
    }
    console.log('UserGithub',req.user)
    res.redirect('/')

})


router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
        res.redirect('/');
    })
})

export default router;