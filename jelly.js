//show history list on page load
showHistory();

//this function is called when the search button is clicked
function myFunction() {
	//prevent the default submit button function
	event.preventDefault();
	var retrieveHistory = localStorage.getItem('history');
	var retrieveHistory2 = JSON.parse(retrieveHistory);
	//checking to see if array exists, if not create an empty array
	if (retrieveHistory2 == null) {
		retrieveHistory2 = [];
	}

	//grab the input block
	let searchCity = document.getElementById('searchBar');
	searchedCity = searchCity.value;
	// adding new city to the beginning of the array
	retrieveHistory2.unshift(searchCity.value);
	//store array in local storage as strings and then convert them back
	localStorage.setItem('history', JSON.stringify(retrieveHistory2));
	//update the div with changes
	showHistory();

	// saving api key as a variable for easier access
	var apikey = 'e4603c56717d371bf7a914a35065d336';

	//ajax call for single day forcast info
	$.ajax({
		url: 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity.value + '&appid=' + apikey,
		method: 'GET'
	}).then(function(response) {
		var city = response.name;
		var temp = response.main.temp;
		temp = Math.floor((temp - 273.15) * 9 / 5 + 32);
		var humidity = response.main.humidity;
		var windSpeed = response.wind.speed;
		var cityj = document.getElementById('city');
		var tempj = document.getElementById('temp');
		var humj = document.getElementById('humidity');
		var windj = document.getElementById('windSpeed');
		cityj.innerHTML = city;
		tempj.innerHTML = temp;
		humj.innerHTML = humidity;
		windj.innerHTML = windSpeed;
		console.log(response);
	});

	//ajax call for 5 day forcast info
	$.ajax({
		url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchCity.value + '&appid=' + apikey,
		method: 'GET'
	}).then(function(response) {
		//console.log(response.main);
	});
}

// this function will create a new div with each history city added
function showHistory() {
	var retrieveHistory = localStorage.getItem('history');
	var retrieveHistory2 = JSON.parse(retrieveHistory);
	if (retrieveHistory2 == null) {
		return;
	}
	//grabbing element and empty the history div
	document.getElementById('history').innerHTML = '';
	for (i = 0; i < retrieveHistory2.length; i++) {
		$(`<div class="historyCity" />`).text(retrieveHistory2[i]).appendTo('#history');
	}
}
