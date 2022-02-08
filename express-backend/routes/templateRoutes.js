const fs = require('fs')
const Template = require("../schemas/templateSchema")
const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const {createCanvas, loadImage} = require("canvas")


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
            .then(result => res.send(result))
            .catch(err => console.error(err))
    })

    const drawCanvas = async (canvasData) => {
        const canvas = createCanvas(canvasData.canvasWidth, canvasData.canvasHeight)
        const context = canvas.getContext('2d')
        context.fillStyle = "black"
        context.fillRect(0, 0, canvasData.canvasWidth, canvasData.canvasHeight)
        for (let i = 0; i < canvasData.templates.length; i++) {
            loadImage(canvasData.templates[i].url)
                .then(image => {
                    context.drawImage(image, canvasData.templates[i].x, canvasData.templates[i].y, canvasData.templates[i].width, canvasData.templates[i].height)
                    if (i === canvasData.templates.length - 1) {
                        context.font = `${canvasData.size}px Comic Sans MS`
                        context.fillStyle = canvasData.color
                        context.textAlign = "center"
                        for (let j = 0; j < canvasData.texts.length; j++) {
                            context.fillText(canvasData.texts[j].text, canvasData.texts[j].x, canvasData.texts[j].y)
                        }
                        const buffer = canvas.toBuffer('image/png')
                        fs.writeFileSync(__dirname + "/meme.png", buffer)
                    }
                })
        }
    }

    app.post("/download", cors(), async (req, res) => {
        await drawCanvas(req.body)
        res.sendFile(__dirname + "/meme.png")
    })
}