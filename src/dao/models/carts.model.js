import mongoose, { mongo } from 'mongoose';
import usersModel from './users.model.js'
import productsModel from './products.model.js';

mongoose.pluralize(null);

const collection = 'carts';
const db = mongoose.connection.useDb('ecommerce')

const schema = new mongoose.Schema({
    _user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users_index'
    },
    products: {
        type: [{
            _id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product' }, 
            qty: {type: Number, required: true, min:1}
        }],
        required: true,
        validate: [(products) => products.length > 0, 'El carrito debe tener al menos un producto']
    }
})

const autoPopulate = function(next) {
    this.populate({ path: "_user_id", model: usersModel });
    this.populate({ path: 'products._id', model: productsModel });
    next();
};


    schema.pre('find', autoPopulate)



const cartsModel = db.model(collection, schema);

export default cartsModel;