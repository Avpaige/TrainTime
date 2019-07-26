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
  // Your web app's Firebase configuration

  var dataRef = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = 0;
  var firstTrain = 0;
  var nextArrival = 0;
  var minAway = 0;

  $("#add").on("click", function (event){
    event.preventDefault();

  
        trainName = $("#train").val().trim();
        destination= $("#place").val().trim();
        firstTrain = $("#traintime").val().trim();
        frequency = $("#freq").val().trim();

        var newTrain ={
          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency:frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP,
        }

        dataRef.ref().push(newTrain);

          console.log(newTrain.trainName);
          console.log(newTrain.destination);
          console.log(newTrain.firstTrain);
          console.log(newTrain.frequency);

          alert("New Train Added");
  });

