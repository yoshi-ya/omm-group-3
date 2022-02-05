const Meme = require("../schemas/memeSchema");
const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({storage: storage})


module.exports = app => {

    /**
     * adds a Meme to the database
     */
    app.post("/addMeme", cors(), upload.single("image"), (req, res) => {

        let meme = new Meme({
            author: req.body.author,
            name: req.body.name,
            date: new Date().toISOString(),
            template: req.file.buffer,
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
}

