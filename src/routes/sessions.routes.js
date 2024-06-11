import { Router } from "express";

import config from '../config.js';

const router = Router();


const adminAuth = (req,res, next) =>{
    if(req.session.user.role !== 'admin')
        return res.status(401).send({origin: config.SERVER, payload: 'acceso no autorizado, se requiere autenticacion y admin'});
    next();
}


router.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;


        const savedFirstName = 'José';
        const savedLastName = 'Perez';
        const savedEmail = 'idux.net@gmail.com';
        const savedPassword = 'abc123';
        const savedRole = 'admin';

        if(email !== savedEmail || password !== savedPassword){
            return res.status(401).send({ origin: config.SERVER, payload:'datos de acceso invalidos'})
        }

        req.session.user = {firstName: savedFirstName, lastName: savedLastName, email: email, role: savedRole };
        res.redirect('/products');
    }catch(err){
        res.status(500).send({origin: config.SERVER, payload: null, error: err.menssage})
    }
});

router.get('/private', adminAuth, async (req,res) =>{
    try{
        res.status(200).send({origin: config.SERVER, payload: 'bienvenido admin'});
    }catch(err){
        res.status(500).send({origin:config.SERVER, payload: null, error: err.message});
    }
});

router.get('/logout', async(req,res) =>{
    try{
        req.session.destroy((err) =>{
            if(err) return res.status(500).send({origin: config.SERVER, payload:'error al ejecutar logout', error:err})
            res.redirect('/login')
        });
    }catch(err){
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message})
    }
})

export default router;