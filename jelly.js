//show history list on page load
showHistory();

// pass the text in the search box to the search function.
function myFunction() {
	// grab the input value from the search box.
	let city = document.getElementById('searchBar').value;
	// pass the value to search function.
	search(city);
}

//this function is called when the search button is clicked
function search(city) {
	//prevent the default submit button function
	//event.preventDefault();
	let retrieveHistory = localStorage.getItem('history');
	let retrieveHistory2 = JSON.parse(retrieveHistory);
	//checking to see if array exists, if not create an empty array
	if (retrieveHistory2 == null) {
		retrieveHistory2 = [];
	}

	// adding new city to the beginning of the array
	retrieveHistory2.unshift(city);
	//store array in local storage as strings and then convert them back
	localStorage.setItem('history', JSON.stringify(retrieveHistory2));
	//update the div with changes
	showHistory();

	// saving api key as a variable for easier access
	let apikey = 'e4603c56717d371bf7a914a35065d336';

	//ajax call for single day forcast info
	$.ajax({
		url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikey,
		method: 'GET'
	}).then(function(response) {
		// retrieve city name
		let city = response.name;
		// retrieve temp
		let temp = response.main.temp;
		// convert temp from kelvin to ˚F
		temp = Math.floor((temp - 273.15) * 9 / 5 + 32);
		// retrieve humidity
		let humidity = response.main.humidity;
		// retrieve wind speed
		let windSpeed = response.wind.speed;

		// show city name, temp, humidity, wind speed at their DOM
		let cityj = document.getElementById('city');
		let tempj = document.getElementById('temp');
		let humj = document.getElementById('humidity');
		let windj = document.getElementById('windSpeed');
		cityj.innerHTML = city;
		tempj.innerHTML = temp;
		humj.innerHTML = humidity;
		windj.innerHTML = windSpeed;

		// retrieve weather icon code.
		let iconcode = response.weather[0].icon;
		// url for weather icon image.
		let iconurl = 'http://openweathermap.org/img/w/' + iconcode + '.png';

		// add image src to the weather icon image tag id.
		let wiconId = document.getElementById('wicon');
		wiconId.src = iconurl;
	});

	//ajax call for 5 day forcast info
	$.ajax({
		url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apikey,
		method: 'GET'
	}).then(function(response) {
		console.log(response);
		// index to pull out one record per day at 12pm.
		let responseIndex = [ 3, 11, 19, 27, 35 ];
		// for loop for the index array.
		for (let i = 0; i < responseIndex.length; i++) {
			// retrieve object for each index in the responseIndex array.
			let eachResponse = response.list[responseIndex[i]];

			// retreive time (date only), temp, humudity
			let dte = eachResponse.dt_txt.substring(0, 10);
			let tmp = eachResponse.main.temp;
			tmp = Math.floor((tmp - 273.15) * 9 / 5 + 32);
			let hmd = eachResponse.main.humidity;

			// weather icon
			let iconcode = eachResponse.weather[0].icon;
			let iconurl = 'http://openweathermap.org/img/w/' + iconcode + '.png';

			// add these values to their DOM
			let date = document.getElementById('card' + (i + 1).toString());
			let temp = document.getElementById('temp' + (i + 1).toString());
			let humid = document.getElementById('hum' + (i + 1).toString());
			let symbId = document.getElementById('symb' + (i + 1).toString());
			date.innerHTML = dte;
			temp.innerHTML = 'Temp: ' + tmp + '˚F';
			humid.innerHTML = 'Humidity: ' + hmd + '%';
			symbId.innerHTML = `<img src="` + iconurl + `" alt="Weather icon"></img>`;
		}
	});
}

// this function will create a new div with each history city added
function showHistory() {
	// search history is store in localStorage with the key name 'history'
	let retrieveHistory = localStorage.getItem('history');
	// convert the string in the localStorage to object using JSON.parse
	let retrieveHistory2 = JSON.parse(retrieveHistory);

	// if the history key has not initiated, stop showing the history.
	if (retrieveHistory2 == null) {
		// in this way the function will stop.
		return;
	}

	// set the maximum item as 6.
	let maxList;

	if (retrieveHistory2.length > 6) {
		maxList = 6;
	} else {
		maxList = retrieveHistory2.length;
	}

	//grabbing element and empty the history div
	document.getElementById('history').innerHTML = '';

	// showing the recent 6 search items.
	for (let i = 0; i < maxList; i++) {
		// create an item id for each history.
		let historyId = 'historyId' + i.toString();
		// append #history with a div of city names with a DOM ID.
		$(`<div class="historyCity" id="` + historyId + `"/>`).text(retrieveHistory2[i]).appendTo('#history');

		// add an event listener to each DOM ID.
		let historyBar = document.getElementById(historyId);
		historyBar.addEventListener('click', myFunction2); // historyBar.onclick = myFunction2();
	}
}

// myFunction2 is to seach and generate html pages for each city and weather.
function myFunction2() {
	search(this.textContent);
}
