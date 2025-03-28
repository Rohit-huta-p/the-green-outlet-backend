const { updateStore , get_store_details} = require("../controller/storeController");
const { verifyToken } = require("../utils/verifyToken");

const router = require("express").Router();


router.get("/profile", verifyToken ,get_store_details)
router.put("/update", verifyToken ,updateStore)

module.exports = router