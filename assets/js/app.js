//Master object to be used to pull data from
var mainObject = [];

//Ajax call to Govtrack to push into master object
var queryURL = "https://www.govtrack.us/api/v2/role?current=true&limit=541"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var people = response.objects;
    //iterate through the object
    for (i=0; i<people.length; i++) {
      //Get image URL of image
      var arr = people[i].person.link;
      var slicy = arr.slice(-6)
      var imageURL = "https://www.govtrack.us/data/photos/" + slicy +".jpeg"
      // Push all relevant information to array
      var fName = people[i].person.firstname;
      var lName = people[i].person.lastname;
      var party = people[i].party;
      var gender = people[i].person.gender;
      var link = people[i].person.link;
      var image = imageURL;
      var nickname = people[i].person.nickname;
      var twitterID = people[i].person.twitterid;
      var youTubeID = people[i].person.youtubeid;
      var roleType = people[i].role_type_label;
      var state = people[i].state;
      var twitterFeed = 0;
      var congressMan = {
        firstName: fName, 
        lastName: lName, 
        party: party, 
        gender: gender, 
        link: link, 
        image: image, 
        nickname: nickname, 
        twitter: twitterID, 
        youtube: youTubeID, 
        role: roleType, 
        state: state
      }
      // Push 541 entries to main object
      mainObject.push(congressMan);
      }
      // console.log(mainObject[300]);
      // console.log(mainObject[300].firstName + " " + mainObject[300].lastName + " from " + mainObject[300].state);
      printAfter(mainObject);
  });

function printAfter(bigObject) { 
console.log("first element: " + bigObject[100].firstName);
};

function twitterFeedByUser(user, count) {

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
    "screen_name": user,
    "count": count
  },
   function (reply) {
    for (var i = reply.length - 1; i >= 0; i--) {
        console.log("Inside reply: ", reply[i].text);
        returnArray = reply[i].text;
      }
   },
   true // this parameter required
);
  console.log("Returning inside function: "+ returnArray);

}


var returnReply = twitterFeedByUser("trump",10);
console.log("return reply: "+ returnReply);

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
var dataRef = firebase.database();

//Master object which will contain every congressman
var mainObject = [];
//Master object which will contain emotional ranking in index order (NOT FINISHED)
var mainObjectTwo = [];

//Ajax call to Govtrack to push into master object
var queryURL = "https://www.govtrack.us/api/v2/role?current=true&limit=4"

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  var people = response.objects;
  //iterate through the object
  for (let i = 0; i < people.length; i++) {
    //Get image URL of image
    arr = people[i].person.link;
    var slicy = arr.slice(-6)
    var imageURL = "https://www.govtrack.us/data/photos/" + slicy + ".jpeg"
    // Push all relevant information to array
    fName = people[i].person.firstname;
    lName = people[i].person.lastname;
    party = people[i].party;
    gender = people[i].person.gender;
    link = people[i].person.link;
    image = imageURL;
    nickname = people[i].person.nickname;
    twitterID = people[i].person.twitterid;
    youTubeID = people[i].person.youtubeid;
    roleType = people[i].role_type_label;
    state = people[i].state;
    // Push 541 entries to main object (can minimize this code)
    mainObject.push({
      firstName: fName,
      lastName: lName,
      party: party,
      gender: gender,
      link: link,
      image: image,
      nickname: nickname,
      twitter: twitterID,
      youtube: youTubeID,
      role: roleType,
      state: state
    });
  }
  // Get images ready for ajax call to azure's emotion API
  $(function() {
    var objectTwo = []
    for (let j = 0; j < mainObject.length; j++) {
      getImage = mainObject[j].image

      // Call API
      var params = {};
      $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
        beforeSend: function(xhrObj) {
          xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "204fe6eb9a20402b9b0c6f997910b2ac");
        },
        type: "POST",
        data: `{"url": "${getImage}"}`,
        //Push response data (emotion rankings) to Firebase DB
      }).done(function(data) {
        mainObjectTwo.push(data)
        var emotion = data[0].scores;
        console.log(emotion)
        dataRef.ref().child('Emotions').push(emotion)
      })
    }
  });
  //Push congressman data to Firebase DB
  dataRef.ref().child('Congressman').push(mainObject)

});

/*
  console.log("why is this " + mainObject["0"])
  console.log(mainObject["0"].firstName + " " + mainObject["0"].lastName + " from " + mainObject["0"].state)

var queryURLTwo = "https://api-us.faceplusplus.com/facepp/v3/face/analyze"
var key = "gTJWVxi-B7ySv60XLZ1NYsp1lMcpBn6H"
var secret = "xHV4nyp09d_otLGH4b6fEQHttqVS7gQZ"

$.ajax({
  url: queryURLTwo + key + secret + $.param({ paramInQuery: 1 }),
  method: 'POST',
  data: {
    paramInBody: 2
  }
}).done(function(response) {
console.log(response)
});
*/
