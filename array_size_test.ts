let numPixels = 256

let pixelAnimations: number[][][] = []
let pixelColors: number[][] = []

for (let i = 0; i < numPixels; i++) {
    basic.showNumber(i)

    pixelColors[i] = [ // it now goes to ~110+
        /*colorNowR:*/ 0,
        /*colorNowG:*/ 0,
        /*colorNowB:*/ 0,

        /*colorToR:*/ 235,
        /*colorToR:*/ 235,
        /*colorToR:*/ 0,

        /*framesFor transition:*/ 0,
    ]
    /*
        pixelAnimations[i] = [
            [6,7],
            [6,7],
            [6,7],
            [6,7],
            [6,7],
            [6,7],
            [6,7],
        ]
    */


    /**
     // real code
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

     */

}
