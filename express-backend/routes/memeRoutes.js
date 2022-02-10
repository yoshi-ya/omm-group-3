const Meme = require("../schemas/memeSchema");
const drawCanvas = require("../canvas")
const cors = require("cors");
const path = require("path")


module.exports = app => {

    /**
     * saves a Meme to the database if the meme does not exist, otherwise updates it
     */
    app.post("/saveMeme", cors(), (req, res) => {
        let dbFilter = {
            author: req.body.author, name: req.body.name
        }

        let meme = {
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
        }

        Meme
            .findOneAndUpdate(dbFilter, meme, {new: true})
            .then(updatedMeme => {
                if (updatedMeme) res.send(updatedMeme)
                else {
                    new Meme(meme).save().then(newMeme => res.send(newMeme))
                }
            })
            .catch(err => console.log(err))
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
        if (req.query.private) dbFilter.private = req.query.private
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
            .findOneAndDelete({_id: req.body.meme})
            .then(result => {
                if (result) {
                    res.send(result)
                }
            })
            .catch(err => console.log(err))
    })

    app.post("/download", cors(), async (req, res) => {
        await drawCanvas(req.body)
        res.sendFile(path.dirname(__dirname) + "/public/uploads/meme.png")
    })
}

