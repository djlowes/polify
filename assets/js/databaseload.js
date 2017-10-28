/*
var config = {
    apiKey: "AIzaSyAH498q5xfRdRITk_-cg4OlD50_4zRz5SU",
    authDomain: "jproject-f5600.firebaseapp.com",
    databaseURL: "https://jproject-f5600.firebaseio.com",
    projectId: "jproject-f5600",
    storageBucket: "jproject-f5600.appspot.com",
    messagingSenderId: "410141371595"
  };

firebase.initializeApp(config);
var dataRef = firebase.database();
*/

//Master object to be used to pull data from
var mainObject = []

//Ajax call to Govtrack to push into master object
var queryURL = "https://www.govtrack.us/api/v2/role?current=true&limit=5"

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  var people = response.objects;
  //iterate through the object
  for (i = 0; i < people.length; i++) {
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
    // Push 541 entries to main object
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

  $(function() {
    for (j = 0; j < mainObject.length; j++) {
      getImage = mainObject[j].image

      var params = {};
      $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
        beforeSend: function(xhrObj) {
          xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "204fe6eb9a20402b9b0c6f997910b2ac");
        },
        type: "POST",
        data: `{"url": "${getImage}"}`,
      }).done(function(data) {
        anger = people[i].person.firstname;
        contempt = people[i].person.lastname;
        disgust = people[i].party;
        fear = people[i].person.gender;
        happiness = people[i].person.link;
        neutral = people[i].person.link;
        sadness = people[i].person.link;

        console.log(data)
      })
    }
  });

  console.log(mainObject)

});
