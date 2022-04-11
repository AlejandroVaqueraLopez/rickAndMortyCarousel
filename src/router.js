//modules
const {Router} = require("express");
const router = Router();
const path = require("path");
//routes
router.get("/",(req,res) => {
	res.render(path.join(__dirname, "./views/index.html"));
});
module.exports = router;