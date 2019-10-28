// Giphy variables---------------------
let giphySearch = 'clouds';
let giphyapi = 'https://api.giphy.com/v1/gifs/search?api_key=rMXuwMjUUGR9Zdv2mmtdGWqAE0NOLUb0&q='; //usually end as "q="
let giphyLimtit = '&limit=25&offset=0&rating=G&lang=en'; //endpoint , 25 of pics
let giphyLink;
let input;
let img;

// Weather variables---------------------
let city = 'Shenzhen';
let weatherKey = '&APPID=5f7315f331181aa4ac6571d7f18b543a'; //API Key
let weatherapi = 'http://api.openweathermap.org/data/2.5/weather?q=';

let weatherlink = weatherapi + city +weatherKey ;

function setup(){

    input = createInput('New York');
    let button = createButton('submit');

    button.position(50,120);

    //event is button pressed
    button.mousePressed(updateCity);

}

function updateCity(){
    
    city=input.value();
    textSize(8);
	text(city, 10, 30);
    console.log(city);
    //weather api
    weatherlink = weatherapi + city +weatherKey ;
    loadJSON(weatherlink,gotWeatherData);
    



}

function gotWeatherData(data){ //get the data from JSON
    //console.log(weatherlink);
    console.log(data.weather[0].main);
    giphySearch=data.weather[0].main;
    giphyLink=giphyapi+giphySearch+giphyLimtit;
    console.log(giphyLink);
    loadJSON(giphyLink,gotGiphy);

}
function gotGiphy(data){

	console.log(data.data[0].images.original.url);
  createImg(data.data[0].images.original.url);

}