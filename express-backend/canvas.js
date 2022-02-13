const {createCanvas, loadImage} = require("canvas");
const fs = require("fs");
const Meme = require("./schemas/memeSchema");
const {v4} = require("uuid")


/**
 * helper function that recreates a canvas with help of the incoming payload
 */
const drawCanvas = async (canvasData) => {
    const canvas = createCanvas(canvasData.canvasWidth, canvasData.canvasHeight)
    const context = canvas.getContext('2d')
    context.fillStyle = "black"
    context.fillRect(0, 0, canvasData.canvasWidth, canvasData.canvasHeight)
    for (let i = 0; i < canvasData.templates.length; i++) {
        loadImage(canvasData.templates[i].url)
            .then(image => {
                context.drawImage(image, canvasData.templates[i].x, canvasData.templates[i].y, canvasData.templates[i].width, canvasData.templates[i].height)
                if (i === canvasData.templates.length - 1) {
                    context.font = `${canvasData.size}px Impact`
                    context.shadowColor = "#000"
                    context.shadowOffsetX = 2
                    context.shadowOffsetY = 2
                    context.fillStyle = canvasData.color
                    context.textAlign = "center"
                    for (let j = 0; j < canvasData.texts.length; j++) {
                        context.fillText(canvasData.texts[j].text, canvasData.texts[j].x, canvasData.texts[j].y)
                    }
                    const buffer = canvas.toBuffer('image/png')
                    fs.writeFileSync(__dirname + "/public/uploads/meme.png", buffer)
                }
            })
    }
}

const drawApiMeme = async data => {
    const listOfMemes = []
    for (let i = 0; i < data.texts.length; i++) {
        const canvas = createCanvas(400, 400)
        const context = canvas.getContext('2d')
        context.fillStyle = "black"
        context.fillRect(0, 0, 400, 400)
        await loadImage(data.template)
            .then(async image => {
                context.drawImage(image, 50, 50, 300, 300)
                context.font = `${data.texts[i].size || 22}px Impact`
                context.shadowColor = "#000"
                context.shadowOffsetX = 2
                context.shadowOffsetY = 2
                context.fillStyle = data.texts[i].color || "white"
                context.textAlign = "center"
                for (let j = 0; j < data.texts[i].captions.length; j++) {
                    context.fillText(data.texts[i].captions[j].text, data.texts[i].captions[j].x || 200, data.texts[i].captions[j].y || 40 + j*100)
                }
                const memeData = canvas.toDataURL('image/png')
                await new Meme({url: memeData, author: "api", name: v4().slice(0,8)})
                    .save()
                    .then((result => listOfMemes.push(`http://localhost:3000/view/${result._id}`)))
                    .catch(err => console.log(err))
            })
    }
    return {data: listOfMemes}
}

module.exports = {drawCanvas, drawApiMeme}