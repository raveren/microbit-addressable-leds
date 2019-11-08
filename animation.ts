/***
 *  Global configuration
 * */
let numPixels = 64

/***
 *  Firefly variables
 * */

let strip = neopixel.create(DigitalPin.P0, numPixels, NeoPixelMode.RGB)
let frameNo = 0

const FIREFLY_FRAMES = 4 // how often to advance clock
const FIREFLY_MIDNIGHT = numPixels + 5 // every how many 'clock ticks' to blink
const FIREFLY_STEP = Math.floor(FIREFLY_MIDNIGHT / 10)

let firefly_timer: number[] = []
let firefly_animation_state: number[] = []

let firefly_flash_sequence: number[] = []
const LAST_SEQUENCE_FRAME = 23 // change it at will, it's just used in multiple places

firefly_flash_sequence[0] = 0
firefly_flash_sequence[1] = 0
firefly_flash_sequence[2] = 0
firefly_flash_sequence[3] = 0
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

const COOL_COLORS = [
    neopixel.rgb(255, 0, 0),
    neopixel.rgb(0, 255, 0),
    neopixel.rgb(0, 255, 0),
    neopixel.rgb(0, 0, 255),

    neopixel.rgb(120, 0, 0),
    neopixel.rgb(0, 120, 0),
    neopixel.rgb(0, 120, 0),
    neopixel.rgb(0, 0, 120),
    //
    neopixel.rgb(120, 0, 120),
    neopixel.rgb(120, 120, 0),
    neopixel.rgb(0, 120, 120),

    // neopixel.rgb(60, 0, 120),
    // neopixel.rgb(60, 120, 0),
    // neopixel.rgb(0, 60, 120),

    neopixel.rgb(120, 0, 60),
    neopixel.rgb(120, 60, 0),
    neopixel.rgb(0, 120, 60),

    neopixel.rgb(12, 12, 12),
    neopixel.rgb(120, 120, 120),
    neopixel.rgb(255, 255, 255),

    0,
    0,
    0,
    0
]

/***
 *  Random anim variables
 * */

let RANDOM_FRAMES = 8


/***
 *  Code
 * */

for (let i = 0; i < numPixels; i++) { // each pixel runs his independent clock
    firefly_timer[i] = Math.floor(Math.random() * FIREFLY_MIDNIGHT)
    firefly_animation_state[i] = 0
}


while (true) {
    randomAnimation()
    strip.show()


    frameNo++
    basic.pause(40)
}


function randomAnimation() {
    if (frameNo % RANDOM_FRAMES !== 0) return

    for (let i = 0; i < numPixels; i++) {
        if (Math.random() > .7) {
            strip.setPixelColor(i, COOL_COLORS[Math.floor(Math.random() * COOL_COLORS.length)])
        }
    }

    if (Math.random() > .9) {
        RANDOM_FRAMES++
        if (RANDOM_FRAMES > 20) {
            RANDOM_FRAMES = 1
        }
    }
}


let artificial_timeout = 0

function fireflyAnimation() {
    let advance_clock_now = frameNo % FIREFLY_FRAMES == 0
    if (advance_clock_now && artificial_timeout > 0) {
        advance_clock_now = false
        artificial_timeout--
    }

    let all_lights_in_sync = true // todo

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

        firefly_timer[i]++

        if (firefly_timer[i] >= FIREFLY_MIDNIGHT) { // strike!
            if (Math.random() > .99) {
                artificial_timeout = Math.ceil(LAST_SEQUENCE_FRAME / FIREFLY_FRAMES * 2)
            }

            if (i >= 3) firefly_timer[i - 3] += FIREFLY_STEP
            if (i >= 2) firefly_timer[i - 2] += FIREFLY_STEP
            if (i >= 1) firefly_timer[i - 1] += FIREFLY_STEP
            if (i >= 4) firefly_timer[i - 4] += FIREFLY_STEP
            if (i < numPixels + 2) firefly_timer[i + 1] += FIREFLY_STEP
            if (i < numPixels + 3) firefly_timer[i + 2] += FIREFLY_STEP
            if (i < numPixels + 4) firefly_timer[i + 3] += FIREFLY_STEP
            if (i < numPixels + 4) firefly_timer[i + 4] += FIREFLY_STEP


            // for (let j = 0; j < numPixels; j++) { // each pixel runs his independent clock
            //     firefly_timer[j]++
            // }

            firefly_timer[i] = 0
            firefly_animation_state[i] = Math.floor(Math.random() * 5)
        } else {
            all_lights_in_sync = false
        }
    }
}

