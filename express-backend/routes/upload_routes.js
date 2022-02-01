const cors = require("cors")
const multer = require("multer")
const Meme = require("../schemas/memeSchema")
const Template = require("../schemas/templateSchema")
const storage = multer.memoryStorage()
const upload = multer({storage: storage})


module.exports = app => {

    app.post("/upload", cors(), upload.single("meme"), (req, res) => {

        let meme = {
            template: req.file.buffer,
            author: req.body.author,
            date: req.body.date,
            text1: req.body.text1,
            text2: req.body.text2,
            text3: req.body.text3,
            text4: req.body.text4,
            votes: req.body.votes,
            private: req.body.private,
            color: req.body.color,
            size: req.body.size,
            transparency: req.body.transparency,
            font: req.body.font
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

    app.post("/uploadTemplate", cors(), upload.single("template"), (req, res) => {

        let template = {
            image: req.file.buffer,
            author: req.body.author,
            name: req.body.name
        }

        new Template(template)
            .save()
            .then(() => res.redirect("http://localhost:3000/test"))
            .catch(err => {
                console.log(err)
                res.redirect("http://localhost:3000/error")
            })
    })

}
