const mongoose = require("mongoose");

const allowedCategory = ['men', 'women', 'kids'];

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: String,
        require: true,
        enum: {
            values: allowedCategory,
            message: 'Valuse is not a valid product type. Allowed types are:' + allowedCategory.join(", ")
        }
    },
    type: {
        type: String,
        require: true,
    },
    description: String,
    price: {
        type: Number,
        require: true,
        min: 0
    },
    images: [{
        type: String
    }],
    variants: [{
        sku: {
            type: String,
            require: true,
            unique: true
        },
        size: {
            type: Number,
            require: true
        },
        color: {
            require: true,
            type: String
        },
        stock: {
            type: Number,
            require: true,
            min: 0,
            default: 0
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema);