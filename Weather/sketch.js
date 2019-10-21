let key='09d9d4dd11b3f18067e0a4e5054c25f6';
let input, button, question,api;
function preload(){


}
function setup() {
  
  
  // create canvas
  createCanvas(710, 400);

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(submit);

  question = createElement('h2', 'Where are you?');
  question.position(20, 5);

  textAlign(LEFT);
  textSize(20);
  
}

function submit() {
  const city = input.value();
  question.html(city);
  input.value('');
  
  //Api
  api='http://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+key;
  console.log(api);
  loadJSON('http://api.openweathermap.org/data/2.5/forecast?q=Shenzhen&appid=09d9d4dd11b3f18067e0a4e5054c25f6',gotData);

  
}
function gotData(Data){
  var description=Data.list[0].weather[0].description;
  fill(0);
  textSize(32);
  text(description, 20, 200);


}