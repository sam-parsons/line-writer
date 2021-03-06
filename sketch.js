/**
 Authors:
   Sam Parsons
   Andrew Covert 10/8/18 - 10/13/18
 * OPEN TICKETS
 * - prevent visible shifts when generate muiltiple lines
 * - write two random words of latin in the empty space with one of the colors used for lines
 * - create vertical variablity, maybe even try to see if it can be near some lines
 * - move right side empty space barrier back to no more bleeding
 * - get position and dimension information about the text and format accordingly 
 */

function getTanFromDegrees(degrees) {
    return Math.tan(degrees * Math.PI/180);
}

function setup() {
    //Constant Variables:
    const wide = 1920; 
    const high = 1080;
    const multiplier = ((high+wide)/2);
    const anglePlay = 5; //variation in degrees from axes TBD
    const angleOffset = random(5); //offset axes TBD
    const colorVariation = 90;
    const childVariation = 60;
    const limit = 10; // specifies number of parent lines produced
    const perpendicular = true; //true if want perpendicular pattern, false if only horizontal
    let randText = ""; // string to be generated at end of setup
    const url = 'http://www.randomtext.me/api/gibberish/ul-1/2';
    let tempRandText = '';
	const fonts = ['Charmonman', 'Quicksand', 'Indie Flower'];
	
	//Random Variables
	let rgb1 = floor(random(256));
    let rgb2 = floor(random(256));
    let rgb3 = floor(random(256));
    let rgb1c1 = rgb1+floor(random(-1*colorVariation,colorVariation));
    let rgb2c1 = rgb2+floor(random(-1*colorVariation,colorVariation));
    let rgb3c1 = rgb3+floor(random(-1*colorVariation,colorVariation));
    let rgb1c2 = rgb1c1+floor(random(-1*colorVariation,colorVariation));
    let rgb2c2 = rgb2c1+floor(random(-1*colorVariation,colorVariation));
    let rgb3c2 = rgb3c1+floor(random(-1*colorVariation,colorVariation));
    let rgb21 = floor(random(256));
    let rgb22 = floor(random(256));
    let rgb23 = floor(random(256));
    let rgb21c1 = rgb21+floor(random(-1*colorVariation,colorVariation));
    let rgb22c1 = rgb22+floor(random(-1*colorVariation,colorVariation));
    let rgb23c1 = rgb23+floor(random(-1*colorVariation,colorVariation));
    let rgb21c2 = rgb21c1+floor(random(-1*colorVariation,colorVariation));
    let rgb22c2 = rgb22c1+floor(random(-1*colorVariation,colorVariation));
    let rgb23c2 = rgb23c1+floor(random(-1*colorVariation,colorVariation));
	let textrgb1 = 0;
	let textrgb2 = 0;
	let textrgb3 = 0;
	if (random() < 0.5) {
		let textrgb1 = rgb1;
		let textrgb2 = rgb2;
		let textrgb3 = rgb3;
	}
	else {
		let textrgb1 = rgb21;
		let textrgb2 = rgb22;
		let textrgb3 = rgb23;
	}

	//create canvas and background
    createCanvas(wide, high);
    background(0); 

    // generate point for empty space
    const e1 = random(wide*(1/4),wide*(9/16)); // x
    const e2 = random(high*(3/16),high*(3/4)); // y
	
    // get and print random text
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        console.log('this is json ', out);
        tempRandText = out.text_out;
        for (let i = 9; i < tempRandText.length; i++) {
            if (tempRandText[i] == "<") {
                tempRandText = "";
            } else {
                randText += tempRandText[i];
            }
        }
        //randText = randText.toLowerCase();
		randText = randText.toUpperCase();
        console.log(randText);
        // write text in open space
        //set size
		textSize(random(20) + 60);
		//set color 
		stroke(textrgb1,textrgb2,textrgb3);
        //set style
		if (random() < 0.33) {
			textStyle(NORMAL);
		}
		else if (random() < 0.5) {
			textStyle(ITALIC);
		}
		else {
			textStyle(BOLD);
		}
			
		//Set Font
		let fntIndex = floor(random(fonts.length));
        textFont(fonts[fntIndex]);	
        console.log(fonts[fntIndex]);
        //Draw Text
		text(randText, e1-(20*randText.length), e2-100); // x shift due to string length, but y shift is arbitrary
        console.log('string written');
    })
    .catch(err => { throw err });
    
    
    let index = 0;

    while (index < limit) {
        //vertical or horizontal with set degrees play
        let angle = random(anglePlay/2) + angleOffset;
        let width = 100; //set to anything
        let height = width * getTanFromDegrees(angle);
        //50% chance flip across x-axis      
        if (random()<0.5) {
            height = -1 * height;
        }
        
        //move up 90 degrees, left or right of y-axis
        if (perpendicular && random()<0.5) {
            let temp = height;
            height = width;
            if (random()<0.5) {
                width = temp;
            }
            else {
                width = temp * -1;
            }
        }
        const slope = height / width;
        let x1 = random(wide);
        let y1 = random(high);

        const offset = y1 - (slope * x1);

        // coordinates at right end of plane
        let x2 = wide*2;
        let y2 = (slope * x2) + offset;

        // coordinates at the left of plane
        let x3 = -wide;
        let y3 = (slope * x3) + offset;

        // computations to see if lines and spaces interconnect
        const sameX = (slope*e1) + offset;
        const sameY = (e2 - offset) / slope;
        const thresh = (multiplier*.25);
        
        // if the coordinates of both points are not within a given distance
        // of the empty space coordinates
        if ((abs(e1-x1) < thresh) && ((abs(e2-y1) < thresh))) {
            //console.log('origin point too close to empty space');
        }
        else if (abs(e2-sameX) < thresh) {
        }
        else if (abs(e1-sameY) < thresh) {
        }
        else {            
            let colorFlag = random();
            if(colorFlag<0.5){
                stroke(rgb1,rgb2,rgb3);
                fill(rgb1,rgb2,rgb3);
            }
            else{
                stroke(rgb21,rgb22,rgb23);
                fill(rgb21,rgb22,rgb23);
            }
            let strokeTemp = random(multiplier*.003,multiplier*.012);
            if(slope>0) {
                quad(x3-strokeTemp, y3+strokeTemp, x2-strokeTemp, y2+strokeTemp, x2+strokeTemp, y2-strokeTemp, x3+strokeTemp, y3-strokeTemp);
            }
            else {
                quad(x3-strokeTemp, y3-strokeTemp, x2-strokeTemp, y2-strokeTemp, x2+strokeTemp, y2+strokeTemp, x3+strokeTemp, y3+strokeTemp);
            }
            
            //Placeholder for empty space
            //ellipse(e1, e2, multiplier*.18, multiplier*.18);

            // generate multiple lines 20% of the time
            const temp = floor(random(10));
            if (temp == 0) {
                x1 += childVariation;
                y1 += childVariation;
                x2 += childVariation;
                y2 += childVariation;
                x3 += childVariation;
                y3 += childVariation;
                if(colorFlag<0.5){
                    stroke(rgb1c1,rgb2c1,rgb3c1);
                    fill(rgb1c1,rgb2c1,rgb3c1);
                }
                else{
                    stroke(rgb21c1,rgb22c1,rgb23c1);
                    fill(rgb21c1,rgb22c1,rgb23c1);
                }
                strokeTemp = strokeTemp/2;
                if(slope>0) {
                    quad(x3-strokeTemp, y3+strokeTemp, x2-strokeTemp, y2+strokeTemp, x2+strokeTemp, y2-strokeTemp, x3+strokeTemp, y3-strokeTemp);
                }
                else {
                    quad(x3-strokeTemp, y3-strokeTemp, x2-strokeTemp, y2-strokeTemp, x2+strokeTemp, y2+strokeTemp, x3+strokeTemp, y3+strokeTemp);
                }
                //strokeWeight(stWt/2);
                //line(x1,y1,x2,y2);
                //line(x1,y1,x3,y3);
                index++;
                x1 += childVariation;
                y1 += childVariation;
                x2 += childVariation;
                y2 += childVariation;
                x3 += childVariation;
                y3 += childVariation;
                if(colorFlag<0.5){
                    stroke(rgb1c2,rgb2c2,rgb3c2);
                    fill(rgb1c2,rgb2c2,rgb3c2);
                }
                else{
                    stroke(rgb21c2,rgb22c2,rgb23c2);
                    fill(rgb21c2,rgb22c2,rgb23c2);
                }
                strokeTemp = (strokeTemp*2)/3;
                if(slope>0) {
                    quad(x3-strokeTemp, y3+strokeTemp, x2-strokeTemp, y2+strokeTemp, x2+strokeTemp, y2-strokeTemp, x3+strokeTemp, y3-strokeTemp);
                }
                else {
                    quad(x3-strokeTemp, y3-strokeTemp, x2-strokeTemp, y2-strokeTemp, x2+strokeTemp, y2+strokeTemp, x3+strokeTemp, y3+strokeTemp);
                }
            } else if (temp == 1) {
                x1 += childVariation;
                y1 += childVariation;
                x2 += childVariation;
                y2 += childVariation;
                x3 += childVariation;
                y3 += childVariation;
                if(colorFlag<0.5){
                    stroke(rgb1c1,rgb2c1,rgb3c1);
                    fill(rgb1c1,rgb2c1,rgb3c1);
                }
                else{
                    stroke(rgb21c1,rgb22c1,rgb23c1);
                    fill(rgb21c1,rgb22c1,rgb23c1);
                }
                strokeTemp = strokeTemp/2;
                if(slope>0) {
                    quad(x3-strokeTemp, y3+strokeTemp, x2-strokeTemp, y2+strokeTemp, x2+strokeTemp, y2-strokeTemp, x3+strokeTemp, y3-strokeTemp);
                }
                else {
                    quad(x3-strokeTemp, y3-strokeTemp, x2-strokeTemp, y2-strokeTemp, x2+strokeTemp, y2+strokeTemp, x3+strokeTemp, y3+strokeTemp);
                }
                //strokeWeight(stWt/2);
                //line(x1,y1,x2,y2);
                //line(x1,y1,x3,y3);
            }
            index++;
        }
    }

    // method to generate random text


}

function draw() {

}