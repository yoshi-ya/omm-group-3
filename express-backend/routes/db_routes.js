const cors = require("cors");
const Comment = require("../schemas/commentSchema");
const Meme = require("../schemas/memeSchema");

module.exports = app => {

    /**
     * adds a Meme to the database
     */
    app.post("/addMeme", cors(), (req, res) => {
        let meme = new Meme({
            author: req.body.author,
            date: new Date().toISOString(),
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
     * deletes a Comment from the database
     * URL-parameter comment: the id of the comment to be deleted
     */
    app.delete("/deleteComment", cors(), (req, res) => {
        Comment
            .findOne({comment: req.query.comment})
            .deleteOne()
            .then(result => {
                res.send(result)
            })
            .catch(err => console.log(err))
    })

    /**
     * ISSUE #6: API-Meme Creation
     * given a JSON payload with a list of meme-data, memes are created and stored in the
     * database, and a list of URLs to respective SingleViews is returned
     */
    app.post("/createMeme", cors(), async (req, res) => {
        let listOfURLs = []
        for (let memeData of req.body.data) {
            let meme = new Meme({
                author: "api",
                date: new Date().toISOString(),
                template: memeData.template,
                text1: memeData.text1,
                text2: memeData.text2,
                text3: memeData.text3,
                text4: memeData.text4,
                color: memeData.color,
                size: memeData.size,
                transparency: memeData.transparency,
                font: memeData.font
            })

            await meme
                .save()
                .catch(err => console.error(err))

            // replace path to singleView
            listOfURLs.push(`${req.protocol}://${req.get('host')}${req.originalUrl}/singleView/${meme._id}`)
        }

        res.send({data: listOfURLs})
    })

    /**
     * ISSUE #7: API-Meme Retrieval
     * given an optional set of constraints, memes are retrieved and a list of URLs to respective
     * SingleViews is returned
     * */
    app.get("/retrieveMemes", cors(), (req, res) => {
        let result = []
        const possibleFilter = ["author", "date", "template", "text1", "text2", "text3", "text4"]
        let dbFilter = {}
        let sortFilter = req.query.sort && req.query.sort === "oldest" ? {date: -1} : {date: 1}
        for (let filter of possibleFilter) {
            if (req.query[filter]) dbFilter[filter] = req.query[filter]
        }
        Meme
            .find(dbFilter)
            .limit(req.query.limit)
            .sort(sortFilter)
            .then(async memes => {
                await memes.forEach(m => {
                    let resultData = {
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}/singleView/${m._id}`,
                        author: m.author,
                        date: m.date,
                        template: m.template
                    }
                    result.push(resultData)
                })
                res.send(result)
            }, err => console.error(err))
    })
}
