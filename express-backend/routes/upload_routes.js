const cors = require("cors")
const multer = require("multer")
const Meme = require("../schemas/memeSchema")
const storage = multer.memoryStorage()
const upload = multer({storage: storage})


module.exports = app => {

    app.post("/upload", cors(), upload.single("meme"), (req, res) => {

        let meme = {
            author: "Yoshi", template: req.file.buffer, text1: "some text"
        }

        new Meme(meme)
            .save()
            .then(() => res.redirect("http://localhost:3000/test"))
            .catch(err => {
                console.log(err)
                // always redirect from server, otherwise no response
                // example redirect to some error page
                res.redirect("http://localhost:3000/error")
            })

    })

}
