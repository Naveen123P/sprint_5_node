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
        type: Number,
        required: [true, "Kindly provide price"],
        validate: {
            validator: function(){
                return this.price > 0
            }
        },
            message: "price can't be negative",
    },
    categories: {
        type: [String],
        required: true
    },
    productImage: {
        type: [String],
    },
    averageRating: Number,
    discount: {
        type: Number,
        validate: {
            validator: function(){
                return this.price > this.discount
            }        
        },
        message: "Discount must be less than actual Price"
    },
    description: {
        type: String,
        required: [true, "Kindly provide the description"],
        maxLength: [2000, "your product description length is more than 2000 characters"],
    },
    stock_quantity: {
        type: Number,
        required: [true, "Kindly provide the stock quantity of the product at least 0"],
        validate: {
            validator: function(){
                return this.stock_quantity >= 0
            }
        },
        message: "stock quantity can't be negative",
    },
    brand: {
        type: String,
        required: [true, "Kindly provide the brand name"]
    },
}
const productSchema = new mongoose.Schema(productSchemaRules)
// this model will have queries/ syntaxes 
const validCategories = ["Electronics", "Photography","Men's Fashion", "Technology",  "Shoes", "Sports", "Audio", "Clothing", "Accessories", "Fashion", "Appliances", "Sports", "Grocery", "Beauty", "Furniture", "Books"]

productSchema.pre("save", function(next){
    const product = this;
    const invalidCategoriesArr = product.categories.filter((category) => !validCategories.includes(category))
    if(invalidCategoriesArr.length > 0){
        next(new Error("Products from this Categories are not to be sold"))
    }else {
        next()
    }
})

const ProductModel = mongoose.model("newProductModel", productSchema)

module.exports = ProductModel