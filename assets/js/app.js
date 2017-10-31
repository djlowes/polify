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


databaseRef.on("child_added", function(childSnapshot) {

  result = childSnapshot.val();
  // console.log(result);
  for (var i = result.length - 1; i >= 0; i--) {
    var name = result[i].firstName+" "+ result[i].lastName;
    // console.log("name: "+ name);
    _results.push(name);
  }
  // console.log("Results array: "+ _results);


  var document = window.document,
      $_window = $( window ),

      // _results = [
      //   'awesome',
      //   'bakery',
      //   'creator',
      //   'doritos',
      //   'efficient',
      //   'falafel',
      //   'great work',
      //   'high times',
      //   'idiom',
      //   'jargon',
      //   'krill',
      //   'lazy',
      //   'masters',
      //   'nope',
      //   'opacity',
      //   'purple rain',
      //   'quaint',
      //   'readability',
      //   'simpleton',
      //   'terrible',
      //   'umqua',
      //   'verocious',
      //   'waffles',
      //   'x-rays',
      //   'yard sale',
      //   'zappos'
      // ],

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

$("#submit-btn").on("click", function(event){
  event.preventDefault();
  sessionStorage.clear();

  // console.log("result val: "+ searchKey);
  
  var searchedArray = searchKey.split(" ");
  searchedFName = searchedArray[0];
  searchedLName = searchedArray[1];
  // console.log("Search key no spaces: "+ searchedFName + " " + searchedLName);

  sessionStorage.setItem("localFirstName", searchedFName);
  sessionStorage.setItem("localLastName", searchedLName);
  newWindow = window.open("politicianPage.html", "_self");

  // newWindow.onload = function(){
  //   console.log('renderPPage: '+ sessionStorage.getItem("searchKey"));
  //   $("#polDiv").text("Test: "+sessionStorage.getItem("searchKey"));
  // };

});


function renderPPage(){
  var fName = sessionStorage.getItem("localFirstName");
  var lName = sessionStorage.getItem("localLastName");
  console.log('renderPPage: '+ sessionStorage.getItem("localFirstName") + " " + sessionStorage.getItem("localLastName")); 
  $("#polDiv").text("Congressman: "+sessionStorage.getItem('localFirstName') +  " "  + sessionStorage.getItem('localLastName'));

  databaseRef.on("child_added", function(childSnapshot) {

    result = childSnapshot.val();
    // console.log(result);
    for (var i = result.length - 1; i >= 0; i--) {
      if(result[i].firstName == fName && result[i].lastName == lName) {
        var twitterid = result[i].twitter;
        twitterFeedByUser(twitterid);
        console.log("result image: "+ result[i].image);
        $("#politicianBioImage").attr("src", result[i].image);
        break;
      }
    }    
  });
};

function printing(){
  console.log("Printing: " +this.firstName + " "+ this.lastName);
  printAfter(this.firstName, this.lastName);
  return this.firstname;
};

function printAfter(firstname, lastname) { 
  console.log("Print After: " +firstname + " "+ lastname);
  return this.lastname;
};

function twitterFeedByUser(userID) {
  var funcTwitterID = this.twitter;
  console.log("calling twitter method: "+userID);
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
          console.log("Inside reply: ", reply[i].text);


          var tweetDiv = $("<div class='card-body float-left'>");
          tweetDiv.append(reply[i].text);
          $("#tweets").append(tweetDiv);

          returnArray = reply[i].text;
        }
     },
     true // this parameter required
  );
    return returnArray;
};


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
var angerLowestToHighest = [];
var contemptLowestToHighest = [];
var disgustLowestToHighest = [];
var fearLowestToHighest = [];
var happinessLowestToHighest = [];
var neutralLowestToHighest = [];
var sadnessLowestToHighest = [];
var surpriseLowestToHighest = [];

Array.prototype.sortBy = function(emotionA) {
  return this.slice(0).sort(function(a, b) {
    return (a[emotionA] > b[emotionA]) ? 1 : (a[emotionA] < b[emotionA]) ? -1 : 0;
  });
  //Push congressman data to Firebase DB
  // dataRef.ref().child('Congressman').push(mainObject)
};



// Push to Arrays
angerLowestToHighest.push(congressman.sortBy('anger').reverse());
contemptLowestToHighest.push(congressman.sortBy('contempt'));
disgustLowestToHighest.push(congressman.sortBy('disgust'));
fearLowestToHighest.push(congressman.sortBy('fear'));
happinessLowestToHighest.push(congressman.sortBy('happiness'));
neutralLowestToHighest.push(congressman.sortBy('neutral'));
sadnessLowestToHighest.push(congressman.sortBy('sadness'));
surpriseLowestToHighest.push(congressman.sortBy('surprise'));
// console.log(angerLowestToHighest)
//console.log(contemptLowestToHighest)
//console.log(happinessLowestToHighest)
//console.log(sadnessLowestToHighest)


function angerSort(a, b) {
  if (a.anger < b.anger)
    return -1;
  if (a.anger > b.anger)
    return 1;
  return 0;
}

// console.log(congressman.sortBy(angerSort).reverse());
//console.log(congressman.sort(angerSort));



//INSERT CHARTS BELOW


var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Males", "Females"],
    datasets: [{
      label: 'Fear - males vs females',
      data: [maleAveContempt(), femaleAveContempt()],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var ctx = document.getElementById("myChartTwo");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Males", "Females"],
    datasets: [{
      label: 'Fear - males vs females',
      data: [maleAveContempt(), femaleAveContempt()],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

});
