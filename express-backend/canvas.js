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

module.exports = drawCanvas