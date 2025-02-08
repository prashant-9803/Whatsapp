const multer = require("multer")

const { addMessage, getMessages, addImageMessage } = require("../controllers/MessageController");

const router = require("express").Router();

const uploadImage = multer({dest: "uploads/images"})

router.post("/add-message", addMessage)
router.get("/get-messages/:from/:to", getMessages)
router.post("/add-image-message", uploadImage.single("image"), addImageMessage)

module.exports = router 