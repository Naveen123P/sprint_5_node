const mongoose = require('mongoose')

const productSchemaRules = {
    // yet need to add rules
    name : {
        type: String,
        required: [true, "Kindly provide the product name"],
        unique: [true, "product name should be unique"],
        maxLength: [40, "your product length is more than 40 characters"]
    },
    price: {
        type: String,
        required: [true, "Kindly provide price"],
        validate: {
            validator: function(){
                return this.price > 0
            }
        },
            message: "price can't be negative",
    },
    categories: {
        type: String,
        required: true
    },
    productImage: {
        type: [String],
    },
    averageRating: Number,
    discountPrice: {
        type: Number,
        validate: {
            validator: function(){
                return this.price > this.discountPrice
            }        
        },
        message: "Discount must be less than actual Price"
    },
}
const productSchema = new mongoose.Schema(productSchemaRules)
// this model will have queries/ syntaxes 
const ProductModel = mongoose.model("ProductModel", productSchema)

module.exports = ProductModel