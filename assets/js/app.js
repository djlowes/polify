
$.ajax({
    url:  "https://www.govtrack.us/api/v2/role?current=true",
    method: "GET"
  }).done(function(html) {
    var tree = $(html);
    console.log(tree)
    var page = tree.0.objects.0.person.link;
    var imgsrc = page.find(".img-responsive").attr("src");
    console.log(imgsrc)
    if (imgsrc) {
        $("#test").append(imgsrc)
    }
  });
