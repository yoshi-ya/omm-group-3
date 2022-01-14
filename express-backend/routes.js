const cors = require("cors");
const Comment = require("./schemas/commentSchema");
const Meme = require("./schemas/memeSchema");

module.exports = app => {

    /**
     * adds a Meme to the database
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
     * adds a comment to the database
     */
    app.post("/addComment", cors(), (req, res) => {
        let comment = new Comment({
            meme: req.body.meme,
            author: req.body.author,
            content: req.body.content,
            date: req.body.date
        })
        comment.save()
            .then(() => res.send("Saved comment!"))
            .catch(err => console.error(err))
    })

    /**
     * fetches all comments for a meme from the database
     * URL-parameter meme: the ID of the Meme associated with the comment
     */
    app.get("/allComments", cors(), (req, res) => {
        Comment.find({meme: req.query.meme}).then(comments => {
            res.send(comments)
        }, err => console.error(err))
    })

    /**
     * fetches Memes from the database
     * optional URL-parameter author: the respective author of the memes to fetch
     * provide an author to get user-specific memes,
     * otherwise retrieve all memes from the database
     */
    app.get("/allMemes", cors(), (req, res) => {
        let dbFilter = req.query.author ? {author: req.query.author} : {}
        Meme
            .find(dbFilter)
            .then(memes => {
                res.send(memes)
            }, err => console.error(err))
    })
}
