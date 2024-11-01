const ProductModel = require('../model/ProductModel');
const {
    createFactory,
    getAllFactory,
    getByIdFactory,
    deleteByIdFactory
} = require('../utility/crudFactory');

const createProductHandler = createFactory(ProductModel);
const getAllProductsHandler = getAllFactory(ProductModel);
const getProductByIdHandler = getByIdFactory(ProductModel);
const deleteProductByIdHandler = deleteByIdFactory(ProductModel);

module.exports = {createProductHandler, getAllProductsHandler, getProductByIdHandler, deleteProductByIdHandler}