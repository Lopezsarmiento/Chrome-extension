// Object with images and locations
var locations = [
    {
        "id": 1,
        "name":"Cartagena - Colombia",
        "image":"url(../images/cartagena.jpg)"
    },
    {
        "id": 2,
        "name":"Caño Cristales - Colombia",
        "image":"url(../images/canoCristales.jpg)"
    },
    {
        "id": 3,
        "name":"Parque Tayrona - Colombia",
        "image":"url(../images/tayrona.jpg)"
    }
];

function getImage() {

    //DOM elements
    const bgImage = document.getElementById("bg");
    const locationName = document.getElementById("location");

    // Get a number between 0 and obj.Length
    const objLength = locations.length;
    const item = Math.floor((Math.random() * objLength));
    const imageId = locations[item].id; 

    // Set background image and location name.
    bgImage.style.backgroundImage = locations[item].image;
    locationName.innerHTML = locations[item].name;

    // Change image at certain amount of time.
    const reloadImage = setInterval(getImage, 10000);
}

function startTime() {
    // DOM elements
    const clock = document.getElementById('clock');
    // Clock vars
    const today = new Date();
    const h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var greet;
    var name = "Pepper";
    m = checkTime(m);
    s = checkTime(s);

    //Display time of day
    if (h >= 00 && h <=12) {
        greet = "Good morning, ";
    } else if (h > 12 && h < 18) {
        greet = "Good afternoon, ";
    } else {
        greet = "Good evening, ";
    }

    document.getElementById('greet').innerHTML = greet+name;
    //Displaying time on screen
    document.getElementById('clock').innerHTML = h + ":" + m;

    var reloadTime = setTimeout(startTime, 500);

    // Add trailing zeros to mins
    m = checkTime(m);
    // Set clock value on screen
    clock.innerHTML = `${h}:${m}`;
    // Get time value every n secs
    const reloadTime = setInterval(startTime, 1000);
}

// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = `0${i}`};  
    return i;
}

function checkWeather() {

    var city = "buenos+aires";
    var apiKey = "&appid=cf6f3902316f9fa78adcc4f336e2728a"; //5f008a01931300e3dc2c478c5095fd71
    var units = "&units=metric";
    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+units+apiKey;

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, true);

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {

            document.getElementById('city').innerHTML = data.name;
            document.getElementById('temp').innerHTML = data.main.temp;

        } else {
            console.log('error :' + 'request.status : ' + request.status);
        }
        
    }

    // Send request
    request.send();
}

//Invoke functions.
getImage();
startTime();
checkWeather();