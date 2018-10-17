(function newTab() {
	'use strict';

	// Invoke initialization
	init();

	function init() {

		// Execution Order.
		getLocation();
		getImage();
		startTime();
	};

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			console.log('location is not supported');
		}
	}

	function showPosition(position) {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;

		getWeather(lat, long);

	}

	function getWeather(lat, long) {
		const pepper = '&appid=cf6f3902316f9fa78adcc4f336e2728a';
		const latlong = `lat=${lat}&lon=${long}`;
		const units = '&units=metric';
		const url = `http://api.openweathermap.org/data/2.5/weather?${latlong}${units}${pepper}`;

		// DOM Elements
		const cityId = document.getElementById('city');
		const tempId = document.getElementById('temp');
		const iconId = document.getElementById('weatherIcon');

		fetch(url)
			.then(function (response) {
				if(!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function (responseAsJson) {
				// Do stuff with the JSON
				let data = responseAsJson;

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

				const locationIcon = '<i class="fas fa-map-marker-alt"></i>';
				const temperature = (data.main.temp).toFixed(0);
				tempId.innerHTML = ` | ${temperature}&#x2103;`;
				iconId.setAttribute('class', weatherIconID);
				cityId.innerHTML = `${data.name}`;
			})
			.catch(function (error) {
				console.log('Looks like there was a problem: \n', error);
			});
	}

	function getImage() {

		//Background image
		const bgImage = document.getElementById('bg');
		let locations;
		const lang = getLang();

		// Retrieve JSON file
		$.getJSON('js/locations.json', function (data, status, xhr) {

			if (xhr.status >= 200 && xhr.status < 400) {
				// Retreives city from response
				locations = data.locations

				// Get a number between 0 and obj.Length
				const objLength = locations.length;
				const item = Math.floor((Math.random() * objLength));
				const imageId = locations[item].id;

				//Set background image and place.
				bgImage.style.backgroundImage = locations[item].image;
				let locationName = (lang === 'en') ? locations[item].place.en : locations[item].place.es;
				let location = locations[item].location;
				let fact =  (lang === 'en') ? locations[item].fact.en : locations[item].fact.es;
				let link = (lang === 'en') ? locations[item].link.en: locations[item].link.es;
				let owner = locations[item].owner;
				let url = locations[item].url;
				let photo = (lang === 'en') ? 'Photograph' : 'Fotografia';
				let locationIcon = '<i class="fas fa-map-marker-alt"></i>';
				document.getElementById('locationName').innerHTML = `${locationName}`;
				document.getElementById('locationUrl').setAttribute('href', link);
				document.getElementById('location').innerHTML = `${locationIcon} ${location}`;
				document.getElementById('fact').innerHTML = fact;
				document.getElementById('owner').innerHTML = owner;
				document.getElementById('taker').setAttribute('href', url);
				document.getElementById('photo').innerHTML = photo;

				// Change image at certain amount of time.
				const reloadImage = setTimeout(getImage, 60000);
			} else {
				console.log(`error : status => ${status}`);
			}

		});
	};

	function startTime() {
		// DOM elements
		const clock = document.getElementById('clock');
		const greetElement = document.getElementById('greet');
		// Clock vars
		const today = new Date();
		const h = today.getHours();
		let m = today.getMinutes();
		let s = today.getSeconds();

		//Set greet value on screen
		//greetElement.innerHTML = `${greet}, ${name}`;

		// Add trailing zeros to mins
		m = checkTime(m);
		s = checkTime(s);
		// Set clock value on screen
		clock.innerHTML = `${h}:${m}`;

		// Get time value every n secs
		const reloadTime = setTimeout(startTime, 500);
	};

	// add zero in front of numbers < 10
	function checkTime(i) {
		if (i < 10) { i = `0${i}` };
		return i;
	};

	function getLang() {

		let lang = 'en';
		let browserLang = navigator.language;

		if (browserLang.includes('es')) {
			return lang = 'es';
		}
		return lang;
	}

})();