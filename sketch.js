/**
 * OPEN TICKETS
 * - rewrite conditional to check if line intersect empty area
 * - red and black colors
 * - possiblity of generating two or three more replicants
 * 
 */

function setup() {
    const wide = 640;
    const high = 480;
    
    createCanvas(wide, high);

    // generate point for empty space
    const e1 = random(wide);
    const e2 = random(high);
    console.log(e1, e2);

    const limit = 8;
    let index = 0;

    while (index < limit) {

        const rad = 1;
        const angle = random(180) + 1;
        const height = sin(angle);
        const width = sin(90-angle);
        const slope = height / width;

        const x1 = random(wide);
        const y1 = random(high);

        const offset = y1 - (slope * x1);

        const x2 = wide;
        const y2 = (slope * x2) + offset;

        const x3 = 0;
        const y3 = (slope * x3) + offset;

        // if the coordinates of both points are not within a given distance
        // of the empty space coordinate
        if ((abs(e1-x1) < 150) && ((abs(e2-y1) < 150))) { // 50 is arbitrary
            console.log('origin point too close to empty space');
        } else {
            strokeWeight(random(16));
            line(x1,y1,x2,y2);
            line(x1,y1,x3,y3);
            strokeWeight(random(6));
            ellipse(e1, e2, 100, 100);
            index++;    
        }
    }
}

function draw() {

}