// Link Firebase and initialize database
var firebaseConfig = {
  apiKey: "AIzaSyAra25MEjUTECRsQSJmQL-mFeAsCSDr974",
  authDomain: "project-1-a791a.firebaseapp.com",
  databaseURL: "https://project-1-a791a.firebaseio.com",
  projectId: "project-1-a791a",
  storageBucket: "project-1-a791a.appspot.com",
  messagingSenderId: "533628463332",
  appId: "1:533628463332:web:6cde671c064321bc9864f1",
  measurementId: "G-LY1LVHYVBC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();

// Create a list of locations in the Looney Tunes World
const locations = [
  "ACME Corp",
  "ACME Acres",
  "ACME Looniversity",
  "Acmetropolis",
  "Besties",
  "Bug's Fort",
  "Bug's Hole",
  "Bug's House",
  "Cecil's Apartment",
  "Chuck's Roadhouse Tavern",
  "Copy Place",
  "Earth",
  "Enormocorp",
  "Foghorn's Mansion",
  "Granny's Mansion",
  "Happy Bear Car Wash",
  "Home Warehouse",
  "Ink Inc.",
  "Katnip Kollege",
  "Lola's Apartment",
  "Me & Mommy",
  "Moron Mountain",
  "N.W. South Highschool",
  "Perfecto Prep",
  "Pimento University",
  "Pizzariba",
  "Porky's House",
  "Porky's Pizza Palace",
  "Royal Mallard",
  "Royal Oaks Glen Oaks Oakwood Oaks Country Club",
  "Royal Oaks Glen Oaks Oakwood Oaks Mall",
  "Spinsters Arms",
  "That-a-Burger",
  "The Movie Theater",
  "The Rich Girl's Apartment",
  "The Sunset Room",
  "Ticktockia",
  "Tina's Apartment",
  "Tutty's",
  "Wackyland",
  "Walter & Patricia's Mansion",
  "Witch Lezah's House",
  "Yosemite Sam's House"
];

// Function to render location options in HTML form input
function renderLocations() {
  // For loop for locations array
  for (var i = 0; i < locations.length; i++) {
    // Create newLocation variable that is an option div
    var newLocation = $("<option>");

    // Set text of newLocations to be the current loop index
    newLocation.text(locations[i]);

    // Append that newLocation div to the new-train-destination drop down in HTML
    $("#new-train-destination-input").append(newLocation);
  }
}

// Run renderLocations
renderLocations();

// Create an on-click event that will capture and store the user's input in the Add Train form
$("#new-train-submit").on("click", function(event) {
  // Prevent page refresh/reload
  event.preventDefault();

  // Create newTrain object
  let newTrain = new Object();

  // Console log to confirm newTrain object was created
  console.log("New train object successfully created");

  // Get inputs from the form inputs in HTML
  // Assign those input values to newTrain object properties
  newTrain.newTrainName = $("#new-train-name-input")
    .val()
    .trim();
  newTrain.newTrainDestination = $("#new-train-destination-input")
    .val()
    .trim();
  newTrain.newTrainFirstTime = $("#new-train-first-time-input")
    .val()
    .trim();
  newTrain.newTrainFrequency = $("#new-train-frequency-input")
    .val()
    .trim();

  // Console log newTrainString
  console.log(newTrain);

  // Save newTrain form inputs to firebase database
  database.ref().push(newTrain);

  // Clear all the form-input fields
  $("#new-train-name-input").val("");
  $("#new-train-destination-input").val("");
  $("#new-train-first-time-input").val("");
  $("#new-train-frequency-input").val("");
});

// Read data from database, automatically updates on initial data and then on further creation of new child objects in the database
database.ref().on(
  "child_added",
  function(snapshot) {
    // Capture the snapshot.val() in a convenient variable
    let snapVal = snapshot.val();

    // console log inital data to the console
    console.log(snapshot.val());

    // console log all properties of interest of the last train obeject
    console.log(snapVal.newTrainName);
    console.log(snapVal.newTrainDestination);
    console.log(snapVal.newTrainFirstTime);
    console.log(snapVal.newTrainFrequency);

    // Establish next arrival and remaining mins variables
    var remainingMins;
    var nextArrival;

    // Calculate Next Arrival & Remaining Mins
    function calcNextArrivalandMinsRemaining() {
      var currentTime = moment().format("HH:mm");

      console.log("TIME-1: ", moment());
      console.log("TIME-2: ", currentTime);

      snapVal.newTrainFrequency;

      // Reading moment, tell moment what it is receiving

      var newTrainFirstTime = moment(snapVal.newTrainFirstTime, "HH:mm");

      console.log("Time-3: " + moment(snapVal.newTrainFirstTime, "HH:mm"));
      console.log("Time-4: " + moment());

      // divide current time by interval, leftover will be next arrival, just need to convert it into minutes
      // Calculate difference between current and first time
      // if difference is negative, then the next train is the first train, only need to calculate time between now and next train
      var minutesPassed = moment().diff(newTrainFirstTime);

      // Reformat moment diff
      var formattedDiff = moment(minutesPassed).format("mm");

      console.log(minutesPassed);
      console.log(formattedDiff);

      // Create an if statement for when the difference between first train and current time is negative (when the current time is before the first train time), then you make the next arrival the first train time and the remaining minutes is the difference between the current time and the first train time
      if (formattedDiff < 0) {
        nextArrival = snapVal.newTrainFirstTime;
        remainingMins = moment().diff(snapVal.newTrainFirstTime).format("HH;mm");
      }

      // If the difference is positive calculate as you would regularly
      else {
        // Divide difference by the frequency
        remainingMins = formattedDiff % parseInt(snapVal.newTrainFrequency);

        // Calculate next arrival, current time + remainingMins
        nextArrival = moment()
          .add(remainingMins, "m")
          .format("HH:mm");
      }
    };

    calcNextArrivalandMinsRemaining();

    console.log(remainingMins);
    console.log(nextArrival);

    // Create a new newTrainRow object
    var newTrainRow = $("<tr>");

    // Create a new table header, th
    // Set the scope to be row
    // Set the text to be the name of the new train
    var newTrainRowName = $("<th>");
    newTrainRowName.text(snapVal.newTrainName);

    // Create a new td div for destination
    // Set the text to be the destination of the new train's
    var newTrainRowDestination = $("<td>");
    newTrainRowDestination.text(snapVal.newTrainDestination);

    // Create a new td div for frequency
    // Set the text to be the frequency of the new train
    var newTrainRowFrequency = $("<td>");
    newTrainRowFrequency.text(snapVal.newTrainFrequency);

    // Create new td div for next arrival
    // Set the text to be the next arrival of the new train
    var newTrainRowNextArrival = $("<td>");
    newTrainRowNextArrival.text(remainingMins);

    // Create new td div for mins remaining
    // Set the text to be the mins remaining of the new train
    var newTrainRowMinsRemaining = $("<td>");
    newTrainRowMinsRemaining.text(nextArrival);

    // Append the new train's name, destination and frequency to the newTrainRow
    newTrainRow.append(
      newTrainRowName,
      newTrainRowDestination,
      newTrainRowFrequency,
      newTrainRowNextArrival,
      newTrainRowMinsRemaining

      // add next arrival and mins remaining
    );

    console.log(newTrainRow);

    // Update the HTML by appending the newTrainRow to tbody
    $("#new-train-display").append(newTrainRow);
  },

  // Create error handling
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);
