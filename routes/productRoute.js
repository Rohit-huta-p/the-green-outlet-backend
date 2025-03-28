const multerUploads = require("../config/multer");
const { addProduct, get_all_products_by_id } = require("../controller/productController");
const { verifyToken } = require("../utils/verifyToken");

const router = require("express").Router();


router.post("/add", multerUploads.single('image'), addProduct)
router.get("/:storeId", get_all_products_by_id)

module.exports = router
