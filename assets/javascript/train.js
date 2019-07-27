$(document).ready(function(){

var config = {
  apiKey: "AIzaSyBuLsWT0Y8RVu6doFxFeVj9tNmgQfqbFbY",
  authDomain: "week7hw2019.firebaseapp.com",
  databaseURL: "https://week7hw2019.firebaseio.com",
  projectId: "week7hw2019",
  storageBucket: "",
  messagingSenderId: "677063025467",
  appId: "1:677063025467:web:bf8feb04246d3c94"
};

// Initialize Firebase
  firebase.initializeApp(config);
  console.log("firebase is " + firebase)
  // Your web app's Firebase configuration

  var hour = moment().hour();
  var minute = moment().minutes();
  var current = moment(hour + ":" + minute, "HH:mm");
  var current = current.format("hh:mm A")
  var database = firebase.database();
  var minAway = 0;

  
  $("p").text("The Current Time Is: " + current);


  $("#add").on("click", function (event){
    event.preventDefault();
  
       var trainName = $("#train").val().trim();
       var destination= $("#place").val().trim();
       var firstTrain =  $("#traintime").val().trim();
       var frequency = parseInt($("#freq").val().trim());

       console.log("train name is " + trainName);

        var newTrain ={
          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency:frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP,
        
        };

        database.ref().push(newTrain);

              $("#train").val("");
              $("#place").val("");
              $("#traintime").val("");
              $("#freq").val("");

              alert("New Train Added");
       // if (trainName === "string" && isNumeric(frequency)) {
          // } else {
        //   alert ("Something went wrong, please make sure you only enter letters for Train Name and Destinationa and numbers for the first train time and frequency");
        // }

        
  });

  database.ref().on("child_added", function(snap) {

     var frequency =  snap.val().frequency;
     var firstTrain = snap.val().firstTrain
     var trainName = snap.val().trainName;
     var destination= snap.val().destination;
     var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");;   
     var now = moment();
     var diffTime = moment().diff(moment(firstTrainConverted),"minutes");
     var tRemainder = diffTime % frequency;
     var tMinutesTillTrain = frequency - tRemainder;
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     var nextTrain = moment(nextTrain).format("hh:mm A");

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
      );

    $(".table > tbody").append(newRow);

  });
});


