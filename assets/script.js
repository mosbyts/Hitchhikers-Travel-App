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
