"use strict";

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";
const youtubeKey = "AIzaSyBHHsToR8X9dSakTDaiVb25IjX7_XD01OM";
const FOOD_URL = "https://api.edamam.com/search";
const foodId = "54ddc21a";
const foodKey = "2ca1c511ec9055ec7195fb39602b989a";
const RESTAURANT_URL = "https://api.foursquare.com/v2/venues/search";

function restaurantRequest (searchTerm, city, callback) {
	const query = {
		near: `${city}`,
		query: `${searchTerm}`,
		v: 20180224,
		limit: 4,
		client_id: 'BXSADC2FPKWG01XQQYRXCAID0RL15OBBZUBMD0BSR1GYSD5W',
    	client_secret: 'WTO43W120JFMWPCCILGAGMMIMETRDKULGJ5ZCLADRLFQHO2X'
	}
	console.log(RESTAURANT_URL)
	$.getJSON(RESTAURANT_URL, query, callback);
}

function callbackRestaurant (data) {
	console.log(data);
	const display = data.response.venues.map((item, index) => renderRestaurants(item));	
	console.log(display);
	$("#restaurantResults").html(display);
}

function renderRestaurants (item) {
	// console.log(venues.menu.url);
	console.log(item.stats.tipCount);
	const restaurantName = item.name;
	const restaurantNumber = item.contact.formattedPhone;
	const restaurantAddress = item.location.address;
	const restaurantUrl = item.url;
	return `<ul>
				<li>${restaurantName || ""}</li>
				<li>${restaurantNumber || ""}</li>
				<li>${restaurantAddress || ""}</li>
				<li>${restaurantUrl || ""}</li>
			</ul>`
}





function recipeRequest (searchTerm, callback) {
	const query = {
		q: `${searchTerm}`,
		app_id: `${foodId}`,
		app_key: `${foodKey}`,
		to: 2,
		ingr: 5
	}
	console.log(FOOD_URL);
	$.getJSON(FOOD_URL, query, callback)
}

function callbackFood (data) {
	console.log(data);
	const display = data.hits.map((item, index) => renderRecipes(item));	
	console.log(display);
	$("#recipeResults").html(display);
};

function renderRecipes (item) {
	console.log(item.recipe.url);
	console.log(item.recipe.ingredientLines);
	console.log(item.recipe.label);
	const label = item.recipe.label;
	const ingredients = item.recipe.ingredientLines;
	const originalRecipe = item.recipe.url;

	return `<div>
				<span>${label}</span> <a href="${originalRecipe}">Original Recipe</a>
				<p>${ingredients[0]}</p>
				<p>${ingredients[1] || ""}</p>
				<p>${ingredients[2] || ""}</p>
				<p>${ingredients[3] || ""}</p>
				<p>${ingredients[4] || ""}</p>
			</div>`
}

function youtubeRequest (searchTerm, callback) {
	const query = {
		part: 'snippet',
		key: `${youtubeKey}`,
		q: `the best recipe for ${searchTerm} in: name`
	}
	 console.log(YOUTUBE_URL);
	$.getJSON(YOUTUBE_URL, query, callback)
}



function callbackTube (data) {
	console.log(data);
	const display = data.items.map((item, index) => render(item));	
	console.log(display);
	$("#youtubeResults").html(display);

}


function render (item) {
	console.log(item.id.videoId);
	console.log(item.snippet.title);
	console.log(item.snippet.thumbnails.medium.url);
	let href = "https://www.youtube.com/watch?v=" + item.id.videoId;
	let title = item.snippet.title;
	let image = item.snippet.thumbnails.medium.url;
	return `<div>
		<img src=${image}><a href= ${href}>${title}</a>
			</div>`;
}

function submitHandler() {
	$('form').on('submit', function (event){
		console.log('submit works');
		event.preventDefault();
		let searchTerm = $('#search').val();
		let city = $("#city").val();
		console.log(city);
		$("#city").val("");
		console.log(searchTerm);
		$('#search').val("");
		youtubeRequest(searchTerm, callbackTube);
		recipeRequest(searchTerm, callbackFood);
		restaurantRequest(searchTerm, city, callbackRestaurant);
	});
}

$(submitHandler);