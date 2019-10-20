let numPixels = 64

let pixelAnimations: number[][][] = []

for (let i = 0; i < numPixels; i++) {
    basic.showNumber(i) // this goes up to 30 before out of memory

    pixelAnimations[i] = [
        [6,7],
        [6,7],
        [6,7],
        [6,7],
        [6,7],
        [6,7],
        [6,7],
    ]

}


