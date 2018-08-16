// Object with images and locations
var locations = [
    {
        "id": 1,
        "name":"Cartagena - Colombia",
        "image":"url(../images/cartagena.jpg)"
    },
    {
        "id": 2,
        "name":"Cano Cristales - Colombia",
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

//Invoke functions.
getImage();
startTime();