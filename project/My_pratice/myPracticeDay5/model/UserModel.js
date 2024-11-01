const mongoose = require('mongoose')


const userSchemaRules = {
    // yet need to add rules
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    conformPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function(){
            return this.password === this.conformPassword;
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


}

const userSchema = new mongoose.Schema(userSchemaRules)
// this model will have queries/ syntaxes 
const UserModel = mongoose.model("UserModel", userSchema)

module.exports = UserModel