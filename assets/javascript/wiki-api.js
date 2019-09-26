// Pulls Data from Relevant Wikipedia pages API Documentation
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://unfound-wikitopics-v1.p.rapidapi.com/suggestion/wikitopics",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "unfound-wikitopics-v1.p.rapidapi.com",
		"x-rapidapi-key": "da05301b5dmsh90c0a3e93bf53e7p1af6d4jsnec06e35f66ae",
		"content-type": "application/json",
		"accept": "application/json"
	},
	"processData": false,
	"data": "{\"input_type\": \"url\",\"input_data\": \"https://www.tesla.com/elon-musk\"}"
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

var value = $("#searchQuery").val();
console.log(value);



