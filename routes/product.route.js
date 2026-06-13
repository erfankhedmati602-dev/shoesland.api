const router = require('express').Router();
const controller = require("../controllers/product.controller")
const upload = require("../config/upload");

router.post("/addProduct", upload.array('images', 5), controller.addProduct)

module.exports = router;