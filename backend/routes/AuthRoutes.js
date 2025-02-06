const router = require("express").Router(); 
const {googleLogin, onBoardUser, getAllUsers} = require("../controllers/AuthContoller");

router.get("/test", (req, res) => {
    res.send("Hello World");
})

router.get("/google", googleLogin)

router.post("/onboard-user", onBoardUser)

router.get("/get-contacts", getAllUsers)

module.exports = router