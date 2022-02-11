const cors = require("cors");
const Meme = require("../schemas/memeSchema");
const {drawApiMeme} = require("../canvas");


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
