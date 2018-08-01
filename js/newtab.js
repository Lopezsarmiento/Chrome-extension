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

    // Gets a number between 0 and obj.Length
    var objLength = locations.length;
    var item = Math.floor((Math.random() * objLength));

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
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m;
    var reloadTime = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
getImage();
startTime();