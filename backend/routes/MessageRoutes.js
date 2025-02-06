const { addMessage, getMessages } = require("../controllers/MessageController");

const router = require("express").Router();

router.post("/add-message", addMessage)
router.get("/get-messages/:from/:to", getMessages)

module.exports = router 