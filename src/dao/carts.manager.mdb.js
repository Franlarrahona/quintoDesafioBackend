import cartsModel from './models/carts.model.js';
import mongoose from 'mongoose';

class CartsManager{
    constructor(){

    }
    getAll =  async () =>{
        try {
            const process = cartsModel.find().lean();
            return await process 
        } catch(err){
            return err.message;
        }
    }
    getById = async (cid) =>{
        try{
            const process = cartsModel.findById(cid).lean()
            const result = process.find()

            return await result
        }catch(err){
            return err.message;
        }
    }
    add = async (newData) =>{
        try {
            const process = cartsModel.create(newData)
            return await process
        }catch(err){
            return err.message;
        }
    }
    update = async (filter, update, options) =>{
        try{
            const process = cartsModel.findOneAndUpdate(filter, update, options);
            return await process
        }catch(err){
            return err.message;
        }
    }
    delete = async(filter) =>{
        try{
            const process = cartsModel.findOneAndDelete(filter);
            return await process
        }catch(err){
            return err.message;
        }
    }

    deleteProducts = async(filter,update, options) =>{
        try{
            const process = cartsModel.findOneAndUpdate(filter,update,options)
            return await process
        }catch(err){
            return err.message
        }
    }

    deleteOneProduct = async (cid, pid) =>{
        if(!cid || !pid) {
            console.log("all fields are mandatory");
            return;
        }
        /*if(cid < 0 || pid < 0){
            console.log("the id is not falid");
            return;
        }*/

        try{
            console.log( await cartsModel.find())
            const cartExists = await cartsModel.findById(cid);
            console.log(cartExists)

            if(cartExists){
                const existingProduct = cartExists.products.find(item => item.id === pid);

                if(existingProduct) {
                    existingProduct.deleteOne()
                }
                await cartExists.save();
                
            }else{
                console.log("the cart does not exist");
            }
        } catch (error){
            console.log('error deleting the product:', error)
        }
    }
    
}

export default CartsManager;