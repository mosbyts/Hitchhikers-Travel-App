// Tianna's crime API start
$("button").on("click", function(){
    queryURLCrime = "https://api.usa.gov/crime/fbi/sapi/api/agencies/" + location + "?api_key=JMLpV1qDeUxB4nk1hx39YC03ucTpKNh8sJxSyzKO";
    $.ajax({
        url: queryURLCrime,
        method: "GET"
    }).then(function(response){
        $("#pSearch").append(response);
    });
});

var location = $("button").val("");
// Tianna's crime API end

//Kevin's weather API start
function getWeatherForecast (cityname) {
    var key = "5351337fc3ab6151feda04b50a121221";
    var queryURLWeather = "api.openweathermap.org/data/2.5/forecast?q=" + cityname + ",us&mode=json"

    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function(response){
        $("#resultsWeather").append(response)
        console.log(response);
    });
}
console.log(getWeatherForecast("New York"));



// Kevin's weather API end
