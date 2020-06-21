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
