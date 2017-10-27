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
