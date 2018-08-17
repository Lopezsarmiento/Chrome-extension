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

    // Gets a number between 0 and obj.Length
    var objLength = locations.length;
    var item = Math.floor((Math.random() * objLength));
    var imageId = locations[item].id; 

    //Sets features values.
    document.getElementById("bg").style.backgroundImage = locations[item].image;
    document.getElementById("location").innerHTML = locations[item].name;

    //Changes image at certain amount of time.
    var reloadImage = setTimeout(getImage, 3000);
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
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
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
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

getImage();
startTime();
checkWeather();