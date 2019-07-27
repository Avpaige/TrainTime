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

  var database = firebase.database();
  var minAway = 

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
        $("#rtraintime").val("");
        $("#freq").val("");

       alert("New Train Added");
  });

  database.ref().on("child_added", function(snap) {
 
    var now = moment()
    var trainName = snap.val().trainName;
    var destination= snap.val().destination;
    var frequency =  snap.val().frequency;
    var firstTrain = snap.val().firstTrain;
    var minAway = moment(now).diff(nextArrival, "minutes");
    var firstTrainConverted = moment(firstTrain, "HH:mm");     


    if (moment(now).isAfter(firstTrain)){
      var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
      var tRemainder = diffTime % snap.frequency;
      var minAway = frequency - tRemainder;
      var nextTrain = moment().add(minAway, "minutes");
      var nextArrival = nextTrain;
      console.log(nextTrain, "next train")
        } else{
        var nextArrival= firstTrain;
 
    }

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minAway),
      );

    $(".table > tbody").append(newRow);

  });
});


