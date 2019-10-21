
let date0='2019-01-';
let date;
let days=[];

let key='DD4sOC0BZ1ssj4hhF9AgLGrEujWLyBBuqc9pFQVN';
let api;

var numspot=10;
var diameter=25;
var x=0;
var y=50;
var speed=0.05;
var direction=1;
var dday=0;
var go=false;

let spotsX=[];
let spotsY=[];
let spotsSped=[];
let spotsDia=[];
let spotsDir

function setup() {
  

  createCanvas(600, 150);
  background(100,100,100);
  
  for(let i=1;i<=31;i+=1){
  days[i]=i.toString();
  if(i<=9){
  days[i]="0"+days[i];
  }
   // console.log(days[i]);
  }
}
function draw() {
  fill(0, 12);
  rect(0, 0, width, height);
  
  if(go){
  for(let i=0;i<numspot;i+=1){
  //
  move(i,0.07);
  
  fill(255);
  noStroke();
  ellipse(spotsX[i],spotsY[i],spotsDia[i],spotsDia[i]);
  }
  }
  
  
}

function move(n,s){
  y=y+(s*direction);
  // console.log("y="+y);
  // console.log("s="+speed);
  // console.log("d="+direction);
  if(y > (height - diameter/2)){
  direction*=-1;
  }
  if(y < diameter/2){
  
  direction*=-1;
  }
 spotsY[n]=y;
}
function gotData(data){
  
  //get number of spots
  numspot=data.element_count;
  console.log("number="+numspot);
  //
  var ball=data.near_earth_objects[date];
  
  
  for(let i=0;i<numspot;i+=1){
  //x
  spotsX[i]=20+diameter*i;
  //diameter
  spotsDia[i]=ball[i].estimated_diameter.meters.estimated_diameter_min;
  spotsDia[i]=map(spotsDia[i],0,600,0,30);
  
    
  
  }
}
function mouseClicked() {
  if(dday<31){
  dday+=1;
  }
  date=date0+days[dday];
  console.log(date);
  textSize(32);
  text(date, 220, 70);
  api='https://api.nasa.gov/neo/rest/v1/feed?start_date='+date+'&end_date='+date+'&api_key='+key;
 loadJSON(api,gotData);
  go=true;

}
