	var fft,pieces,radius,music;
	let image;
	var imgurl;
	var sound1,sound2,sound3,sound4,sound5;
	var link="http://www.colr.org/json/schemes/random/7";
	var colorPalette = ["rgba(20, 20, 70, 0.05)", "rgba(40, 70, 72, 0.5)", "#00a6e0", "#00f9d9","#0034d9","rgba(250, 250, 250, 0.5)"];
	function preload(){

	  sound5 = loadSound('Assets/DEMO_5.mp3');
	  sound1 = loadSound('Assets/DEMO_1.mp3');
	  sound2 = loadSound('Assets/DEMO_2.mp3');
	  sound3 = loadSound('Assets/DEMO_3.mp3');
	  sound4 = loadSound('Assets/DEMO_4.mp3');
	}

	function setup(){
	  music=1;
	  let cnv = createCanvas(800,800);
	  //click to start
	  cnv.mouseClicked(togglePlay);
	  fft = new p5.FFT();
	  sound5.amp(0.2);
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
	  var scaleTreble = map(treble, 0, 255, 1, 1.5);
	  pieces= map(mouseX, 0, width, 5, 20);
	  radius= map(mouseY, 0, height, 5, 700);
	  
	  let spectrum = fft.analyze();
	  //drawline();
	  //wave();

	    translate( width/2, height/2 )
	  for( i = 0; i < pieces; i++ ) {
	    
	    // Rotate the point of origin
	    rotate(TWO_PI / pieces)
	    /*--  BASS --*/
	    push();
	    strokeWeight(3);
	    stroke(colorPalette[3]);
	    line( mapBass, radius*1, 0, radius*1);
	    /*--  Mid --*/
	    strokeWeight(0.5);
	    stroke(colorPalette[2]);
	    line( mapMid, radius*0.7,0, radius ); 
	    /*--  TREMBLE --*/
	    push();
	    strokeWeight(0.01);

	    stroke(colorPalette[4]);
	    scale(scaleTreble);
	    line(mapTreble, radius / 3, radius, radius);
	    line(-mapTreble, -radius / 3, radius, radius);
	  }
	  
	  

	  drawspectrum(spectrum);
	  
	  
	}

	// fade sound if mouse is over canvas
	function togglePlay() {
		if (music==5) {
			sound5.pause();
			sound1.loop();
			music=1;
			loadJSON(link,gotcolor);

		}
		else if (music==1) {
			sound1.pause();
			sound2.loop();
			music+=1;
			loadJSON(link,gotcolor);

		}
		else if (music==2) {
			sound2.pause();
			sound3.loop();
			music+=1;
			loadJSON(link,gotcolor);

		}
		else if (music==3) {
			sound3.pause();
			sound4.loop();
			music+=1;
			loadJSON(link,gotcolor);

		}
		else if (music==4) {
			sound4.pause();
			sound5.loop();
			music+=1;
			loadJSON(link,gotcolor);

		}



	  // if (sound5.isPlaying()) {
	  //   sound5.pause();
	    
	  // } else {
	  //   sound5.loop();
	  //   loadJSON(link,gotcolor);
	  //   console.log(link);
	  // }
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
	  strokeWeight(0.5);
	  fill(0,0); // spectrum is green
	  for (var i = 0; i< spectrum.length; i++){
	    let x = map(i, 0, spectrum.length, 0, width);
	    let h = -height + map(spectrum[i], 0, 255, height, 0);
	    //rect(x, height, width / spectrum.length, h )
	    ellipse(0,0, spectrum[i]*5, spectrum[i]*5 )
	  }

	}
	function gotcolor(data){
	console.log(data.schemes[1].colors[1]);
	console.log(data.schemes[1].colors[2]);
	colorPalette[2]="#"+data.schemes[1].colors[1];
	colorPalette[3]="#"+data.schemes[1].colors[2];
	colorPalette[4]="#"+data.schemes[1].colors[3];
	console.log(colorPalette[3]);
	}

	function drawline(){
		noStroke();
		fill(colorPalette[5]);
		ellipse(mouseX,mouseY,3,3);


	}