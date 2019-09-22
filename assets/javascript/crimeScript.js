$(document).ready(function(){
// Tianna's crime API start
$("button").on("click", function(){
    event.preventDefault();
    queryURLCrime = "https://api.usa.gov/crime/fbi/sapi/api/" + location + "?api_key=JMLpV1qDeUxB4nk1hx39YC03ucTpKNh8sJxSyzKO";
    $.ajax({
        url: queryURLCrime,
        method: "GET"
    }).then(function(response){
        $("#pSearch").append(response);
    });
    var location = $("input").val("");
    console.log(location);
});
// Tianna's crime API end
});