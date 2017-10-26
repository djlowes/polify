var mainObject = [
  {
  firstName: "",
  lastName: "",
  party: "",
  gender: "",
  link: "",
  imageURL: "",
  nickname: "",
  twitterID: "",
  youTubeID: "",
  roleType: "",
  state: "",
},
{
  firstName: "",
  lastName: "",
  party: "",
  gender: "",
  link: "",
  imageURL: "",
  nickname: "",
  twitterID: "",
  youTubeID: "",
  roleType: "",
  state: "",
},
]


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
      arr = people[i].person.link;
      var test = arr.slice(-6)
      console.log(test)
      //console.log(arr);
      //console.log(typeof arr);
      var imageURL = "https://www.govtrack.us/data/photos/" + test
      //console.log(imageURL)
  }
  });
}

// Step 1 - Slice the last 6 characters from the string
// Step 2 - Create a news tring with base url
// Step 3 - Concantanate the sliced characters with the Base url at    negative index 5.
//For example -
// https://www.govtrack.us/congress/members/wayne_allard/300003
// turns into -
// https://www.govtrack.us/data/photos/300003.jpeg
