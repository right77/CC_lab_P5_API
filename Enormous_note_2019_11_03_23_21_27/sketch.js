var fft,pieces,radius;
let image;
var imgurl;
var link="http://www.colr.org/json/schemes/random/7";
var colorPalette = ["rgba(20, 20, 70, 0.05)", "rgba(40, 70, 72, 0.5)", "#00a6e0", "#00f9d9"];
function preload(){
  sound = loadSound('Assets/DEMO_1.mp3');
}

function setup(){
  let cnv = createCanvas(500,500);
  //click to start
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);
  // var api=link+"?api_key="+apikey;
  // console.log(api);
  // loadJSON(api,gotImg);
}

function draw(){
  background(colorPalette[0]);
  
  
  //background(colorPalette[1]);
  var bass    = fft.getEnergy("bass");
  var mid     = fft.getEnergy("mid");     
  var treble  = fft.getEnergy("treble");
  var mapBass     = map( bass, 0, 255, -100, 100 );
  var mapMid      = map( mid, 0, 255, -150, 150 );
  var mapTreble   = map( treble, 0, 255, -200, 200 );
  pieces= map(mouseX, 0, width, 5, 20);
  radius= map(mouseY, 0, height, 5, 300);
  
  let spectrum = fft.analyze();
  wave();

    translate( width/2, height/2 )
  for( i = 0; i < pieces; i++ ) {
    
    // Rotate the point of origin
    rotate(TWO_PI / pieces)
    
    push();
    strokeWeight(2);
    stroke(colorPalette[3]);
    line( mapBass, radius*1, 0, radius*1);
    
    strokeWeight(0.5);
    stroke(colorPalette[2]);
    line( mapMid, radius*0.7,0, radius ); 
  }
  
  

  drawspectrum(spectrum);
  
  
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
    loadJSON(link,gotcolor);
  } else {
    sound.loop();
  }
}
function wave(){

let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); 
  // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

}
function drawspectrum(spectrum){
  
  stroke(colorPalette[1]);
  fill(0,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    //rect(x, height, width / spectrum.length, h )
    ellipse(0,0, spectrum[i]*5, spectrum[i]*5 )
  }

}
function gotcolor(data){
console.log(data.schemes[1].id);
}