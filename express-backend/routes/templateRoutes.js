const cors = require("cors");
const Template = require("../schemas/templateSchema")
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({storage: storage})


module.exports = app => {
    app.get("/allTemplates", cors(), (req, res) => {
        Template
            .find({})
            .then(result => {
                res.send(result)
            })
            .catch(error => console.log(error))
    })

    app.post("/addTemplate", cors(), upload.single("image"), (req, res) => {
        let template = new Template({
            author: req.body.author,
            name: req.body.name,
            date: new Date().toISOString(),
            image: req.file.buffer,
            private: req.body.private
        })

        template
            .save()
            .then(() => res.send("Saved template!"))
            .catch(err => console.error(err))
    })
}