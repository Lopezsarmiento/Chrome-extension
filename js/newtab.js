"use strict"
// Object with images and locations
const locations = [
    {
        "id": 1,
        "name":"Cartagena de Indias",
        "image":"url(../images/cartagena.jpg)"
    },
    {
        "id": 2,
        "name":"Caño Cristales",
        "image":"url(../images/canoCristales.jpg)"
    },
    {
        "id": 3,
        "name":"Parque Tayrona",
        "image":"url(../images/tayrona.jpg)"
    },
    {
        "id": 4,
        "name":"Valle del Cocora",
        "image":"url(../images/cocora.jpg)"
    },
    {
        "id": 5,
        "name":"Cerro de Monserrate",
        "image":"url(../images/monserrate.jpg)"
    },
    {
        "id": 6,
        "name":"San Andres Islas",
        "image":"url(../images/sanandres.jpg)"
    }
];

const quotes = [
    {
        "Author": "Gabriel Garcia Marquez",
        "Quote": " No hay medicina que cure lo que no cura la felicidad."
    },
    {
        "Author": "Gabriel Garcia Marquez",
        "Quote": "Me desconcierta tanto pensar que Dios existe, como que no existe."
    },
    {
        "Author": "Gabriel Garcia Marquez",
        "Quote": "Ninguna persona merece tus lágrimas, y quien se las merezca no te hará llorar."
    }
];


init();

function init() {
    getImage();
    startTime();
    checkWeather();
    getQuote();
}

function getImage() {

    //DOM elements
    const bgImage = document.getElementById('bg');
    const locationName = document.getElementById('location');

    // Get a number between 0 and obj.Length
    const objLength = locations.length;
    const item = Math.floor((Math.random() * objLength));
    const imageId = locations[item].id; 

    // Set background image and location name.
    bgImage.style.backgroundImage = locations[item].image;
    locationName.innerHTML = locations[item].name;

    // Change image at certain amount of time.
    const reloadImage = setTimeout(getImage, 10000);

}

function getQuote() {
    // DOM elements
    const quoteId = document.getElementById('quote');
    const objLength = quotes.length;
    const position = Math.floor((Math.random() * objLength));
    const quote = quotes[position].Quote;

    // Set quote on screen
    quoteId.innerHTML = quote;
    // Get quote
    const reloadQuote = setTimeout(getQuote, 10000);
}

function startTime() {
    // DOM elements
    const clock = document.getElementById('clock');
    const greetElement = document.getElementById('greet');
    // Clock vars
    const today = new Date();
    const h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var name = "Pepperino";

    var greet = timeOfDay(h);

    //Set greet value on screen
    greetElement.innerHTML = `${greet}, ${name}`;

    // Add trailing zeros to mins
    m = checkTime(m);
    s = checkTime(s);
    // Set clock value on screen
    clock.innerHTML = `${h}:${m}:${s}`;

    // Get time value every n secs
    const reloadTime = setTimeout(startTime, 500);
}

function timeOfDay(h) {
    var greet;
    //Display time of day
    if (h >= 0 && h <=12) {
        greet = "Good morning";
    } else if (h > 12 && h < 18) {
        greet = "Good afternoon";
    } else {
        greet = "Good evening";
    }

    return greet;
}
// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = `0${i}`};  
    return i;
}

function checkWeather() {

    const city = "buenos+aires";
    const apiKey = "&appid=cf6f3902316f9fa78adcc4f336e2728a"; //5f008a01931300e3dc2c478c5095fd71
    const units = "&units=metric";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}${units}${apiKey}`;
    // DOM Elements
    const cityId = document.getElementById('city');
    const tempId = document.getElementById('temp');

    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, true);

    request.onload = function () {
        // Begin accessing JSON data here
        const data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {

            const temperature = data.main.temp;
            tempId.innerHTML = temperature.toFixed(1); //reduce to one decimal
            cityId.innerHTML = data.name;

        } else {
            console.log('error :' + 'request.status : ' + request.status);
        }
        
    }

    // Send request
    request.send();
}
