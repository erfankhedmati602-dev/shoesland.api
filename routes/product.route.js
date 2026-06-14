const router = require('express').Router();
const controller = require("../controllers/product.controller")
const upload = require("../config/upload");

router.get("/getAllProduct", controller.getAllProduct)
router.post("/addProduct", upload.array('images', 5), controller.addProduct)
router.get("/:id", controller.getProductById)

module.exports = router;