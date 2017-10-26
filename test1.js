$(document).on("load", displayLinks);


function displayLinks () {
  var queryURL = "https://www.govtrack.us/api/v2/role?current=true&limit=541"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response)
    var people = response.objects
    for (i=0; i<people.length; i++) {
      arr = people[i].person.link
      console.log (arr);
  }
  });
}
