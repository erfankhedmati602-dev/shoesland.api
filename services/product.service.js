const productModel = require('../models/product.model')
const cloadinary = require("../config/cloudinary")
const streamifier = require("streamifier");

exports.addProduct = async (data) => {
    try {
        const product = await productModel.create(data)
        return { success: true, product: product, message: "product added" }
    } catch (err) {
        return { success: false, product: null, message: err.message }
    }
}

exports.uploadProductImage = async (files) => {
    const imageUrl = [];
    for (const file of files) {
        const relust = await new Promise((res, rej) => {
            const stream = cloadinary.uploader.upload_stream(
                {
                    folder: "shoesland/products"
                }, 
                (err, result) => {
                    if (err) rej(err);
                    else res(result);
                }
            )
            streamifier.createReadStream(file.buffer).pipe(stream);
        });

        imageUrl.push(relust.secure_url);
    }

    return imageUrl;
}