 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyDG3mwcMcY-cA_gsFoPYX_zT8xNi15zAAk",
     authDomain: "train-schedule-72113.firebaseapp.com",
     databaseURL: "https://train-schedule-72113.firebaseio.com",
     projectId: "train-schedule-72113",
     storageBucket: "train-schedule-72113.appspot.com",
     messagingSenderId: "283016164400",
     appId: "1:283016164400:web:20a9122d6d4b47fe"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 var database = firebase.database();

 var tbody = $('#table-body')
 var tableRow = $('<tr>')
 var td = $('<td>')

 $('#submit').on('click', function () {
     event.preventDefault()
     var name = $("#train-name-input").val().trim()
     var destination = $('#destination').val().trim()
     var firstTrainTime = $('#first-time').val().trim()
     var frequency = $('#frequency').val().trim()
     var momentFirstTrainTime = moment(firstTrainTime, 'HH:mm').subtract(1, 'years')
     var diffTime = moment().diff(moment(momentFirstTrainTime), 'minutes')
     console.log('diffTime: ' + diffTime)
     var tRemainder = diffTime % frequency
     console.log('tRemainder: ' + tRemainder)
     var minutesUntilTrain = frequency - tRemainder

     database.ref().push({
         name: name,
         destination: destination,
         firstTrainTime: firstTrainTime,
         frequency: frequency,
         minutesUntilTrain: minutesUntilTrain,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     })

   
 })
 database.ref().on('child_added', function (snapshot) {
    var sv = snapshot.val()


    tbody.append('<tr><td>' + sv.name + '</td><td>' + sv.destination + '</td><td>' + sv.firstTrainTime + '</td><td>' + sv.frequency + '</td><td>' + sv.minutesUntilTrain + '</td></tr>')
})
