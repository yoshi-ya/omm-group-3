const cors = require("cors");
const Meme = require("../schemas/memeSchema");


module.exports = app => {

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