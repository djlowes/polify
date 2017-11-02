//Firebase general config
var config = {
  apiKey: "AIzaSyAH498q5xfRdRITk_-cg4OlD50_4zRz5SU",
  authDomain: "jproject-f5600.firebaseapp.com",
  databaseURL: "https://jproject-f5600.firebaseio.com",
  projectId: "jproject-f5600",
  storageBucket: "jproject-f5600.appspot.com",
  messagingSenderId: "410141371595"
};

//Initialize Firebase
firebase.initializeApp(config);
var database = firebase.database();

var databaseRef = database.ref('polify/politicians');

// console.log("database: "+ database)
// console.log("databaseRef: "+ databaseRef);


var _results = [];
var searchKey;
var newWindow;
var searchKeyNoSpaces;
var searchedFName;
var searchedLName;
var congressmanOne = [];
var data;
var congressman = [];

var angerLowestToHighest = [];
var contemptLowestToHighest = [];
var disgustLowestToHighest = [];
var fearLowestToHighest = [];
var happinessLowestToHighest = [];
var neutralLowestToHighest = [];
var sadnessLowestToHighest = [];
var surpriseLowestToHighest = [];


$( document ).ready(function() {
    var intervalId = setInterval(main(),1000);
    console.log("intervalId: "+intervalId);
    console.log("test");
    // clearInterval(intervalId);

  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("firstName").on("child_added", function(snapshot) {
    var name = snapshot.val().firstName+" "+ snapshot.val().lastName;
    _results.push(name);
    congressman.push(snapshot.val());

    var document = window.document,
        $_window = $( window ),

          _rEscapeChars = /\/|\\|\.|\||\*|\&|\+|\(|\)|\[|\]|\?|\$|\^/g,
          _rMatch = /[A-Z]?[a-z]+|[0-9]+/g,

          _keys = [
          13,
          9
        ],

          _length = _results.length,

          $_result = $( '#result' ),
          $_search = $( '#search-bar' ),
          $_searchContainer = $( '#search-container' ),

          _resultPlaceholder = $_result.val();

    $_search.on( "keydown", function ( e ) {

      if ( _keys.indexOf( e.keyCode ) !== -1 ) {

        $_search.val( $_result.val() );

        return false;

      }

    }).on( "keyup", function () {

      var value = $_search.val().replace( _rEscapeChars, "" ),
          regex = new RegExp( "^"+value, "i" ),
          matches = [];


      if ( value ) {

        for ( var i = _length; i--; ) {

          if ( regex.test( _results[ i ] ) ) {

            matches.push( _results[ i ] );

          } else {

            $_result.val( "" );

          }

        }

        if ( matches.length ) {

          for ( var i = matches.length; i--; ) {

            $_result.val( matches[ i ] );

          }

        }

      } else {

        $_result.val( _resultPlaceholder );

      }

      searchKey = value;


    });
  });
});

$("#submit-btn").on("click", function(event){
  event.preventDefault();
  sessionStorage.clear();
  var searchedArray = searchKey.split(" ");
  searchedFName = searchedArray[0];
  searchedArray.splice(0,1);
  searchedLName = searchedArray.join(' ');
  sessionStorage.setItem("localFirstName", searchedFName);
  sessionStorage.setItem("localLastName", searchedLName);
  newWindow = window.open("politicianPage.html", "_self");

});

$("#subHeader").on("click", function(event){
  newWindow = window.open("index.html", "_self");

});

$("#logo").on("click", function(event){
  main(); 

});

function printStuff(){
  console.log("Print");
}


function renderPPage(){
  var fName = sessionStorage.getItem("localFirstName");
  var lName = sessionStorage.getItem("localLastName");
  $("#pol-info").text("Congressman: "+sessionStorage.getItem('localFirstName') +  " "  + sessionStorage.getItem('localLastName'));

  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("firstName").on("child_added", function(snapshot) {
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      twitterFeedByUser(snapshot.val().twitter);
      $("#politicianBioImage").attr("src", snapshot.val().image);
    }
  });


  //anger
  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("anger").on("child_added", function(snapshot) {
    angerLowestToHighest.push(snapshot.val());
    // angerLowestToHighest.reverse();
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      for (var i = angerLowestToHighest.length - 1; i >= 0; i--) {
        if (angerLowestToHighest[i].twitter == snapshot.val().twitter){
          $("#anger").text("is the "+ (i) + " in the anger ranking"  );
          $("#anger-img").attr("src", "assets/images/anger.png");
          break;
        }
      }
    }
  });

  //contemptLowestToHighest
  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("contempt").on("child_added", function(snapshot) {
    contemptLowestToHighest.push(snapshot.val());
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      for (var i = contemptLowestToHighest.length - 1; i >= 0; i--) {
        if (contemptLowestToHighest[i].twitter == snapshot.val().twitter){
          $("#contempt").text("is the "+ (i-1) + " in the contempt ranking");
          $("#contempt-img").attr("src", "assets/images/happy-8.png");
          break;
        }
      }
    }
  });

  //disgustLowestToHighest
  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("disgust").on("child_added", function(snapshot) {
    disgustLowestToHighest.push(snapshot.val());
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      for (var i = disgustLowestToHighest.length - 1; i >= 0; i--) {
        if (disgustLowestToHighest[i].twitter == snapshot.val().twitter){
          $("#disgust").text("is the "+ (i-1) + " in the disgust ranking");
          $("#disgust-img").attr("src", "assets/images/sadness.png");
          break;
        }
      }
    }
  });

  //fearLowestToHighest
  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("fear").on("child_added", function(snapshot) {
    fearLowestToHighest.push(snapshot.val());
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      for (var i = fearLowestToHighest.length - 1; i >= 0; i--) {
        if (fearLowestToHighest[i].twitter == snapshot.val().twitter){
          $("#fear").text("is the "+ (i-1) + " in the fear ranking");
          $("#fear-img").attr("src", "assets/images/sadness.png");
          break;
        }
      }
    }
  });

  //happinessLowestToHighest
  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("happiness").on("child_added", function(snapshot) {
    happinessLowestToHighest.push(snapshot.val());
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      for (var i = happinessLowestToHighest.length - 1; i >= 0; i--) {
        if (happinessLowestToHighest[i].twitter == snapshot.val().twitter){
          $("#happiness").text("is the "+ (i-1) + " in the happiness ranking");
          $("#happiness-img").attr("src", "assets/images/sadness.png");
          break;
        }
      }
    }
  });

  //neutralLowestToHighest
  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("neutral").on("child_added", function(snapshot) {
    neutralLowestToHighest.push(snapshot.val());
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      for (var i = neutralLowestToHighest.length - 1; i >= 0; i--) {
        if (neutralLowestToHighest[i].twitter == snapshot.val().twitter){
          $("#neutral").text("is the "+ (i-1) + " in the neutral ranking"  );
          $("#neutral-img").attr("src", "assets/images/sadness.png");
          break;
        }
      }
    }
  });

  //sadnessLowestToHighest
  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("sadness").on("child_added", function(snapshot) {
    sadnessLowestToHighest.push(snapshot.val());
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      for (var i = sadnessLowestToHighest.length - 1; i >= 0; i--) {
        if (sadnessLowestToHighest[i].twitter == snapshot.val().twitter){
          $("#sadness").text("is the "+ (i-1) + " in the sadness ranking"  );
          $("#sadness-img").attr("src", "assets/images/sadness.png");
          break;
        }
      }
    }
  });

  //surpriseLowestToHighest
  database.ref('polify/politicians/-Kxja5UAXHiGHxjAgrbs').orderByChild("surprise").on("child_added", function(snapshot) {
    surpriseLowestToHighest.push(snapshot.val());
    if(snapshot.val().firstName == fName && snapshot.val().lastName == lName) {
      for (var i = surpriseLowestToHighest.length - 1; i >= 0; i--) {
        if (surpriseLowestToHighest[i].twitter == snapshot.val().twitter){
          $("#surprise").text("is the "+ (i-1) + " in the surprise ranking"  );
          $("#surprise-img").attr("src", "assets/images/sadness.png");
          break;
        }
      }
    }
  });
};

function twitterFeedByUser(userID) {
  var funcTwitterID = this.twitter;
  var key = "8lout56tMiVPh719vYkz3KfRU";
  var secret = "Cf4Lg8TwWHOfiPgmnRg5SYJLObLvFIF7b881jUMgPQb54MaCqZ";
  var bearerToken = "AAAAAAAAAAAAAAAAAAAAADO%2F2wAAAAAAWrrzOYxSECQb7GLoA2eDvkaF5BE%3DQkBQjixouGv7kDleqtNIq2CMYPuLqtzxlbsGacJMQqSahhfn0a";
  var returnArray;

  var cb = new Codebird;
  cb.setConsumerKey(key, secret);
  cb.setBearerToken(bearerToken);

  cb.__call(
     "statuses_userTimeline",
    {
      "screen_name": userID,
      "count": 5
    },
    function (reply) {
      for (var i = reply.length - 1; i >= 0; i--) {
        var tweetDiv = $("<div class='card-body float-left'>");
        tweetDiv.append(reply[i].text);
        $("#tweets").append(tweetDiv);
      }
   },
   true // this parameter required
  );
};

setTimeout(main, 1000);

function main() {
  console.log("main runnning");


  function aveAnger() {
    for (let i = 0; i < congressman.length; i++) {
      let result = (math.sum(congressman[i].anger)) / congressman.length;
      let num = parseFloat(result).toFixed(20);
      return (num);
    }
  };

  function aveContempt() {
    for (let i = 0; i < congressman.length; i++) {
      let result = (math.sum(congressman[i].contempt)) / congressman.length;
      let num = parseFloat(result).toFixed(20);
      return (num);
    }
  };

  function aveDisgust() {
    for (let i = 0; i < congressman.length; i++) {
      let result = (math.sum(congressman[i].disgust)) / congressman.length;
      let num = parseFloat(result).toFixed(20);
      return (num);
    }
  };

  function aveFear() {
    for (let i = 0; i < congressman.length; i++) {
      let result = (math.sum(congressman[i].fear)) / congressman.length;
      let num = parseFloat(result).toFixed(20);
      return (num);
    }
  };

  function aveHappiness() {
    for (let i = 0; i < congressman.length; i++) {
      let result = (math.sum(congressman[i].happiness)) / congressman.length;
      let num = parseFloat(result).toFixed(20);
      return (num);
    }
  };

  function aveNeutral() {
    for (let i = 0; i < congressman.length; i++) {
      let result = (math.sum(congressman[i].neutral)) / congressman.length;
      let num = parseFloat(result).toFixed(20);
      return (num);
    }
  };

  function aveSadness() {
    for (let i = 0; i < congressman.length; i++) {
      let result = (math.sum(congressman[i].sadness)) / congressman.length;
      let num = parseFloat(result).toFixed(20);
      return (num);
    }
  };

  function aveSurprise() {
    for (let i = 0; i < congressman.length; i++) {
      let result = (math.sum(congressman[i].surprise)) / congressman.length;
      let num = parseFloat(result).toFixed(20);
      return (num);
    }
  };


  //BY GENDER

  function femaleAveAnger() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender == "female") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };


  function femaleAveContempt() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "female") {
        mathyOne.push(math.sum(congressman[i].contempt))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function femaleAveDisgust() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "female") {
        mathyOne.push(math.sum(congressman[i].disgust))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function femaleAveFear() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "female") {
        mathyOne.push(math.sum(congressman[i].fear))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function femaleAveHappiness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "female") {
        mathyOne.push(math.sum(congressman[i].happiness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function femaleAveNeutral() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "female") {
        mathyOne.push(math.sum(congressman[i].neutral))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function femaleAveSadness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "female") {
        mathyOne.push(math.sum(congressman[i].sadness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function femaleAveSurprise() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "female") {
        mathyOne.push(math.sum(congressman[i].surprise))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function maleAveAnger() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "male") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function maleAveContempt() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "male") {
        mathyOne.push(math.sum(congressman[i].contempt))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function maleAveDisgust() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "male") {
        mathyOne.push(math.sum(congressman[i].disgust))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function maleAveFear() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "male") {
        mathyOne.push(math.sum(congressman[i].fear))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function maleAveHappiness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "male") {
        mathyOne.push(math.sum(congressman[i].happiness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function maleAveNeutral() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "male") {
        mathyOne.push(math.sum(congressman[i].neutral))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function maleAveSadness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "male") {
        mathyOne.push(math.sum(congressman[i].sadness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };

  function maleAveSurprise() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].gender === "male") {
        mathyOne.push(math.sum(congressman[i].surprise))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return (result);
  };


  // BY POLITICAL PARTY

  function democratAnger() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Democrat") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function democratContempt() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Democrat") {
        mathyOne.push(math.sum(congressman[i].contempt))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  };

  function democratDisgust() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Democrat") {
        mathyOne.push(math.sum(congressman[i].disgust))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  };

  function democratFear() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Democrat") {
        mathyOne.push(math.sum(congressman[i].fear))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  };

  function democratHappiness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Democrat") {
        mathyOne.push(math.sum(congressman[i].happiness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  };

  function democratNeutral() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Democrat") {
        mathyOne.push(math.sum(congressman[i].neutral))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  };

  function democratSadness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Democrat") {
        mathyOne.push(math.sum(congressman[i].sadness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function democratSurprise() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Democrat") {
        mathyOne.push(math.sum(congressman[i].surprise))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function republicanAnger() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Republican") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function republicanContempt() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Republican") {
        mathyOne.push(math.sum(congressman[i].contempt))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function republicanDisgust() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Republican") {
        mathyOne.push(math.sum(congressman[i].disgust))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function republicanFear() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Republican") {
        mathyOne.push(math.sum(congressman[i].fear))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function republicanHappiness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Republican") {
        mathyOne.push(math.sum(congressman[i].happiness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function republicanNeutral() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Republican") {
        mathyOne.push(math.sum(congressman[i].neutral))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function republicanSadness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Republican") {
        mathyOne.push(math.sum(congressman[i].sadness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function republicanSurprise() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Republican") {
        mathyOne.push(math.sum(congressman[i].surprise))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function independentAnger() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Independent") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function independentContempt() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Independent") {
        mathyOne.push(math.sum(congressman[i].contempt))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function independentDisgust() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Independent") {
        mathyOne.push(math.sum(congressman[i].disgust))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function independentFear() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Independent") {
        mathyOne.push(math.sum(congressman[i].fear))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function independentHappiness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Independent") {
        mathyOne.push(math.sum(congressman[i].happiness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function independentNeutral() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Independent") {
        mathyOne.push(math.sum(congressman[i].neutral))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function independentSadness() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Independent") {
        mathyOne.push(math.sum(congressman[i].sadness))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };

  function independentSurprise() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].party === "Independent") {
        mathyOne.push(math.sum(congressman[i].surprise))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result;
  };




  //OVERALL RANKINGS FOR EACH EMOTION

  // Each array will be used to rank congressman on attributes from lowest to highest


  // Array.prototype.sortBy = function(emotionA) {
  //   return this.slice(0).sort(function(a, b) {
  //     return (a[emotionA] > b[emotionA]) ? 1 : (a[emotionA] < b[emotionA]) ? -1 : 0;
  //   });
  // };



  // // Push to Arrays
  // angerLowestToHighest.push(congressman.sortBy('anger').reverse());
  // contemptLowestToHighest.push(congressman.sortBy('contempt'));
  // disgustLowestToHighest.push(congressman.sortBy('disgust'));
  // fearLowestToHighest.push(congressman.sortBy('fear'));
  // happinessLowestToHighest.push(congressman.sortBy('happiness'));
  // neutralLowestToHighest.push(congressman.sortBy('neutral'));
  // sadnessLowestToHighest.push(congressman.sortBy('sadness'));
  // surpriseLowestToHighest.push(congressman.sortBy('surprise'));
  // console.log(angerLowestToHighest)
  // //console.log(contemptLowestToHighest)
  // //console.log(happinessLowestToHighest)
  // //console.log(sadnessLowestToHighest)


  // function angerSort(a, b) {
  //   if (a.anger < b.anger)
  //     return -1;
  //   if (a.anger > b.anger)
  //     return 1;
  //   return 0;
  // }

  // // console.log(congressman.sortBy(angerSort).reverse());
  // //console.log(congressman.sort(angerSort));



  //ANGRIEST BY STATE FOR HEATMAP
  //STATES, FOR HEATMAP

  //Angriest

  function AL() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "AL") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function AK() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "AK") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function AZ() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "AZ") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function AR() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "AR") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function CA() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "CA") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function CO() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "CO") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function CT() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "CT") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function DE() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "DE") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function FL() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "FL") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function GA() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "GA") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function HI() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "HI") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function ID() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "ID") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function IL() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "IL") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function IN() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "IN") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function IA() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "IA") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function KS() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "KS") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function KY() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "KY") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function LA() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "LA") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function ME() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "ME") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function MD() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "MD") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function MA() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "MA") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function MI() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "MI") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function MN() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "MN") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function MS() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "MS") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function MO() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "MO") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function MT() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "MT") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function NE() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "NE") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function NV() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "NV") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function NH() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "NH") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function NJ() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "NJ") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function NM() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "NM") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function NY() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "NY") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function NC() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "NC") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function ND() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "ND") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function OH() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "OH") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function OK() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "OK") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function OR() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "OR") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function PA() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "PA") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function RI() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "RI") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function SC() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "SC") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function SD() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "SD") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function TN() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "TN") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function TX() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "TX") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function UT() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "UT") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function VT() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "VT") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function VA() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "VA") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function WA() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "WA") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function WV() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "WV") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function WI() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "WI") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }

  function WY() {
    var mathyOne = [];
    var total = 0;
    for (let i = 0; i < congressman.length; i++) {
      if (congressman[i].state === "WY") {
        mathyOne.push(math.sum(congressman[i].anger))
      }
      for (let j = 0; j < mathyOne.length; j++) {
        total += mathyOne[j]
      }
      var result = total / mathyOne.length
    }
    return result
  }




  // //INSERT CHARTS BELOW


  // var ctx = document.getElementById("myChart");
  // var myChart = new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //     labels: ["Surprise", "Sadness", "Fear", "Anger", "Disgust", "Contempt"],
  //     datasets: [{
  //       label: 'Males',
  //       backgroundColor: 'rgba(54, 162, 235, 1)',
  //       data: [maleAveSurprise(), maleAveSadness(), maleAveFear(), maleAveAnger(), maleAveDisgust(), maleAveContempt()],
  //     }, {
  //       label: 'Females',
  //       backgroundColor: 'rgba(255,99,132,1)',
  //       data: [femaleAveSurprise(), femaleAveSadness(), femaleAveFear(), femaleAveAnger(), femaleAveDisgust(), femaleAveContempt()],
  //     }]
  //   }
  // });

  // var labels = {
  //   "Males": true,
  //   "Females": true
  // };
  //
  // var ctxTwo = document.getElementById("myChartTwo");
  // var myChartTwo = new Chart(ctxTwo, {
  //   type: 'bar',
  //   data: {
  //     labels: ["Males", "Females"],
  //     datasets: [{
  //       label: 'Fear - males vs females',
  //       data: [maleAveContempt(), femaleAveContempt()],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)'
  //       ],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     }
  //   }
  //
  // });



  //INSERT CHARTS BELOW
  //1. Bar chart - Males vs Females
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Surprise", "Sadness", "Fear", "Anger", "Disgust", "Contempt"],
      datasets: [{
        label: 'Males',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        data: [maleAveSurprise(), maleAveSadness(), maleAveFear(), maleAveAnger(), maleAveDisgust(), maleAveContempt()],
      }, {
        label: 'Females',
        backgroundColor: 'rgba(255,99,132,1)',
        data: [femaleAveSurprise(), femaleAveSadness(), femaleAveFear(), femaleAveAnger(), femaleAveDisgust(), femaleAveContempt()],
      }]
    }
  });
  var labels = {
    "Males": true,
    "Females": true
  };




  //2. Bar chart - Political parties
  var ctxTwo = document.getElementById("myChartTwo").getContext("2d");
  var data = {
    labels: ["Surprise", "Sadness", "Fear", "Anger", "Disgust", "Contempt"],
    datasets: [{
      label: "Republican",
      backgroundColor: "red",
      data: [republicanSurprise(), republicanSadness(), republicanFear(), republicanAnger(), republicanDisgust(), republicanContempt()]
    }, {
      label: "Democrat",
      backgroundColor: "blue",
      data: [democratSurprise(), democratSadness(), democratFear(), democratAnger(), democratDisgust(), democratContempt()]
    }, {
      label: "Independent",
      backgroundColor: "green",
      data: [independentSurprise(), independentSadness(), independentFear(), independentAnger(), independentDisgust(), independentContempt()]
    }]
  };
  var myChartTwo = new Chart(ctxTwo, {
    type: 'bar',
    data: data,
    options: {
      barValueSpacing: 20,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          }
        }]
      }
    }
  });
  var labels = {
    "Republicans": true,
    "Democrats": true,
    "Independents": true
  };




  //3. Pie Chart - all emotions
  var ctxThree = document.getElementById("myChartThree").getContext('2d');
  var myChartThree = new Chart(ctxThree, {
    type: 'doughnut',
    data: {
      labels: ["Surprise", "Sadness", "Anger", "Fear", "Disgust", "Neutral", "Contempt"],
      datasets: [{
        backgroundColor: [
          "#2ecc71",
          "#3498db",
          "#95a5a6",
          "#9b59b6",
          "#f1c40f",
          "#e74c3c",
          "#34495e"
        ],
        data: [aveSurprise(), aveSadness(), aveAnger(), aveFear(), aveDisgust(), aveNeutral(), aveContempt()]
      }]
    }
  });




  //4. Heatmap of Angriest State
  var map = AmCharts.makeChart( "myChartFour", {
    "type": "map",
    "theme": "none",
    "colorSteps": 20,

    "dataProvider": {
      "map": "usaLow",
      "areas": [ {
        "id": "US-AL",
        "value": AL()
      }, {
        "id": "US-AK",
        "value": AK()
      }, {
        "id": "US-AZ",
        "value": AZ()
      }, {
        "id": "US-AR",
        "value": AR()
      }, {
        "id": "US-CA",
        "value": CA()
      }, {
        "id": "US-CO",
        "value": CO()
      }, {
        "id": "US-CT",
        "value": CT()
      }, {
        "id": "US-DE",
        "value": DE()
      }, {
        "id": "US-FL",
        "value": FL()
      }, {
        "id": "US-GA",
        "value": GA()
      }, {
        "id": "US-HI",
        "value": HI()
      }, {
        "id": "US-ID",
        "value": ID()
      }, {
        "id": "US-IL",
        "value": IL()
      }, {
        "id": "US-IN",
        "value": IN()
      }, {
        "id": "US-IA",
        "value": IA()
      }, {
        "id": "US-KS",
        "value": .005
      }, {
        "id": "US-KY",
        "value": KY()
      }, {
        "id": "US-LA",
        "value": LA()
      }, {
        "id": "US-ME",
        "value": ME()
      }, {
        "id": "US-MD",
        "value": MD()
      }, {
        "id": "US-MA",
        "value": MA()
      }, {
        "id": "US-MI",
        "value": MI()
      }, {
        "id": "US-MN",
        "value": MN()
      }, {
        "id": "US-MS",
        "value": MS()
      }, {
        "id": "US-MO",
        "value": MO()
      }, {
        "id": "US-MT",
        "value": MT()
      }, {
        "id": "US-NE",
        "value": NE()
      }, {
        "id": "US-NV",
        "value": NV()
      }, {
        "id": "US-NH",
        "value": NH()
      }, {
        "id": "US-NJ",
        "value": NJ()
      }, {
        "id": "US-NM",
        "value": NM()
      }, {
        "id": "US-NY",
        "value": NY()
      }, {
        "id": "US-NC",
        "value": NC()
      }, {
        "id": "US-ND",
        "value": ND()
      }, {
        "id": "US-OH",
        "value": OH()
      }, {
        "id": "US-OK",
        "value": OK()
      }, {
        "id": "US-OR",
        "value": OR()
      }, {
        "id": "US-PA",
        "value": PA()
      }, {
        "id": "US-RI",
        "value": RI()
      }, {
        "id": "US-SC",
        "value": SC()
      }, {
        "id": "US-SD",
        "value": SD()
      }, {
        "id": "US-TN",
        "value": TN()
      }, {
        "id": "US-TX",
        "value": TX()
      }, {
        "id": "US-UT",
        "value": UT()
      }, {
        "id": "US-VT",
        "value": .005
      }, {
        "id": "US-VA",
        "value": .009
      }, {
        "id": "US-WA",
        "value": WA()
      }, {
        "id": "US-WV",
        "value": WV()
      }, {
        "id": "US-WI",
        "value": WI()
      }, {
        "id": "US-WY",
        "value": WY()
      } ]
    },

    "areasSettings": {
      "autoZoom": true
    },

    "valueLegend": {
      "right": 10,
      "minValue": 0,
      "maxValue": 1
    },

    "export": {
      "enabled": true
    }

  } );


  // function fearA() {
  //   fearArray = [];
  //   for (let i =0; i<congressman.length; i++) {
  //     fearArray.push(congressman[i].fear)
  //   }
  //   return fearArray
  // }
  // console.log(fearA())
  //
  // function surpriseA() {
  //   surpriseArray = [];
  //   for (let i =0; i<congressman.length; i++) {
  //     surpriseArray.push(congressman[i].surprise)
  //   }
  //   return surpriseArray
  // }
  // console.log(surpriseA())
  // var concatenatedArray = surpriseArray.concat(fearArray);
  // console.log(concatenatedArray)



  //5.. Fear vs Surprise
  new Chart(document.getElementById("myChartFive"), {
      type: 'bubble',
      data: {
        labels: "",
        datasets: [
          {
            label: ["Female Republican"],
            backgroundColor: "#D9B5B5",
            borderColor: "#5C3E3E",
            data: [{
              x: 0.4,
              y: 0.8,
              r: 24
            }]
          }, {
            label: ["Male Republican"],
            backgroundColor: "#C16E6E",
            borderColor: "#461010",
            data: [{
              x: 0.2,
              y: 0.3,
              r: 16
            }]
          }, {
            label: ["Female Democrat"],
            backgroundColor: "#CEE2FD",
            borderColor: "#495B73",
            data: [{
              x: 0.8,
              y: 0.8,
              r: 44
            }]
          }, {
            label: ["Male Democrat"],
            backgroundColor: "#93BDF7",
            borderColor: "#1144AB",
            data: [{
              x: 0.3,
              y: 0.7,
              r: 32
            }]
          },
          {
            label: ["Female Independent"],
            backgroundColor: "#C6D9B5",
            borderColor: "#3C6A13",
            data: [{
              x: 0.9,
              y: 0.9,
              r: 52
            }]
          },
          {
            label: ["Male Independent"],
            backgroundColor: "#A18DBF",
            borderColor: "#35136A",
            data: [{
              x: 0.4,
              y: 0.3,
              r: 28
            }]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Relationship of fear and surprise by political party and gender'
        }, scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Surprise"
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Fear"
            }
          }]
        }
      }
  });



  //6. Pie Chart - all emotions
  var ctxThree = document.getElementById("myChartSix").getContext('2d');
  var myChartThree = new Chart(ctxThree, {
    type: 'pie',
    data: {
      labels: ["Republican Sadness", "Democrat Sadness", "Independent Sdaness"],
      datasets: [{
        backgroundColor: [
          "#803123",
          "#3F4F72",
          "#275F34"
        ],
        data: [republicanSadness(), democratSadness(), independentSadness()]
      }]
    }
  });

}