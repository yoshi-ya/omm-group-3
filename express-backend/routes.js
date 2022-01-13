const cors = require("cors");
const Comment = require("./schemas/commentSchema");
const Meme = require("./schemas/memeSchema");

module.exports = app => {

    /**
     * adds a Meme
     */
    app.post("/addMeme", cors(), (req, res) => {
        let meme = new Meme({
            author: req.body.author,
            date: req.body.date,
            name: req.body.name,
            template: req.body.template,
            text1: req.body.text1,
            text2: req.body.text2,
            text3: req.body.text3,
            votes: req.body.votes,
            private: req.body.private
        })
        meme.save()
            .then(() => res.send("Saved meme!"))
            .catch(err => console.error(err))
    })

    /**
     * adds a comment
     */
    app.post("/addComment", cors(), (req, res) => {
        let comment = new Comment({
            meme: req.body.meme,
            author: req.body.author,
            content: req.body.content,
            date: req.body.date
        })
        comment.save()
            .then(() => res.send("Saved meme!"))
            .catch(err => console.error(err))
    })

    /**
     * fetches all comments for a meme
     * URL-parameter: meme
     */
    app.get("/allComments", cors(), (req, res) => {
        Comment.find({meme: req.query.meme}).then(comments => {
            res.send(comments)
        }, err => console.error(err))
    })

    /**
     * fetches all Memes
     * call with URL-parameter author to get user-specific memes
     * call without URL-parameter to get all memes
     */
    app.get("/allMemes", cors(), (req, res) => {
        let dbFilter = req.query.author ? {author: req.query.author} : {}
        Meme.find(dbFilter).then(memes => {
            res.send(memes)
        }, err => console.error(err))
    })
}
