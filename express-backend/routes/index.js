var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/post_meme", async (req, res) => {
  let {meme} = req.body
  console.log(meme)
});

router.get("/home", async(req, res) => {
  res.send("Put a meme here")
})

module.exports = router;
