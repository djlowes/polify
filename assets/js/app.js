$(document).ready(function() {
    displayLinks();
});

function displayLinks() {
  var queryURL = "https://www.govtrack.us/api/v2/role?current=true&limit=541"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var people = response.objects;
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
      roleType = people[i].person.link;
      state = people[i].person.state;

      obTest = [{firstName: fName, lastName: lName, party: party, gender: gender, link: link, image: image, nickname: nickname, twitter: twitterID, youtube: youTubeID, role: roleType, state: state}];
      mainObject.push(obTest)
      console.log(typeof obTest)
      console.log(mainObject)
      }
  });
}
