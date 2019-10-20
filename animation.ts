let numPixels = 19

const FRAMES = 8 // how often to advance clock
const MIDNIGHT = 8 // every how many 'clock ticks' to blink


let strip = neopixel.create(DigitalPin.P0, numPixels, NeoPixelMode.RGB)
let fireflyClocks: number[] = []

let pixelAnimations: { frames: number, color: number }[][] = []

let frameNo = 0
while (true) {
    if (frameNo > 1000) {
        if (frameNo > 1024) {
            frameNo = 0
        }

        animRandom()
    } else {
        animFireflies()
    }

    stepAnimation()

    frameNo++
    basic.pause(40)
}
function stepAnimation() {
    for (let i = 0; i < numPixels; i++) {
        if (pixelAnimations[i] && pixelAnimations[i].length != 0) {
            let currAnim = pixelAnimations[i][0]

            strip.setPixelColor(i, currAnim.color)
            currAnim.frames--

            if (currAnim.frames <= 0) {
                pixelAnimations[i].shift() // remove first from array
            }
        }

    }

    strip.show()
}

function animRandom() {
    // if (frameNo % 8 != 0) return

    let i = Math.floor(Math.random() * numPixels)

    pixelAnimations[i] = [
        {
            color: neopixel.rgb(Math.floor(Math.random() * 60), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60)),
            frames: 8
        },

        {
            color: neopixel.rgb(Math.floor(Math.random() * 60), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60)),
            frames: 8
        }
    ]
}

function animFireflies() {
    if (frameNo % 1000 != 0) {
        for (let i = 0; i < numPixels; i++) { // each pixel runs his independant clock
            fireflyClocks[i] = Math.floor(Math.random() * MIDNIGHT)
        }
    }

    if (frameNo % FRAMES != 0) return  // every Nth frame, advance clock

    for (let i = 0; i < numPixels; i++) {
        fireflyClocks[i]++

        if (fireflyClocks[i] >= MIDNIGHT) {
            pixelAnimations[i] = [
                {
                    color: neopixel.rgb(50, 50, 0),
                    frames: 3
                },
                {
                    color: neopixel.rgb(120, 120, 0),
                    frames: 3
                },
                {
                    color: neopixel.rgb(235, 235, 0),
                    frames: 8
                },
                {
                    color: neopixel.rgb(180, 180, 0),
                    frames: 3
                },
                {
                    color: neopixel.rgb(50, 50, 0),
                    frames: 3
                },
                {
                    color: neopixel.rgb(0, 0, 0),
                    frames: 0
                }
            ]

            let inSync = true
            for (let j = 0; j < numPixels; j++) { // each pixel runs his independant clock
                fireflyClocks[j]++
                if (inSync && fireflyClocks[j] < MIDNIGHT) {
                    inSync = false
                }
            }

            if (inSync && frameNo < 9000) {
                frameNo = 9000
            }

            fireflyClocks[i] = 0
        }
    }
}

