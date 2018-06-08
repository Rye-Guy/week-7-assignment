// Initialize Firebase
$(document).ready(function(){  

var config = {
    apiKey: "AIzaSyB1_Gj7PzxD2l-rGa4HY80-A74Gnv4BXLI",
    authDomain: "train-sechdule.firebaseapp.com",
    databaseURL: "https://train-sechdule.firebaseio.com",
    projectId: "train-sechdule",
    storageBucket: "",
    messagingSenderId: "305200297497"
  };
    firebase.initializeApp(config);

    var database = firebase.database();
    console.log(database);

    $("#submitBtn").on("click", function(){
//take values from inputs and pushing values to firebase
    var name = $("#nameArea").val().trim();
    var destination = $("#destinationArea").val().trim();
    var time = $("#timeArea").val().trim();
    var frequency = $("#frequencyArea").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        //firebase time stamp
        timeAdded: firebase.database.ServerValue.TIMESTAMP
    });
    
});

    //database reference that adds populates the current page with the correct infromation regarding the trains. 
    database.ref().on("child_added", function(childSnapshot){
            console.log(childSnapshot.val());
        var name = childSnapshot.val().name;
        var dest = childSnapshot.val().destination;
        var time = childSnapshot.val().time;
        var freq = childSnapshot.val().frequency;
    
        console.log("Name: " + name);
        console.log("Destination: " + dest);
        console.log("Time: " + time);
        console.log("Frequency: " + freq);
        //console.log(moment().format("HH:mm"));

  
    var freq = parseInt(freq);
    
	var currentTime = moment();

	var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');

	var trainTime = moment(dConverted).format('HH:mm');

	

	var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
	var tDifference = moment().diff(moment(tConverted), 'minutes');
	console.log("DIFFERENCE IN TIME: " + tDifference);
 
	var tRemainder = tDifference % freq;
	console.log("TIME REMAINING: " + tRemainder);

	var minsAway = freq - tRemainder;
	console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);

	var nextTrain = moment().add(minsAway, 'minutes');
	console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));

       

       

    $('#trainTable').append(
		"<tr><td id='name'>" + childSnapshot.val().name +
		"</td><td id='destination'>" + childSnapshot.val().destination +
		"</td><td id='frequency'>" + childSnapshot.val().frequency +
		"</td><td id='nextTrain'>" + moment(nextTrain).format("HH:mm") +
		"</td><td id='timeAway'>" + minsAway + ' minutes until arrival' + "</td></tr>");
    });



});