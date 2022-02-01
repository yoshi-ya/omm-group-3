const cors = require("cors");
const Template = require("../schemas/templateSchema")


module.exports = app => {
    app.get("/allTemplates", cors(), (req, res) => {
        Template
            .find({})
            .then(result => {
                res.send(result)
            })
            .catch(error => console.log(error))
    })
}