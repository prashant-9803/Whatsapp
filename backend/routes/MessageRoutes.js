const multer = require("multer")

const { addMessage, getMessages, addImageMessage, addAudioMessage } = require("../controllers/MessageController");

const router = require("express").Router();

const upload = multer({dest: "uploads/recordings"})
const uploadImage = multer({dest: "uploads/images"})

router.post("/add-message", addMessage)
router.get("/get-messages/:from/:to", getMessages)
router.post("/add-image-message", uploadImage.single("image"), addImageMessage)
router.post("/add-audio-message", upload.single("audio"), addAudioMessage)

module.exports = router 