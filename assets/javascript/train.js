  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyBW5rbUSAaSKVZ3hZedUft_OeocOPK3STE",
    authDomain: "payroll-week-7.firebaseapp.com",
    databaseURL: "https://payroll-week-7.firebaseio.com",
    projectId: "payroll-week-7",
    storageBucket: "",
    messagingSenderId: "877587004908",
    appId: "1:877587004908:web:5a5d83c5f36791c9"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  var dataRef = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = 0;
  var firstTrain = 0;
  var nextArrival = 0;
  var minAway = 0;

  $("#click").on("click", function (event){
    event.preventDefault();
        trainName= $("#train").val().trim();
        destination= $("#place").val().trim();
        firstTrain= $("#traintime").val().trim();
        frequency= $("#freq").val().trim();

        dataRef.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency:frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
          });
  });
