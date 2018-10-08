/**
 Authors:
   Sam Parsons
   Andrew Covert - Oct 8, 2018

 * OPEN TICKETS
 * - prevent visible shifts when genenrate muiltiple lines
 * - write two random words of latin in the empty space with one of the colors used for lines
 */

function getTanFromDegrees(degrees) {
    return Math.tan(degrees * Math.PI/180);
}

function setup() {
    const wide = 1920;
    const high = 1080;
    const multiplier = ((high+wide)/2);
    const anglePlay = 5; //+ or - 2.5 degrees from 0 degrees
    const angleOffset = random(45); //change everything +0 to 45 degrees
    
    //Random variables
    let rgbone = floor(random(256));
    let rgbtwo = floor(random(256));
    let rgbthree = floor(random(256));
    let rgbonetwo = floor(random(256));
    let rgbtwotwo = floor(random(256));
    let rgbthreetwo = floor(random(256));
    
    createCanvas(wide, high);
    background(0); 
    fill(0);
    // generate point for empty space
    const e1 = random(wide*(1/4),wide*(3/4)); // x
    const e2 = random(high*(1/4),high*(3/4)); // y

    const limit = 8; // specifies number of lines produced
    let index = 0;

    while (index < limit) {
        //vertical or horizontal with set degrees play
        let angle = random(anglePlay/2) + angleOffset;
        let width = 100; //set to anything
        let height = width * getTanFromDegrees(angle);
        //50% chance flip across x-axis      
        if (random()<0.5) {
        height = -1*height;
        //console.log("height inverted: " + height);
        }
        
        //move up 90 degrees, left or right of y-axis
        if (random()<0.5) {
        let temp = height;
        height = width;
        //console.log("height = "+height);
        if (random()<0.5) {
            width = temp;
            //console.log("width1 = "+height);
        }
        else {
            width = temp * -1;
            //console.log("width2 = "+height);
        }
        }
        const slope = height / width;
        let x1 = random(wide);
        let y1 = random(high);

        const offset = y1 - (slope * x1);

        // coordinates at right end of plane
        let x2 = wide;
        let y2 = (slope * x2) + offset;

        // coordinates at the left of plane
        let x3 = 0;
        let y3 = (slope * x3) + offset;

        // computations to see if lines and spaces interconnect
        const sameX = (slope*e1) + offset;
        const sameY = (e2 - offset) / slope;

        const thresh = (multiplier*.25);
        
        // if the coordinates of both points are not within a given distance
        // of the empty space coordinates
        if ((abs(e1-x1) < thresh) && ((abs(e2-y1) < thresh))) {
            console.log('origin point too close to empty space');
        } else if (abs(e2-sameX) < thresh) {

        } else if (abs(e1-sameY) < thresh) {

        } else {

            let stWt = random(multiplier*.025);
            if (stWt<10) {
                stWt = 10;
            }
            strokeWeight(stWt);
            
            if(random()<0.5){
            stroke(rgbone,rgbtwo,rgbthree);
            }
            else{
            stroke(rgbonetwo,rgbtwotwo,rgbthreetwo);
            }
            
            line(x1,y1,x2,y2);
            line(x1,y1,x3,y3);
            strokeWeight(random(6));
            // ellipse(e1, e2, 100, 100);

            // generate multiple lines 20% of the time
            const temp = floor(random(10));
            if (temp == 0) {
                x1 += 30;
                y1 += 30;
                x2 += 30;
                y2 += 30;
                x3 += 30;
                y3 += 30;
                strokeWeight(stWt/2);
                line(x1,y1,x2,y2);
                line(x1,y1,x3,y3);
                index++;
                x1 += 30;
                y1 += 30;
                x2 += 30;
                y2 += 30;
                x3 += 30;
                y3 += 30;
                strokeWeight(stWt/3);
                line(x1,y1,x2,y2);
                line(x1,y1,x3,y3);
                index++;
            } else if (temp == 1) {
                x1 += 30;
                y1 += 30;
                x2 += 30;
                y2 += 30;
                x3 += 30;
                y3 += 30;
                strokeWeight(stWt/2);
                line(x1,y1,x2,y2);
                line(x1,y1,x3,y3);
                index++;
            }
        }
    }
}

function draw() {

}