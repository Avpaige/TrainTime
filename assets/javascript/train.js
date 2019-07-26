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
       var frequency = $("#freq").val().trim();

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
    console.log("snap val is "+ snap.val());

    var firstTrainConverted = moment(snap.firstTrain, "HH:mm").subtract(1, "years");     
    currentTime = moment();
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;

    // var autoNext = moment(snap.firstTrain).recur().every(snap.frequency).minutes();
    
    if (snap.firstTrain > moment()){
      var nextArrival =snap.firstTrain;
    }else {
      var nextArrival = 0;
    }

  
    // var timeDiff = moment().diff(firstTrain, "minutes");
    // var minAway = frequency-(firstTrain % frequency);

    console.log(nextArrival + " next arrival");
    // console.log (autoNext + "is the auto next");
    console.log( minAway + "minutes away")
    var trainName = snap.val().trainName;
    var destination= snap.val().destination;
    var frequency =  snap.val().frequency;
    var minAway= moment().add(tMinutesTillTrain, "minutes");

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


