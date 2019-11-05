let numPixels = 64
let strip = neopixel.create(DigitalPin.P0, numPixels, NeoPixelMode.RGB)

let frameNo = 0

const FIREFLY_FRAMES = 8 // how often to advance clock
const FIREFLY_STEP = 1 // how often to advance clock
let FIREFLY_MIDNIGHT = 69 // every how many 'clock ticks' to blink
if (FIREFLY_MIDNIGHT == numPixels) FIREFLY_MIDNIGHT += 5

let firefly_timer: number[] = []
let firefly_animation_state: number[] = []

let firefly_flash_sequence: number[] = []
const LAST_SEQUENCE_FRAME = 23 // change it at will, it's just used in multiple places

firefly_flash_sequence[0] = neopixel.rgb(5, 5, 5)
firefly_flash_sequence[1] = neopixel.rgb(5, 5, 5)
firefly_flash_sequence[2] = neopixel.rgb(5, 5, 5)
firefly_flash_sequence[3] = neopixel.rgb(5, 5, 5)
firefly_flash_sequence[4] = neopixel.rgb(10, 15, 5)
firefly_flash_sequence[5] = neopixel.rgb(15, 25, 5)
firefly_flash_sequence[6] = neopixel.rgb(20, 60, 5)
firefly_flash_sequence[7] = neopixel.rgb(30, 80, 5)
firefly_flash_sequence[8] = neopixel.rgb(50, 90, 0)
firefly_flash_sequence[9] = neopixel.rgb(60, 110, 0)
firefly_flash_sequence[11] = neopixel.rgb(110, 150, 0)
firefly_flash_sequence[13] = neopixel.rgb(80, 80, 0)
firefly_flash_sequence[14] = neopixel.rgb(50, 50, 0)
firefly_flash_sequence[16] = neopixel.rgb(20, 20, 0)
firefly_flash_sequence[17] = neopixel.rgb(5, 5, 5)
firefly_flash_sequence[LAST_SEQUENCE_FRAME] = 0


for (let i = 0; i < numPixels; i++) { // each pixel runs his independent clock
    firefly_timer[i] = Math.floor(Math.random() * FIREFLY_MIDNIGHT)
    firefly_animation_state[i] = 0
}


while (true) {
    animFireflies()


    frameNo++
    strip.show()
    basic.pause(40)
}


function animFireflies() {
    let advance_clock_now = frameNo % FIREFLY_FRAMES === 0

    for (let i = 0; i < numPixels; i++) {

        if (firefly_animation_state[i] > 0) {
            if (firefly_animation_state[i] <= LAST_SEQUENCE_FRAME) {
                let color = firefly_flash_sequence[firefly_animation_state[i]]
                if (color !== undefined) strip.setPixelColor(i, color)

                firefly_animation_state[i]++
            } else {
                firefly_animation_state[i] = 0
            }
        }

        if (!advance_clock_now) continue  // every Nth frame, advance clock

        firefly_timer[i] += FIREFLY_STEP

        if (firefly_timer[i] >= FIREFLY_MIDNIGHT) { // strike!
            if (i >= 2) firefly_timer[i - 2]++
            if (i >= 1) firefly_timer[i - 1]++
            if (i < numPixels + 2) firefly_timer[i + 1]++
            if (i < numPixels + 3) firefly_timer[i + 2]++
            if (i < numPixels + 4) firefly_timer[i + 3]++


            // for (let j = 0; j < numPixels; j++) { // each pixel runs his independent clock
            //     firefly_timer[j]++
            // }

            firefly_timer[i] = 0
            firefly_animation_state[i] = Math.floor(Math.random() * 5)
        }
    }
}

