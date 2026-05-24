const mongoos = require("mongoose");

const allowedCategory = ['men', 'women', 'kids'];

const productSchema = new mongoos.Schema({
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
    variants: [{
        sku: {
            type: String,
            require: true,
            unique: true
        },
        size: {
            type: Number,
            rquire: true
        },
        color: {
            require: true,
            type: String
        },
        stock: {
            type: Number,
            require: true,
            min: 0,
            defualt: 0
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema);