const router = require("express").Router(); 
const {googleLogin} = require("../controllers/AuthContoller");

router.get("/test", (req, res) => {
    res.send("Hello World");
})

router.get("/google", googleLogin)

module.exports = router