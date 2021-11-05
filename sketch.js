let flip = 0;   
let scayl = 40;
let cols, rows;
let w = 2500;
let h = 1500;

let flightPos = 0;
let terrain = [];

let Controls = function() {
    this.flightSpeed = 0.08;
    this.noiseDelta = 0.16;
    this.terrainHeight = 202;
    this.color1 = 205;
    this.color2 = 60;
    this.color3 = 120;
    this.color4 = 48;
};
let controls = new Controls();
let texto1;
let texto2;
let texto3;
let texto4;
let texto5;

function setup() {
    var canvas = createCanvas(windowWidth,windowHeight, WEBGL);
    canvas.parent('sketch-holder');
    colorMode(HSB, 400);
    let gui = new dat.GUI({width: 295});
    gui.add(controls, 'flightSpeed', 0, 0.4).name("Sobrevuelo").step(0.02);
    gui.add(controls, 'noiseDelta', 0.05, 0.4).name("Diversidad").step(0.01);
    gui.add(controls, 'terrainHeight', 0, 200).name("Altitud").step(1);
    //gui.add(controls, 'color1', 121, 190).name("Color1").step(1);
    gui.add(controls, 'color1', 0, 400).name("Color1").step(1);
    gui.add(controls, 'color2', 0, 400).name("Color2").step(1);
    gui.add(controls, 'color3', 0, 400).name("Color3").step(1);
    gui.add(controls, 'color4', 0, 400).name("Color4").step(1);
    
    cols = w * 1.3 / scayl;
    rows = h * 1.3 / scayl;
    for (let x = 0; x < cols; ++x) {
      terrain[x] = [];
    }
    noiseDetail(2);

    texto1 = createDiv("SIGraDi");
    texto1.style("width: 200px;");
    texto1.style("height: 300px;");
    texto1.style("font-size", "140px");
    texto1.style('font-family', 'isocpeurregular');
    texto1.style("z-index: 100");
    texto1.style("color: #989898");
    texto1.position((windowWidth-200)/2 -100+3, (windowHeight-300)/2 +3);

    texto1 = createDiv("SIGraDi");
    texto1.style("width: 200px;");
    texto1.style("height: 300px;");
    texto1.style("font-size", "140px");
    texto1.style('font-family', 'isocpeurregular');
    texto1.style("z-index: 100");
    texto1.style("color: #FFF");
    texto1.position((windowWidth-200)/2 -100, (windowHeight-300)/2);

    texto2 = createDiv("APROPiACiONES");
    texto2.style("width: 200px;");
    texto2.style("height: 300px;");
    texto2.style("font-size", "60px");
    texto2.style('font-family', 'isocpeurregular');
    texto2.style("z-index: 100");
    texto2.style("color: #989898");
    texto2.position((windowWidth-200)/2 -100+3, (windowHeight-300)/2+128+3);

    texto2 = createDiv("APROPiACiONES");
    texto2.style("width: 200px;");
    texto2.style("height: 300px;");
    texto2.style("font-size", "60px");
    texto2.style('font-family', 'isocpeurregular');
    texto2.style("z-index: 100");
    texto2.style("color: #FFF");
    texto2.position((windowWidth-200)/2 -100, (windowHeight-300)/2+128);

    texto3 = createDiv("CRíTiCAS");
    texto3.style("width: 200px;");
    texto3.style("height: 300px;");
    texto3.style("font-size", "60px");
    texto3.style('font-family', 'isocpeurregular');
    texto3.style("z-index: 100");
    texto3.style("color: #000");
    texto3.position((windowWidth-200)/2 -100, (windowHeight-300)/2+180);

    texto4 = createDiv("20");
    texto4.style("width: 200px;");
    texto4.style("height: 300px;");
    texto4.style("font-size", "60px");
    texto4.style('font-family', 'isocpeurregular');
    texto4.style("z-index: 100");
    texto4.style("color: #000");
    texto4.position((windowWidth-200)/2 +290, (windowHeight-300)/2+30);

    texto5 = createDiv("22");
    texto5.style("width: 200px;");
    texto5.style("height: 300px;");
    texto5.style("font-size", "60px");
    texto5.style('font-family', 'isocpeurregular');
    texto5.style("z-index: 100");
    texto5.style("color: #000");
    texto5.position((windowWidth-200)/2 +290, (windowHeight-300)/2+75);
}

function draw() {
    
    if (flip == 1) scale(1, -1);
    flightPos -= controls.flightSpeed;
    shiftNoiseSpace();
    background(0,0,400);
    stroke(0,0,400);
    push();
    rotateX(PI / 5);
    translate((-w / 1.6) + 1, (-h ) + 30);
    
    for (let y = 0; y < rows - 1; ++y) {
        //fill(controls.color-y*2, 400, 400);
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; ++x) {
            if(norm(terrain[x][y],-200,200)<0.2){
                fill(controls.color1,400,400);
            }
            else if(norm(terrain[x][y],-200,200)<0.3){
                fill(controls.color2,400,400);
            }
            else if(norm(terrain[x][y],-200,200)<0.5){
                fill(controls.color3,400,400);
            }
            else{
                fill(controls.color4,400,400);
            }
            vertex(x * scayl, y * scayl, terrain[x][y]);
            vertex(x * scayl, (y + 1) * scayl, terrain[x][y + 1]);
        }
        endShape();
    }
}

function shiftNoiseSpace() {
    let yOffset = flightPos;
    for (let y = 0; y < rows; ++y) {
        let xOffset = 0;
        for (let x = 0; x < cols; ++x) {
            terrain[x][y] = map(noise(xOffset, yOffset), 0, 1, -controls.terrainHeight, controls.terrainHeight);
            xOffset += controls.noiseDelta;
        }
        yOffset += controls.noiseDelta;
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}