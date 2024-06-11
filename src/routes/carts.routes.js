import { Router } from "express";

import config from "../config.js";
import CartsManager from '../dao/carts.manager.mdb.js';

//import cartsModel from '../dao/models/carts.model.js';
import usersModel from '../dao/models/users.model.js';
//import productsModel from '../dao/models/products.model.js';


const router = Router();
const manager = new CartsManager();

router.get('/', async (req, res) => {
    try {
        const process = await  manager.getAll();
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/one/:cid', async(req,res) =>{
    try{
        const process = await manager.getById(req.params.cid)
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    }catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const process = await manager.add(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const process = await manager.update(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const filter = { _id: req.params.cid };
        const process = await manager.delete(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:cid/products', async (req, res) =>{
    const filter = {_id: req.params.cid};
    const update = {"id": filter, "products": []}
    const options = { new: true };
    
    try{
        const process = await manager.deleteProducts(filter, update, options)
        res.status(200).send({ origin: config.SERVER, payload: process });
    }catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
})


router.delete('/:cid/products/:pid',async (req, res) =>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        manager.deleteOneProduct(cid, pid)

        
        res.status(200).send('success');
        
    }catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
})



export default router;