import productsModel from './models/products.model.js';

class ProductsManager {
    constructor(){

    }
    getAll = async (limit = 0 , page = 1) => {
        try {
            return limit === 0 ? await productsModel.find().lean():  await productsModel.paginate({}, {page: page, limit: limit, lean: true});
        } catch (err) {
            return err.message;
        };
    };

    getById = async (id) => {
        try {
            return await productsModel.findById(id).lean();
        } catch (err) {
            return err.message;
        };
    };

    add = async (newData) => {
        try {
            return await productsModel.create(newData);
        } catch (err) {
            return err.message;
        };
    };

    update = async (filter, update, options) => {
        try {
            return await productsModel.findOneAndUpdate(filter, update, options);
        } catch (err) {
            return err.message;
        };
    };

    delete = async (id) => {
        try {
            return productsModel.findOneAndDelete(id);
        } catch (err) {
            return err.message;
        };
    };
};

export default ProductsManager;