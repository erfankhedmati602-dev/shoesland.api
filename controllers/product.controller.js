const helper = require('../utils/helper');
const productService = require('../services/product.service')


exports.addProduct = async (req, res)=> {
    let body = req.body;
    body.variants = JSON.parse(body.variants);
    const checkReqBody = helper.checkAddProduct(body);
    // uploadImages
    const images = await productService.uploadProductImage(req.files);
    const bodyData = { ...body, images }
    const data = await productService.addProduct(bodyData);
    if(!data.success) return res.status(400).json(data)
    return res.status(201).json(data.product);
}

exports.getProductById = async (req, res)=> {
    const productId = req.params.id;
    const data = await productService.getProductById(productId);
    if(!data.success) res.status(404).json(data);
    res.status(200).json(data);
}