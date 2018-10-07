/**
 * OPEN TICKETS
 * - red and black colors
 * - prevent visible shifts when genenrate muiltiple lines
 */

function setup() {
    const wide = 640;
    const high = 480;
    
    createCanvas(wide, high);

    // generate point for empty space
    const e1 = random(wide); // x
    const e2 = random(high); // y

    const limit = 8; // specifies number of lines produced
    let index = 0;

    while (index < limit) {

        const angle = random(180) + 1;
        const height = sin(angle);
        const width = sin(90-angle);
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

        const thresh = 150;

        // if the coordinates of both points are not within a given distance
        // of the empty space coordinates
        if ((abs(e1-x1) < thresh) && ((abs(e2-y1) < thresh))) { // 50 is arbitrary
            console.log('origin point too close to empty space');
        } else if (abs(e2-sameX) < thresh) {

        } else if (abs(e1-sameY) < thresh) {

        } else {

            const stWt = random(16);
            strokeWeight(stWt);
            line(x1,y1,x2,y2);
            line(x1,y1,x3,y3);
            strokeWeight(random(6));
            ellipse(e1, e2, 100, 100);

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
            }
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

function draw() {

}