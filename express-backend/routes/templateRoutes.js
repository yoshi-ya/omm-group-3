const Template = require("../schemas/templateSchema")
const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({storage: storage})


module.exports = app => {

    app.get("/allTemplates", cors(), (req, res) => {
        let dbFilter = {}
        if (req.query.private) dbFilter.private = req.query.private
        if (req.query.author) dbFilter.author = req.query.author
        Template
            .find(dbFilter)
            .then(result => {
                res.send(result)
            })
            .catch(error => console.log(error))
    })

    app.get("/template", cors(), (req, res) => {
        let name = req.query.name
        Template
            .findOne({name: name})
            .then(result => {
                res.send(result)
            })
            .catch(error => console.log(error))
    })

    app.get("/anyTemplate", cors(), (req, res) => {
        Template
            .find({private: false})
            .then(result => {
                let numberOfDocuments = result.length
                let randomIndex = Math.floor(Math.random() * numberOfDocuments)
                res.send(result[randomIndex])
            })
            .catch(error => console.log(error))
    })

    app.post("/addTemplateFile", cors(), upload.single("image"), (req, res) => {
        let template = new Template({
            author: req.body.author,
            name: req.body.name,
            date: new Date().toISOString(),
            image: req.file.buffer,
            private: req.body.private
        })

        template
            .save()
            .then(result => res.send(result))
            .catch(err => console.error(err))
    })

    app.post("/addTemplate", cors(), (req, res) => {
        let template = new Template({
            author: req.body.author,
            name: req.body.name,
            date: new Date().toISOString(),
            image: req.body.image,
            private: req.body.private
        })

        template
            .save()
            .then(result => res.send(result))
            .catch(err => console.error(err))
    })

}