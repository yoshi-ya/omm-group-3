const Meme = require("../schemas/memeSchema");
const fs = require("fs");
const cors = require("cors");
const {createCanvas, loadImage} = require("canvas");
const path = require("path")


module.exports = app => {

    /**
     * saves a Meme to the database
     */
    app.post("/saveMeme", cors(), (req, res) => {

        let meme = new Meme({
            author: req.body.author,
            name: req.body.name,
            date: new Date().toISOString(),
            templates: req.body.templates,
            texts: req.body.texts,
            votes: req.body.votes,
            private: req.body.private,
            color: req.body.color,
            size: req.body.size,
            canvasWidth: req.body.canvasWidth,
            canvasHeight: req.body.canvasHeight
        })

        meme
            .save()
            .then(() => res.send("Saved meme!"))
            .catch(err => console.error(err))
    })

    /**
     * fetches a single meme from the database
     * URL-parameter meme: the id of the meme to fetch
     */
    app.get("/fetchMeme", cors(), (req, res) => {
        Meme
            .findOne({_id: req.query.id})
            .then(result => {
                res.send(result)
            })
            .catch(() => console.log(`ERROR in /fetchMeme: could not find meme with ID ${req.query.id}`))
    })

    /**
     * updates the list of people who liked a meme in the database
     * the body should contain a meme-ID and a list of emails
     */
    app.post("/addLike", cors(), (req, res) => {
        Meme
            .findOneAndUpdate({_id: req.body.id}, {votes: req.body.votes}, {new: true})
            .then(result => res.send(result))
            .catch(() => console.log(`ERROR in /addLike: could not find meme with ID ${req.body.id}`))
    })

    /**
     * fetches Memes from the database
     * optional URL-parameter author: the respective author of the memes to fetch
     * provide an author to get user-specific memes,
     * otherwise retrieve all memes from the database, that are not created via API call
     */
    app.get("/allMemes", cors(), (req, res) => {
        let dbFilter = req.query.author ? {author: req.query.author} : {author: {$not: /^api$/}}
        Meme
            .find(dbFilter)
            .then(memes => {
                res.send(memes)
            }, err => console.error(err))
    })

    /**
     * deletes a Meme from the database
     * URL-parameter meme: the id of the meme to be deleted
     */
    app.delete("/deleteMeme", cors(), (req, res) => {
        Meme
            .findOne({_id: req.query.meme})
            .deleteOne()
            .then(result => {
                res.send(result)
            })
            .catch(err => console.log(err))
    })

    /**
     * helper function that recreates a canvas with help of the incoming payload
     */
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
                        fs.writeFileSync(path.dirname(__dirname) + "/public/uploads/meme.png", buffer)
                    }
                })
        }
    }

    app.post("/download", cors(), async (req, res) => {
        await drawCanvas(req.body)
        res.sendFile((path.dirname(__dirname)+ "/public/uploads/meme.png"))
    })
}

