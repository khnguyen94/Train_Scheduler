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
    "ACME Corp", "ACME Acres", "ACME Looniversity", "Acmetropolis", "Besties", "Bug's Fort", "Bug's Hole", "Bug's House", "Cecil's Apartment", "Chuck's Roadhouse Tavern", "Copy Place", "Earth", "Enormocorp", "Foghorn's Mansion", "Granny's Mansion", "Happy Bear Car Wash", "Home Warehouse", "Ink Inc.", "Katnip Kollege", "Lola's Apartment", "Me & Mommy", "Moron Mountain", "N.W. South Highschool", "Perfecto Prep", "Pimento University", "Pizzariba", "Porky's House", "Porky's Pizza Palace", "Royal Mallard", "Royal Oaks Glen Oaks Oakwood Oaks Country Club", "Royal Oaks Glen Oaks Oakwood Oaks Mall", "Spinsters Arms", "That-a-Burger", "The Movie Theater", "The Rich Girl's Apartment", "The Sunset Room", "Ticktockia", "Tina's Apartment", "Tutty's", "Wackyland", "Walter & Patricia's Mansion", "Witch Lezah's House", "Yosemite Sam's House"
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
        $("#new-train-destination").append(newLocation);
    }
};

// Run renderLocations
renderLocations();








