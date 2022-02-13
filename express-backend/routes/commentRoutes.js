const cors = require("cors");
const Comment = require("../schemas/commentSchema");


module.exports = app => {

    /**
     * adds a comment to the database
     */
    app.post("/addComment", cors(), (req, res) => {
        let comment = new Comment({
            meme: req.body.meme,
            author: req.body.author,
            content: req.body.content,
            date: new Date().toISOString()
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
     * fetches all comments from the database
     */
    app.get("/allCommentsFromAll", cors(), (req, res) => {
        Comment.find().then(comments => {
            res.send(comments)
        }, err => console.error(err))
    })

    /**
     * deletes a Comment from the database
     * URL-parameter comment: the id of the comment to be deleted
     */
    app.delete("/deleteComment", cors(), (req, res) => {
        Comment
            .findOne({content: req.query.comment, meme: req.query.meme, author: req.query.author})
            .deleteOne()
            .then(result => {
                res.send(result)
            })
            .catch(err => console.log(err))
    })
}
