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
var queryURL = "https://www.govtrack.us/api/v2/role?current=true&limit=541"

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
      getImage = mainObject[32].image

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
        // CAN TRY AND JSON.PARSE and JSON.STRINGIFY INTO A NEW OBJECT OR MAIN.JSON FILE
        var emotion = data[0].scores;
        console.log(JSON.stringify(emotion));
        //localStorage.setItem(19, JSON.stringify(emotion));
        //dataRef.ref().child('Emotions2').push(mainObjectTwo)
      })

  });
  //Push congressman data to Firebase DB
  //dataRef.ref().child('Congressman').push(mainObject)

});
