let numPixels = 64
let strip = neopixel.create(DigitalPin.P0, numPixels, NeoPixelMode.RGB)

let frameNo = 0

const FIREFLY_FRAMES = 8 // how often to advance clock
const FIREFLY_STEP = 10 // how often to advance clock
const FIREFLY_MIDNIGHT = 80 // every how many 'clock ticks' to blink
let firefly_timer: number[] = []
let fireflyAnimations: number[] = []



fireflyAnimations[0] = neopixel.rgb(50, 50, 0)
fireflyAnimations[1] = neopixel.rgb(80, 80, 0)
fireflyAnimations[3] = neopixel.rgb(120, 120, 0)
fireflyAnimations[4] = neopixel.rgb(150, 150, 0)
fireflyAnimations[6] = neopixel.rgb(250, 250, 0)
fireflyAnimations[8] = neopixel.rgb(150, 150, 0)
fireflyAnimations[9] = neopixel.rgb(80, 80, 0)
fireflyAnimations[10] = neopixel.rgb(0, 0, 0)



for (let i = 0; i < numPixels; i++) { // each pixel runs his independent clock
    firefly_timer[i] = Math.floor(Math.random() * FIREFLY_MIDNIGHT)
}


while (true) {
    animFireflies()


    frameNo++
    strip.show()
    basic.pause(40)
}


function animFireflies() {
    if (frameNo % FIREFLY_FRAMES != 0) return  // every Nth frame, advance clock

    for (let i = 0; i < numPixels; i++) {

        firefly_timer[i] += FIREFLY_STEP

        if (ffclock >= FIREFLY_MIDNIGHT) { // strike!
            // if (i >= 2 && firefly_timer[i - 2] > 0) firefly_timer[i - 2]++
            // if (i >= 1 && firefly_timer[i - 1] > 0) firefly_timer[i - 1]++
            // if (i < numPixels + 2 && firefly_timer[i + 1] > 0) firefly_timer[i + 1]++
            // if (i < numPixels + 3 && firefly_timer[i + 2] > 0) firefly_timer[i + 2]++
            // if (i < numPixels + 4 && firefly_timer[i + 3] > 0) firefly_timer[i + 3]++


            // if (i >= 1 && firefly_timer[i - 1] > 0) firefly_timer[i - 1]++
            // if (i < numPixels + 2 && firefly_timer[i + 1] > 0) firefly_timer[i + 1]++


            // let start = -1
            // let end = 32
            // if (numPixels / 2 < i) {
            //     start = 33
            //     end = 63
            // }
            // for (; start < end; start++) { // each pixel runs his independent clock
            //     if (firefly_timer[start] > 0) firefly_timer[start]++
            // }

            for (let j = 0; j < numPixels; j++) { // each pixel runs his independent clock
                if (firefly_timer[j] > 0 && i != j) firefly_timer[j]++
                // if (firefly_timer[j] >= FIREFLY_MIDNIGHT) {
                    // strip.setPixelColor(j, neopixel.rgb(120, 120, 0))
                    // firefly_timer[j] = FIREFLY_MIDNIGHT - 1
                // }
            }

            firefly_timer[i] = -1
        }

        if (firefly_timer[i] < 0) { // negative values store internal animation state
            let c = -firefly_timer[i]
            if (c <= fireflyAnimations.length) {
                let color = fireflyAnimations[c - 1]
                if (color !== undefined) strip.setPixelColor(i, color)

                firefly_timer[i] -= (FIREFLY_STEP + 1) // walk backwards by 1
            } else {
                firefly_timer[i] = 0
            }
        }
    }
}

