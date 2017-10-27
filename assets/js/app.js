$(document).ready(function() {
    displayLinks();
});

//Master object to be used to pull data from
var mainObject = []
//Ajax call to Govtrack to push into master object
function displayLinks() {
  var queryURL = "https://www.govtrack.us/api/v2/role?current=true&limit=541"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var people = response.objects;
    console.log(response.objects)
    //iterate through the object
    for (i=0; i<people.length; i++) {
      //Get image URL of image
      arr = people[i].person.link;
      var slicy = arr.slice(-6)
      var imageURL = "https://www.govtrack.us/data/photos/" + slicy +".jpeg"
      // Push all relevant information to array
      fName = people[i].person.firstname;
      lName = people[i].person.lastname;
      party = people[i].party;
      gender = people[i].person.gender;
      link = people[i].person.link;
      image = imageURL
      nickname = people[i].person.nickname;
      twitterID = people[i].person.twitterid;
      youTubeID = people[i].person.youtubeid;
      roleType = people[i].role_type_label;
      state = people[i].state;
      // Push 541 entries to main object
      mainObject.push({firstName: fName, lastName: lName, party: party, gender: gender, link: link, image: image, nickname: nickname, twitter: twitterID, youtube: youTubeID, role: roleType, state: state});
      }
      console.log(mainObject["0"])
      console.log(mainObject["0"].firstName + " " + mainObject["0"].lastName + " from " + mainObject["0"].state)
  });

  console.log("why is this " + mainObject["0"])
  console.log(mainObject["0"].firstName + " " + mainObject["0"].lastName + " from " + mainObject["0"].state)
}
