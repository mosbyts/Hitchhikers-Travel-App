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




=======

// Attractions page API End

//Traffic page API Beginning

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.55, lng: -77.46},
    zoom:11,
    avoidTolls: true,
    mapTypeControl: false,
    scaleControl: true,
    
    zoomControl: true,
    zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
    },

  });
  var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
  new AutocompleteDirectionsHandler(map);
  
}


function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  this.directionsService = new google.maps.DirectionsService;
  this.directionsRenderer = new google.maps.DirectionsRenderer;
  this.directionsRenderer.setMap(map);

  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  var modeSelector = document.getElementById('mode-selector');

  var originAutocomplete = new google.maps.places.Autocomplete(originInput);
  // Specify just the place data fields that you need.
  originAutocomplete.setFields(['place_id']);

  var destinationAutocomplete =
      new google.maps.places.Autocomplete(destinationInput);
  // Specify just the place data fields that you need.
  destinationAutocomplete.setFields(['place_id']);

  this.setupClickListener('changemode-driving', 'DRIVING');
  this.setupClickListener('changemode-transit', 'TRANSIT');
  this.setupClickListener('changemode-walking', 'WALKING');

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput);
  this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(
    id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;

  radioButton.addEventListener('click', function() {
    me.travelMode = mode;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(
    autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();

    if (!place.place_id) {
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    }
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.route = function() {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route(
      {
        origin: {'placeId': this.originPlaceId},
        destination: {'placeId': this.destinationPlaceId},
        travelMode: this.travelMode
      },
      function(response, status) {
        if (status === 'OK') {
          me.directionsRenderer.setDirections(response);
        } else {
        }
      });
    };
