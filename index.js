"use strict";

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";
const youtubeKey = "AIzaSyBHHsToR8X9dSakTDaiVb25IjX7_XD01OM";
const FOOD_URL = "https://api.edamam.com/search";
const foodId = "54ddc21a";
const foodKey = "2ca1c511ec9055ec7195fb39602b989a";
const RESTAURANT_URL = "https://api.foursquare.com/v2/venues/search";
// const RESTAURANT_URL = "https://api.foursquare.com/v2/venues/explore";


function restaurantRequest (searchTerm, city, callback) {
	const query = {
		near: `${city}`,
		query: `${searchTerm}`,
		v: 20180224,
		limit: 8,
		client_id: 'BXSADC2FPKWG01XQQYRXCAID0RL15OBBZUBMD0BSR1GYSD5W',
    	client_secret: 'WTO43W120JFMWPCCILGAGMMIMETRDKULGJ5ZCLADRLFQHO2X'
	}
	console.log(RESTAURANT_URL)
	$.getJSON(RESTAURANT_URL, query, callback);
}

function callbackRestaurant (data) {
	console.log(data);
	const display = data.response.venues.map((item, index) => renderRestaurants(item));
	$("#restaurantResults").html(display);
}

function renderRestaurants (item) {
	// console.log(item.stats.tipCount);
	const restaurantName = item.name;
	const restaurantNumber = item.contact.formattedPhone;
	const restaurantAddress = item.location.address;
	const restaurantUrl = item.url;
	console.log(restaurantNumber);
	console.log(restaurantAddress);
	// if (restaurantNumber !== undefined && restaurantAddress !== undefined && restaurantUrl !== undefined) {
		return `<div class="hover">
					<h3>${restaurantName}</h3>
					<ul>
						<li>Phone: ${restaurantNumber || ""}</li>
						<li>Address: ${restaurantAddress || ""}</li>
						<li>Website: ${restaurantUrl || ""}</li>
						<br/>
						<br/>
						<br/>
					</ul>
				</div>`
	// }
}





function recipeRequest (searchTerm, callback) {
	const query = {
		q: `${searchTerm}`,
		app_id: `${foodId}`,
		app_key: `${foodKey}`,
		to: 5,
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
	console.log(item.recipe.yield);
	console.log(item.recipe.image);
	console.log(item.recipe.calories);
	// const pic = 'https://www.edamam.com/web-img/e67/e670c8de536f4beceedc0f4707efec50.jpg';
	const label = item.recipe.label;
	const ingredients = item.recipe.ingredientLines;
	const originalRecipe = item.recipe.url;

	return `<div class="hover">
				<h3>${label}</h3> 
				<ul>
					<li>${ingredients[0]}</li>
					<li>${ingredients[1] || ""}</li>
					<li>${ingredients[2] || ""}</li>
					<li>${ingredients[3] || ""}</li>
					<li>${ingredients[4] || ""}</li>
					<li><a href="${originalRecipe}">Recipe Instructions</a></li>
				</ul>
				</br>
				</br>
				</br>
			</div>`
}

function youtubeRequest (searchTerm, callback) {
	const query = {
		part: 'snippet',
		key: `${youtubeKey}`,
		q: `The best recipe for ${searchTerm} in: name`
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
	return `<div class="youTubeContainer hover">
				<h3><a href= ${href} class="youTubeLinks">${title}</a></h3>
				<img src=${image}>
				<br/>
				<br/>
				<br/>
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