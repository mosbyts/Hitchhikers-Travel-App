// Tianna's Crime API Beginning
$(document).ready(function(){
  // Tianna's crime API start
  $("button").on("click", function(event){
      event.preventDefault();
      var stateAbbr = $("#stateAbbrInput").val();
      var crimeAPI = "api_key=JMLpV1qDeUxB4nk1hx39YC03ucTpKNh8sJxSyzKO";
      var queryURLCrime = "https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + stateAbbr + "/violent-crime/2014/2017?" + crimeAPI;
      
      $.ajax({
          url: queryURLCrime,
          method: "GET"
      }).then(function(response){
          var crimeResults = JSON.stringify(response.results);
          console.log(crimeResults);
          for(var x = 0; x < 4; x++){
          var crimeYear = crimeResults[x].data_year;
          var crimeType = crimeResults[x].offense;
          var crimeCount = crimeResults[x].actual;
          $("#crimeSearch").append("<p>" + "Crime Year: " + crimeYear + "</p>");
          $("#crimeSearch").append("<p>" + "Crime Type: " + crimeType + "</p>");
          $("#crimeSearch").append("<p>" + "Number of Offenses: " + crimeCount + "</p>");
          };
      });
  });
});
// Tianna's crime API end


// Testimonial Page
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCKo1DDzSRTelPedeOBRl-VuS5n3syShKA",
  authDomain: "testimonials-801d2.firebaseapp.com",
  databaseURL: "https://testimonials-801d2.firebaseio.com",
  projectId: "testimonials-801d2",
  storageBucket: "",
  messagingSenderId: "362943701187",
  appId: "1:362943701187:web:7f7f873e774be0e05bc276"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding testimonials

$("#add-testimonial-button").on("click", function(event) {
  event.preventDefault();

// Grabs user input

var testimonialName = $("#testimonial-name").val().trim();
var testimonialMessage = $("#testimonial-review").val().trim();


// Creates local "temporary" object for holding train data

var newTestimonial = {
  name: testimonialName,
  message: testimonialMessage,
};

// Uploads train data to the database
database.ref().push(newTestimonial);

// Logs everything to console
console.log(newTestimonial.name);
console.log(newTestimonial.message);

// Clears all of the text-boxes
$("#testimonial-name").val("");
$("#testimonial-review").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

// Store everything into a variable.
var testimonialName = childSnapshot.val().name;
var testimonialMessage = childSnapshot.val().message;

// Train Info
console.log(testimonialName);
console.log(testimonialMessage);

// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(testimonialName),
  $("<td>").text(testimonialMessage),
);

// Append the new row to the table
$("#testimonial-table > tbody").append(newRow);
});

// End of Testimonal Page