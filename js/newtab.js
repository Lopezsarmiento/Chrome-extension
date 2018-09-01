(function newTab() {
	'use strict';
	// Object with images and locations
	const locations = [
		{
			"id": 1,
			"place": "Torre del reloj",
			"location": "Cartagena de Indias",
			"link": "http://www.colombia.travel/es/a-donde-ir/caribe/cartagena-de-indias",
			"image": "url(../images/cartagena.jpg)",
			"fact": "The highest point in Colombia is the Pico Cristóbal Colón of the Andes, which stands at 18,700 feet tall."
		},
		{
			"id": 2,
			"place": "Caño Cristales",
			"location": "Serrania de la Macarena",
			"link": "http://www.colombia.travel/es/a-donde-ir/orinoquia/la-macarena/actividades/asombrate-con-cano-cristales",
			"image": "url(../images/canoCristales.jpg)",
			"fact": "Colombia is the second most biodiverse country in the world, after only Brazil which is 10 times its size. It is one of only 17 “megadiverse” countries in the world."
		},
		{
			"id": 3,
			"place": "Parque Tayrona",
			"location": "Santa Marta",
			"link": "http://www.colombia.travel/es/a-donde-ir/caribe/santa-marta",
			"image": "url(../images/tayrona.jpg)",
			"fact": "Colombia is the only country in South America that has coastlines on both the Pacific Ocean and the Caribbean Sea."
		},
		{
			"id": 4,
			"place": "Valle del Cocora",
			"location": "Salento",
			"link": "http://www.colombia.travel/es/a-donde-ir/andina/armenia/actividades/conoce-el-valle-del-cocora",
			"image": "url(../images/cocora.jpg)",
			"fact": "Colombia is part of the Ring of Fire, a group of countries in the Pacific Ocean vulnerable to earthquakes and volcanic eruptions."
		},
		{
			"id": 5,
			"place": "Cerro de Monserrate",
			"location": "Bogotá",
			"link": "http://www.colombia.travel/es/a-donde-ir/andina/bogota",
			"image": "url(../images/monserrate.jpg)",
			"fact": "Bogota has South America’s largest network of bicycle routes: over 300km stretching from slum areas and suburbs to the city centre."
		},
		{
			"id": 6,
			"place": "Cayo Acuario",
			"location": "San Andres Islas",
			"link": "http://www.colombia.travel/es/a-donde-ir/caribe/san-andres",
			"image": "url(../images/sanandres.jpg)",
			"fact": "There are over 300 beaches that locals and tourists can take advantage of to see all of the natural beauty this country has to offer."
		},
		{
			"id": 7,
			"place": "Santuario de las lajas",
			"location": "Ipiales",
			"link": "http://www.colombia.travel/es/que-hacer/pacifica/pasto/experiencias/el-santuario-de-las-lajas",
			"image": "url(../images/santuariolaslajas.jpg)",
			"fact": "Approximately 90% of the population of Colombia is Catholic."
		},
		{
			"id": 8,
			"place": "Amazonas",
			"location": "Parque Nacional Amacayacu",
			"link": "http://www.colombia.travel/es/a-donde-ir/amazonia",
			"image": "url(../images/amazonia.jpg)",
			"fact": "One of the unique animals that can be spotted in Colombia is the Amazon River dolphin, which is pink!"
		}
	];


	getImage();
	startTime();
	getIp(getWeather);

	//checkWeather();

	function getIp(callback) {

		// Request to API
		$.getJSON('http://ipinfo.io', function(data, status, xhr) {

			if (xhr.status >= 200 && xhr.status < 400) {
				// Retreives city from response
				let city = data.city;

				// Replaces space for (+)
				city = city.replace(' ', '+');

				//invoke checkWeather
				callback(city);
			}
			
		});
	}

	function getWeather(city) {

		const apiKey =  '&appid=cf6f3902316f9fa78adcc4f336e2728a';
		const units = '&units=metric';
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}${units}${apiKey}`;

		// DOM Elements
		const cityId = document.getElementById('city');
		const tempId = document.getElementById('temp');
		const iconId = document.getElementById('weatherIcon');


		$.getJSON(url, function(data, status, xhr) {
			
			if (xhr.status >= 200 && xhr.status < 400) {

				// Get icon depending on time of day
				const date = new Date();
				const sunrise = new Date(data.sys.sunrise * 1000); //Convert a Unix timestamp to time
				const sunset = new Date(data.sys.sunset * 1000);

				/* Get suitable icon for weather */
				if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
					var weatherIconID = `wi wi-owm-day-${data.weather[0].id}`;
				}
				else {
					var weatherIconID = `wi wi-owm-night-${data.weather[0].id}`;
				}

				const temperature = (data.main.temp).toFixed(0);
				tempId.innerHTML = `${temperature}&#x2103;`;
				iconId.setAttribute('class', weatherIconID);
				cityId.innerHTML = (data.name).toUpperCase();

			} else {
				console.log(`error : status => ${status}`);
			}

		});
	}

	function getImage() {

		//Background image
		const bgImage = document.getElementById('bg');

		// Get a number between 0 and obj.Length
		const objLength = locations.length;
		const item = Math.floor((Math.random() * objLength));
		const imageId = locations[item].id;

		// Set background image and place.
		bgImage.style.backgroundImage = locations[item].image;
		let locationName = locations[item].place;
		let location = locations[item].location;
		let fact = locations[item].fact;
		let link = locations[item].link;

		document.getElementById('locationName').innerHTML = locationName;
		document.getElementById('locationName').setAttribute('href', link);
		document.getElementById('location').innerHTML = location;
		document.getElementById('fact').innerHTML = fact;

		// Change image at certain amount of time.
		const reloadImage = setTimeout(getImage, 60000);

	}

	function startTime() {
		// DOM elements
		const clock = document.getElementById('clock');
		const greetElement = document.getElementById('greet');
		// Clock vars
		const today = new Date();
		const h = today.getHours();
		let m = today.getMinutes();
		let s = today.getSeconds();
		let name = "Pepperino";

		let greet = timeOfDay(h);

		//Set greet value on screen
		//greetElement.innerHTML = `${greet}, ${name}`;

		// Add trailing zeros to mins
		m = checkTime(m);
		s = checkTime(s);
		// Set clock value on screen
		clock.innerHTML = `${h}:${m}`;

		// Get time value every n secs
		const reloadTime = setTimeout(startTime, 500);
	}

	function timeOfDay(h) {
		let greet;
		//Display time of day
		if (h >= 0 && h <= 12) {
			greet = "Buenos dias";
		} else if (h > 12 && h < 19) {
			greet = "Buenas tardes";
		} else {
			greet = "Buenas noches";
		}

		return greet;
	}
	// add zero in front of numbers < 10
	function checkTime(i) {
		if (i < 10) { i = `0${i}` };
		return i;
	}

})();