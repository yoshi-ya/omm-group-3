const {createCanvas, loadImage} = require("canvas");
const fs = require("fs");


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
                    context.font = `${canvasData.size}px Comic Sans MS`
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

const drawApiMeme = async (data) => {
    const listOfMemes = []
    const canvas = createCanvas(400, 400)
    const context = canvas.getContext('2d')
    context.fillStyle = "black"
    context.fillRect(0, 0, 400, 400)
    for (let i = 0; i < data.texts.length; i++) {
        await loadImage(data.template)
            .then(image => {
                context.drawImage(image, 50, 50, 300, 300)
                context.font = `${data.size}px Comic Sans MS`
                context.fillStyle = data.color
                context.textAlign = "center"
                for (let j = 0; j < data.texts[i].length; j++) {
                    context.fillText(data.texts[i][j], 200, 200 + i*150)
                }
                let pathToMeme = `${__dirname}/public/uploads/meme_${i}.png`
                let buffer = canvas.toBuffer('image/png')
                fs.writeFileSync(pathToMeme, buffer)
                listOfMemes.push(`http://localhost:5001/uploads/meme_${i}.png`)
            })
    }
    return {data: listOfMemes}
}

module.exports = {drawCanvas, drawApiMeme}