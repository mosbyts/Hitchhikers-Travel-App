
//START OF WEATHER API -- KEVIN ----------------------



// key = 5351337fc3ab6151feda04b50a121221

//rename HTML label to match line 9 tag (the submit button)
function getWeatherForecast (cityname) {
    var key = "5351337fc3ab6151feda04b50a121221";
    var queryURLWeather = "api.openweathermap.org/data/2.5/forecast?q=" + cityname + ",us&mode=json"

    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function(response){
        $("#resultsWeather").append(response)
        //console.log(response);
    });
}
console.log(getWeatherForecast("New York"));

  

// END OF WEATHER API -------------------------------