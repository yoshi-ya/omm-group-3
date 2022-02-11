const Meme = require("../schemas/memeSchema")
const {drawApiMeme} = require("../canvas");
const cors = require("cors");


module.exports = app => {

    /**
     * ISSUE #6: API-Meme Creation
     * given a JSON payload with a list of meme-data, memes are created and stored in the
     * database, and a list of URLs to respective SingleViews is returned
     */
    app.post("/createMeme", cors(), async (req, res) => {
        let data = await drawApiMeme(req.body)
        res.send(data)
    })

    /**
     * ISSUE #7: API-Meme Retrieval
     * given an optional set of constraints, memes are retrieved and a list of URLs to respective
     * SingleViews is returned
     */
    app.get("/retrieveMemes", cors(), (req, res) => {
        let result = []
        let dbFilter = {author: {$not: /^api$/}, private: false}
        if (req.query.name) dbFilter.name = req.query.name
        let sortFilter = req.query.sort && req.query.sort === "oldest" ? {date: 1} : {date: -1}
        Meme
            .find(dbFilter)
            .limit(req.query.limit)
            .sort(sortFilter)
            .then(async memes => {
                if (memes) {
                    await memes.forEach(m => {
                        let resultData = {
                            url: `http://localhost:3000/view/${m._id}`,
                            author: m.author,
                            date: m.date,
                            votes: m.votes.length,
                            texts: m.texts
                        }
                        result.push(resultData)
                    })
                }
                res.send(result)
            }, err => console.error(err))
    })
}
