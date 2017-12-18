//------------------------------------------------------------------
//Display name logic for the search bar
//------------------------------------------------------------------
var search = $(document).ready(function() {
  var termsOne = [];
  for (var i = 0; i < congressman.length; i++) {
    termsOne.push(congressman[i].firstName + " " + congressman[i].lastName);
  }
  var $terms = termsOne.sort(),
    $return = [];
  console.log($terms)

  function strInArray(str, strArray) {
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j].match(str) && $return.length < 5) {
        var $h = strArray[j].replace(str, '<strong>' + str + '</strong>');
        $return.push('<li class="prediction-item"><span class="prediction-text">' + $h + '</span></li>');
      }
    }
  }

  function nextItem(kp) {
    if ($('.focus').length > 0) {
      var $next = $('.focus').next(),
        $prev = $('.focus').prev();
    }
    if (kp == 38) { // Up
      if ($('.focus').is(':first-child')) {
        $prev = $('.prediction-item:last-child');
      }
      $('.prediction-item').removeClass('focus');
      $prev.addClass('focus');
    } else if (kp == 40) { // Down
      if ($('.focus').is(':last-child')) {
        $next = $('.prediction-item:first-child');
      }
      $('.prediction-item').removeClass('focus');
      $next.addClass('focus');
    }
  }

  $(function() {
    $('#search-bar').keydown(function(e) {
      $key = e.keyCode;
      if ($key == 38 || $key == 40) {
        nextItem($key);
        return;
      }
      setTimeout(function() {
        var $search = $('#search-bar').val();
        if ($search) {
          var toUpper = $search.charAt(0).toUpperCase() + $search.slice(1);
        }
        $return = [];
        strInArray(toUpper, $terms);
        if ($search == '' || !$('input').val) {
          $('.output').html('').slideUp();
        } else {
          $('.output').html($return).slideDown();
        }
        $('.prediction-item').on('click', function() {
          $text = $(this).find('span').text();
          $('.output').slideUp(function() {
            $(this).html('');
          });
          $('#search-bar').val($text);
        });
        $('.prediction-item:first-child').addClass('focus');

      }, 50);
    });
  });

  $('#search-bar').focus(function() {
    if ($('.prediction-item').length > 0) {
      $('.output').slideDown();
    }
    $('#searchform').submit(function(e) {
      e.preventDefault();
      $text = $('.focus').find('span').text();
      $('.output').slideUp();
      $('#search-bar').val($text);
      $('input').blur();
    });
  });

  $('#search-bar').blur(function() {
    if ($('.prediction-item').length > 0) {
      $('.output').slideUp();
    }
  });


  //------------------------------------------------------------------
  //Charts - need to wait for DOM to load before executing so wrapped in docReady
  //------------------------------------------------------------------

  // 1. Bar chart - Males vs Females
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Surprise", "Sadness", "Fear", "Anger", "Disgust", "Contempt"],
      datasets: [{
        label: 'Males',
        borderColor: 'rgba(54, 160, 235, 1)',
        backgroundColor: 'rgba(179, 220, 247, 1)',
        borderWidth: 1,
        data: [maleAveSurprise(), maleAveSadness(), maleAveFear(), maleAveAnger(), maleAveDisgust(), maleAveContempt()],
      }, {
        label: 'Females',
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,95,132,5)',
        borderWidth: 1,
        data: [femaleAveSurprise(), femaleAveSadness(), femaleAveFear(), femaleAveAnger(), femaleAveDisgust(), femaleAveContempt()],
      }]
    }
  });

  // 4. Females (zoomed in)
  var ctxFour = document.getElementById("myChartFour").getContext('2d');
  var chartFour = new Chart(ctxFour, {
    type: 'bar',
    data: {
      labels: ["Surprise", "Sadness", "Fear", "Anger", "Disgust", "Contempt"],
      datasets: [{
        label: 'Females',
        backgroundColor: 'rgba(255,223,230,1)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: [femaleAveSurprise(), femaleAveSadness(), femaleAveFear(), femaleAveAnger(), femaleAveDisgust(), femaleAveContempt()],
      }]
    }
  });

  //2. Bar chart - Political parties
  var ctxTwo = document.getElementById("myChartTwo").getContext("2d");
  var data = {
    labels: ["Surprise", "Sadness", "Fear", "Anger", "Disgust", "Contempt"],
    datasets: [{
      label: "Republican",
      backgroundColor: "red",
      data: [republicanSurprise(), republicanSadness(), republicanFear(), republicanAnger(), republicanDisgust(), republicanContempt()]
    }, {
      label: "Democrat",
      backgroundColor: "blue",
      data: [democratSurprise(), democratSadness(), democratFear(), democratAnger(), democratDisgust(), democratContempt()]
    }, {
      label: "Independent",
      backgroundColor: "green",
      data: [independentSurprise(), independentSadness(), independentFear(), independentAnger(), independentDisgust(), independentContempt()]
    }]
  };
  var myChartTwo = new Chart(ctxTwo, {
    type: 'bar',
    data: data,
    options: {
      barValueSpacing: 20,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          }
        }]
      }
    }
  });


  //3. Pie Chart - all emotions
  var ctxThree = document.getElementById("myChartThree").getContext('2d');
  var myChartThree = new Chart(ctxThree, {
    type: 'doughnut',
    data: {
      labels: ["Surprise", "Sadness", "Anger", "Fear", "Disgust", "Neutral", "Contempt"],
      datasets: [{
        backgroundColor: [
          "#2ecc71",
          "#3498db",
          "#95a5a6",
          "#9b59b6",
          "#f1c40f",
          "#e74c3c",
          "#34495e"
        ],
        data: [aveSurprise(), aveSadness(), aveAnger(), aveFear(), aveDisgust(), aveNeutral(), aveContempt()]
      }]
    }
  });

  // 5. Heatmap of Angriest State
  var map = AmCharts.makeChart("myChartSeven", {
    "type": "map",
    "theme": "none",
    "colorSteps": 50,
    "responsive": {
      "enabled": true
    },
    "dataProvider": {
      "map": "usaLow",
      "areas": [{
        "id": "US-AL",
        "value": AL()
      }, {
        "id": "US-AK",
        "value": AK()
      }, {
        "id": "US-AZ",
        "value": AZ()
      }, {
        "id": "US-AR",
        "value": AR()
      }, {
        "id": "US-CA",
        "value": CA()
      }, {
        "id": "US-CO",
        "value": CO()
      }, {
        "id": "US-CT",
        "value": CT()
      }, {
        "id": "US-DE",
        "value": DE()
      }, {
        "id": "US-FL",
        "value": FL()
      }, {
        "id": "US-GA",
        "value": GA()
      }, {
        "id": "US-HI",
        "value": HI()
      }, {
        "id": "US-ID",
        "value": ID()
      }, {
        "id": "US-IL",
        "value": IL()
      }, {
        "id": "US-IN",
        "value": IN()
      }, {
        "id": "US-IA",
        "value": IA()
      }, {
        "id": "US-KY",
        "value": KY()
      }, {
        "id": "US-LA",
        "value": LA()
      }, {
        "id": "US-ME",
        "value": ME()
      }, {
        "id": "US-MD",
        "value": MD()
      }, {
        "id": "US-MA",
        "value": MA()
      }, {
        "id": "US-MI",
        "value": MI()
      }, {
        "id": "US-MN",
        "value": MN()
      }, {
        "id": "US-MS",
        "value": MS()
      }, {
        "id": "US-MO",
        "value": MO()
      }, {
        "id": "US-MT",
        "value": MT()
      }, {
        "id": "US-NE",
        "value": NE()
      }, {
        "id": "US-NV",
        "value": NV()
      }, {
        "id": "US-NH",
        "value": NH()
      }, {
        "id": "US-NJ",
        "value": NJ()
      }, {
        "id": "US-NM",
        "value": NM()
      }, {
        "id": "US-NY",
        "value": NY()
      }, {
        "id": "US-NC",
        "value": NC()
      }, {
        "id": "US-ND",
        "value": ND()
      }, {
        "id": "US-OH",
        "value": OH()
      }, {
        "id": "US-OK",
        "value": OK()
      }, {
        "id": "US-OR",
        "value": OR()
      }, {
        "id": "US-PA",
        "value": PA()
      }, {
        "id": "US-RI",
        "value": RI()
      }, {
        "id": "US-SC",
        "value": SC()
      }, {
        "id": "US-SD",
        "value": SD()
      }, {
        "id": "US-TN",
        "value": TN()
      }, {
        "id": "US-TX",
        "value": TX()
      }, {
        "id": "US-UT",
        "value": UT()
      }, {
        "id": "US-VT",
        "value": VT()
      }, {
        "id": "US-VA",
        "value": VA()
      }, {
        "id": "US-WA",
        "value": WA()
      }, {
        "id": "US-WI",
        "value": WI()
      }, {
        "id": "US-WY",
        "value": WY()
      }]
    },

    "areasSettings": {
      "autoZoom": true
    },

    "valueLegend": {
      "right": 10,
      "minValue": 0,
      "maxValue": 1
    },

    "export": {
      "enabled": true
    }

  });


  //5.. Fear vs Surprise
  // new Chart(document.getElementById("myChartFive"), {
  //     type: 'bubble',
  //     data: {
  //       labels: "",
  //       datasets: [
  //         {
  //           label: ["Female Republican"],
  //           backgroundColor: "#D9B5B5",
  //           borderColor: "#5C3E3E",
  //           data: [{
  //             x: 0.4,
  //             y: 0.8,
  //             r: 24
  //           }]
  //         }, {
  //           label: ["Male Republican"],
  //           backgroundColor: "#C16E6E",
  //           borderColor: "#461010",
  //           data: [{
  //             x: 0.2,
  //             y: 0.3,
  //             r: 16
  //           }]
  //         }, {
  //           label: ["Female Democrat"],
  //           backgroundColor: "#CEE2FD",
  //           borderColor: "#495B73",
  //           data: [{
  //             x: 0.8,
  //             y: 0.8,
  //             r: 44
  //           }]
  //         }, {
  //           label: ["Male Democrat"],
  //           backgroundColor: "#93BDF7",
  //           borderColor: "#1144AB",
  //           data: [{
  //             x: 0.3,
  //             y: 0.7,
  //             r: 32
  //           }]
  //         },
  //         {
  //           label: ["Female Independent"],
  //           backgroundColor: "#C6D9B5",
  //           borderColor: "#3C6A13",
  //           data: [{
  //             x: 0.9,
  //             y: 0.9,
  //             r: 52
  //           }]
  //         },
  //         {
  //           label: ["Male Independent"],
  //           backgroundColor: "#A18DBF",
  //           borderColor: "#35136A",
  //           data: [{
  //             x: 0.4,
  //             y: 0.3,
  //             r: 28
  //           }]
  //         }
  //       ]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: 'Relationship of fear and surprise by political party and gender'
  //       }, scales: {
  //         yAxes: [{
  //           scaleLabel: {
  //             display: true,
  //             labelString: "Surprise"
  //           }
  //         }],
  //         xAxes: [{
  //           scaleLabel: {
  //             display: true,
  //             labelString: "Fear"
  //           }
  //         }]
  //       }
  //     }
  // });
  //
  //
  //
  // //6. Pie Chart - all emotions
  // var ctxThree = document.getElementById("myChartSix").getContext('2d');
  // var myChartThree = new Chart(ctxThree, {
  //   type: 'pie',
  //   data: {
  //     labels: ["Republican Sadness", "Democrat Sadness", "Independent Sdaness"],
  //     datasets: [{
  //       backgroundColor: [
  //         "#803123",
  //         "#3F4F72",
  //         "#275F34"
  //       ],
  //       data: [republicanSadness(), democratSadness(), independentSadness()]
  //     }]
  //   }
  // });

  $("#submit-btn").on("click", function() {
    var name = $("#search-bar").val()
    for (var i = 0; i < congressman.length; i++) {
      if (name === congressman[i].firstName + " " + congressman[i].lastName) {
        console.log(congressman[i])
        var image = document.createElement("IMG");
        image.alt = (congressman[i].party + " " + congressman[i].role + " " + congressman[i].firstName + " " + congressman[i].lastName);
        image.src = congressman[i].image;
        image.width = "200";
        image.height = "200";
        $("#photo").html(image);
        $("#myModalLabel").html(congressman[i].firstName + " " + congressman[i].lastName);

        for (var j = 0; j < angerHighest.length; j++) {
          var angerRank = angerHighest.findIndex(function(name) {
            name === angerHighest[j].firstName + " " + angerHighest[j].lastName
          });
          console.log(angerRank)
        }
      }
    }
  });



});

//------------------------------------------------------------------
//Locally stored JSON of congressman for fast retrieval
//------------------------------------------------------------------

var congressman = [{
  "firstName": "Tammy",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400013.jpeg",
  "lastName": "Baldwin",
  "link": "https://www.govtrack.us/congress/members/tammy_baldwin/400013",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "WI",
  "twitter": "SenatorBaldwin",
  "youtube": "witammybaldwin",
  "anger": 1.37111322e-10,
  "contempt": 3.42323067e-12,
  "disgust": 4.16918944e-10,
  "fear": 1.78931772e-12,
  "happiness": 1,
  "neutral": 3.302795e-11,
  "sadness": 3.26464e-11,
  "surprise": 2.024396e-10

}, {
  "firstName": "Sherrod",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400050.jpeg",
  "lastName": "Brown",
  "link": "https://www.govtrack.us/congress/members/sherrod_brown/400050",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "OH",
  "twitter": "SenSherrodBrown",
  "youtube": "SherrodBrownOhio",
  "anger": 4.61189877e-8,
  "contempt": 2.15087823e-7,
  "disgust": 0.00000161346793,
  "fear": 5.529768e-10,
  "happiness": 0.9999954,
  "neutral": 0.00000248718584,
  "sadness": 2.47360646e-7,
  "surprise": 9.186944e-9

}, {
  "firstName": "Benjamin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400064.jpeg",
  "lastName": "Cardin",
  "link": "https://www.govtrack.us/congress/members/benjamin_cardin/400064",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "MD",
  "twitter": "SenatorCardin",
  "youtube": "senatorcardin",
  "anger": 0.000179368581,
  "contempt": 1.55135623e-7,
  "disgust": 0.0000634821,
  "fear": 2.4657993e-7,
  "happiness": 0.999748647,
  "neutral": 1.54811062e-7,
  "sadness": 3.67992158e-7,
  "surprise": 0.00000757757653

}, {
  "firstName": "Jeff",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400134.jpeg",
  "lastName": "Flake",
  "link": "https://www.govtrack.us/congress/members/jeff_flake/400134",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "AZ",
  "twitter": "JeffFlake",
  "youtube": "flakeoffice",
  "anger": 0.00000454803831,
  "contempt": 2.602379e-7,
  "disgust": 0.000004868382,
  "fear": 3.87068866e-8,
  "happiness": 0.99998194,
  "neutral": 0.000006863267,
  "sadness": 2.62331863e-8,
  "surprise": 0.00000143392344

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400272.jpeg",
  "lastName": "Menéndez",
  "link": "https://www.govtrack.us/congress/members/robert_menendez/400272",
  "nickname": "Bob",
  "party": "Democrat",
  "role": "Senator",
  "state": "NJ",
  "twitter": "SenatorMenendez",
  "youtube": "SenatorMenendezNJ",
  "anger": 2.486892e-7,
  "contempt": 2.82422718e-7,
  "disgust": 0.0000019079605,
  "fear": 2.11541479e-10,
  "happiness": 0.9999636,
  "neutral": 0.0000338235368,
  "sadness": 1.11293687e-7,
  "surprise": 2.58681556e-8

}, {
  "firstName": "Bernard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400357.jpeg",
  "lastName": "Sanders",
  "link": "https://www.govtrack.us/congress/members/bernard_sanders/400357",
  "nickname": "Bernie",
  "party": "Independent",
  "role": "Senator",
  "state": "VT",
  "twitter": "SenSanders",
  "youtube": "senatorsanders",
  "anger": 0.000009531123,
  "contempt": 0.0000044303215,
  "disgust": 0.00002365599,
  "fear": 2.71279976e-8,
  "happiness": 0.9997305,
  "neutral": 0.000229134952,
  "sadness": 0.00000140132977,
  "surprise": 0.00000127886847

}, {
  "firstName": "Maria",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/300018.jpeg",
  "lastName": "Cantwell",
  "link": "https://www.govtrack.us/congress/members/maria_cantwell/300018",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "WA",
  "twitter": "SenatorCantwell",
  "youtube": "SenatorCantwell",
  "anger": 0.00000378583854,
  "contempt": 0.0000422296725,
  "disgust": 0.0000972410853,
  "fear": 1.01313749e-8,
  "happiness": 0.9984203,
  "neutral": 0.00142942159,
  "sadness": 8.29382657e-7,
  "surprise": 0.00000618580452

}, {
  "firstName": "Thomas",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300019.jpeg",
  "lastName": "Carper",
  "link": "https://www.govtrack.us/congress/members/thomas_carper/300019",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "DE",
  "twitter": "SenatorCarper",
  "youtube": "senatorcarper",
  "anger": 0.00013336222,
  "contempt": 0.0000153843866,
  "disgust": 0.00002803984,
  "fear": 1.1721059e-7,
  "happiness": 0.9995612,
  "neutral": 0.0002593866,
  "sadness": 5.750587e-7,
  "surprise": 0.00000196021529

}, {
  "firstName": "Dianne",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/300043.jpeg",
  "lastName": "Feinstein",
  "link": "https://www.govtrack.us/congress/members/dianne_feinstein/300043",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "CA",
  "twitter": "SenFeinstein",
  "youtube": "SenatorFeinstein",
  "anger": 3.57775858e-11,
  "contempt": 5.33372771e-13,
  "disgust": 1.84982567e-11,
  "fear": 5.510493e-14,
  "happiness": 1,
  "neutral": 1.228377e-12,
  "sadness": 4.25499649e-14,
  "surprise": 8.4641176e-11

}, {
  "firstName": "Orrin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300052.jpeg",
  "lastName": "Hatch",
  "link": "https://www.govtrack.us/congress/members/orrin_hatch/300052",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "UT",
  "twitter": "SenOrrinHatch",
  "youtube": "SenatorOrrinHatch",
  "anger": 0.0005078375,
  "contempt": 0.009861879,
  "disgust": 0.000237217377,
  "fear": 0.0000111162617,
  "happiness": 0.14680858,
  "neutral": 0.8407557,
  "sadness": 0.000670174253,
  "surprise": 0.00114751363

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300078.jpeg",
  "lastName": "Nelson",
  "link": "https://www.govtrack.us/congress/members/bill_nelson/300078",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "FL",
  "twitter": "SenBillNelson",
  "youtube": "senbillnelson",
  "anger": 2.32222362e-7,
  "contempt": 1.46646262e-9,
  "disgust": 1.1290318e-7,
  "fear": 2.84708e-9,
  "happiness": 0.999999464,
  "neutral": 4.87267968e-8,
  "sadness": 1.15770735e-8,
  "surprise": 1.432734e-7

}, {
  "firstName": "Debbie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/300093.jpeg",
  "lastName": "Stabenow",
  "link": "https://www.govtrack.us/congress/members/debbie_stabenow/300093",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "MI",
  "twitter": "SenStabenow",
  "youtube": "senatorstabenow",
  "anger": 0.00000267254427,
  "contempt": 0.0000232276288,
  "disgust": 0.000005483914,
  "fear": 3.69297652e-7,
  "happiness": 0.9993058,
  "neutral": 0.000609593757,
  "sadness": 0.0000498374357,
  "surprise": 0.000003010226

}, {
  "firstName": "Christopher",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412194.jpeg",
  "lastName": "Murphy",
  "link": "https://www.govtrack.us/congress/members/christopher_murphy/412194",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "CT",
  "twitter": "senmurphyoffice",
  "youtube": "senchrismurphy",
  "anger": 1.5220606e-11,
  "contempt": 2.68412625e-13,
  "disgust": 1.38735412e-11,
  "fear": 3.38159383e-12,
  "happiness": 1,
  "neutral": 9.744853e-11,
  "sadness": 4.494213e-11,
  "surprise": 7.530788e-10

}, {
  "firstName": "Mazie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412200.jpeg",
  "lastName": "Hirono",
  "link": "https://www.govtrack.us/congress/members/mazie_hirono/412200",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "HI",
  "twitter": "MazieHirono",
  "youtube": "CongresswomanHirono",
  "anger": 9.268714e-11,
  "contempt": 3.13482075e-12,
  "disgust": 1.49179669e-10,
  "fear": 1.34310992e-13,
  "happiness": 1,
  "neutral": 4.53504378e-12,
  "sadness": 1.11623419e-11,
  "surprise": 1.33854441e-10

}, {
  "firstName": "Joe",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412205.jpeg",
  "lastName": "Donnelly",
  "link": "https://www.govtrack.us/congress/members/joe_donnelly/412205",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "IN",
  "twitter": "SenDonnelly",
  "youtube": "sendonnelly",
  "anger": 3.12741548e-7,
  "contempt": 0.00000693403263,
  "disgust": 0.00000566170274,
  "fear": 5.487562e-10,
  "happiness": 0.9996599,
  "neutral": 0.000325949135,
  "sadness": 0.00000106747325,
  "surprise": 1.71440149e-7


}, {
  "firstName": "Dean",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412218.jpeg",
  "lastName": "Heller",
  "link": "https://www.govtrack.us/congress/members/dean_heller/412218",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "NV",
  "twitter": "SenDeanHeller",
  "youtube": "SenDeanHeller",
  "anger": 2.51467043e-8,
  "contempt": 8.10862655e-10,
  "disgust": 1.02916839e-8,
  "fear": 1.03065928e-12,
  "happiness": 0.99999994,
  "neutral": 4.00271566e-10,
  "sadness": 2.03623918e-9,
  "surprise": 5.97131344e-10

}, {
  "firstName": "Kirsten",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412223.jpeg",
  "lastName": "Gillibrand",
  "link": "https://www.govtrack.us/congress/members/kirsten_gillibrand/412223",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "NY",
  "twitter": "SenGillibrand",
  "youtube": "KirstenEGillibrand",
  "anger": 5.903925e-11,
  "contempt": 2.133961e-8,
  "disgust": 8.668775e-10,
  "fear": 1.21671716e-13,
  "happiness": 0.999999762,
  "neutral": 2.14770637e-7,
  "sadness": 1.710228e-11,
  "surprise": 2.08813211e-9

}, {
  "firstName": "Amy",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412242.jpeg",
  "lastName": "Klobuchar",
  "link": "https://www.govtrack.us/congress/members/amy_klobuchar/412242",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "MN",
  "youtube": "senatorklobuchar",
  "anger": 0.000761778967,
  "contempt": 1.42136471e-7,
  "disgust": 0.0000801122442,
  "fear": 4.632682e-7,
  "happiness": 0.999149,
  "neutral": 1.48488553e-7,
  "sadness": 0.000006460567,
  "surprise": 0.00000184642761

}, {
  "firstName": "Claire",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412243.jpeg",
  "lastName": "McCaskill",
  "link": "https://www.govtrack.us/congress/members/claire_mccaskill/412243",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "MO",
  "twitter": "McCaskillOffice",
  "youtube": "SenatorMcCaskill",
  "anger": 1.70378267e-10,
  "contempt": 1.1274727e-10,
  "disgust": 4.75934847e-10,
  "fear": 1.547396e-14,
  "happiness": 1,
  "neutral": 8.258212e-11,
  "sadness": 1.80424509e-13,
  "surprise": 9.25730048e-11

}, {
  "firstName": "Jon",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412244.jpeg",
  "lastName": "Tester",
  "link": "https://www.govtrack.us/congress/members/jon_tester/412244",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "MT",
  "twitter": "SenatorTester",
  "youtube": "senatorjontester",
  "anger": 2.39406472e-9,
  "contempt": 1.02023261e-8,
  "disgust": 4.97011428e-8,
  "fear": 2.66814836e-14,
  "happiness": 0.99999994,
  "neutral": 1.68799286e-8,
  "sadness": 1.402145e-11,
  "surprise": 5.529856e-10

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412246.jpeg",
  "lastName": "Casey",
  "link": "https://www.govtrack.us/congress/members/robert_casey/412246",
  "nickname": "Bob",
  "party": "Democrat",
  "role": "Senator",
  "state": "PA",
  "twitter": "SenBobCasey",
  "youtube": "SenatorBobCasey",
  "anger": 1.36448657e-8,
  "contempt": 6.700989e-7,
  "disgust": 1.59319082e-8,
  "fear": 3.80183732e-11,
  "happiness": 0.999998868,
  "neutral": 4.249459e-7,
  "sadness": 4.43132642e-9,
  "surprise": 1.14067966e-9
}, {
  "firstName": "Sheldon",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412247.jpeg",
  "lastName": "Whitehouse",
  "link": "https://www.govtrack.us/congress/members/sheldon_whitehouse/412247",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "RI",
  "twitter": "SenWhitehouse",
  "youtube": "SenatorWhitehouse",
  "anger": 7.813406e-10,
  "contempt": 0.00000279699339,
  "disgust": 1.13653229e-8,
  "fear": 6.015082e-12,
  "happiness": 0.9999608,
  "neutral": 0.0000364039261,
  "sadness": 1.80857533e-8,
  "surprise": 9.103772e-9

}, {
  "firstName": "Bob",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412248.jpeg",
  "lastName": "Corker",
  "link": "https://www.govtrack.us/congress/members/bob_corker/412248",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "TN",
  "twitter": "SenBobCorker",
  "youtube": "senatorcorker",
  "anger": 0.0005010939,
  "contempt": 0.0199793372,
  "disgust": 0.00158422079,
  "fear": 0.000009807509,
  "happiness": 0.6750932,
  "neutral": 0.301170647,
  "sadness": 0.00159411272,
  "surprise": 0.00006760917

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412251.jpeg",
  "lastName": "Barrasso",
  "link": "https://www.govtrack.us/congress/members/john_barrasso/412251",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "WY",
  "twitter": "SenJohnBarrasso",
  "youtube": "barrassowyo",
  "anger": 0.00006730059,
  "contempt": 0.00000206596019,
  "disgust": 0.00003621203,
  "fear": 2.03370352e-8,
  "happiness": 0.999794841,
  "neutral": 0.00009887519,
  "sadness": 4.957529e-7,
  "surprise": 1.92143716e-7

}, {
  "firstName": "Martin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412281.jpeg",
  "lastName": "Heinrich",
  "link": "https://www.govtrack.us/congress/members/martin_heinrich/412281",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "NM",
  "twitter": "MartinHeinrich",
  "youtube": "SenMartinHeinrich",
  "anger": 0.0000139991,
  "contempt": 0.00102484785,
  "disgust": 0.0000026758396,
  "fear": 7.19002458e-7,
  "happiness": 0.00773071,
  "neutral": 0.9909904,
  "sadness": 0.0000121999892,
  "surprise": 0.000224418371

}, {
  "firstName": "Joe",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412391.jpeg",
  "lastName": "Manchin",
  "link": "https://www.govtrack.us/congress/members/joe_manchin/412391",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "WV",
  "twitter": "Sen_JoeManchin",
  "youtube": "SenatorJoeManchin",
  "anger": 0.005885466,
  "contempt": 0.00226340839,
  "disgust": 0.00487714773,
  "fear": 0.00000583618157,
  "happiness": 0.9137853,
  "neutral": 0.07294366,
  "sadness": 0.0000474616936,
  "surprise": 0.000191718791

}, {
  "firstName": "Elizabeth",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412542.jpeg",
  "lastName": "Warren",
  "link": "https://www.govtrack.us/congress/members/elizabeth_warren/412542",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "MA",
  "twitter": "SenWarren",
  "youtube": "senelizabethwarren",
  "anger": 0.0000435773363,
  "contempt": 8.80403e-7,
  "disgust": 0.000232522521,
  "fear": 8.325914e-9,
  "happiness": 0.999683738,
  "neutral": 0.0000376653079,
  "sadness": 2.474251e-7,
  "surprise": 0.0000013902029

}, {
  "firstName": "Angus",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412545.jpeg",
  "lastName": "King",
  "link": "https://www.govtrack.us/congress/members/angus_king/412545",
  "nickname": "",
  "party": "Independent",
  "role": "Senator",
  "state": "ME",
  "twitter": "SenAngusKing",
  "youtube": "SenatorAngusKing",
  "anger": 0.000149242842,
  "contempt": 0.00008484451,
  "disgust": 0.0008752529,
  "fear": 9.164006e-7,
  "happiness": 0.9970525,
  "neutral": 0.000550566067,
  "sadness": 0.00128090556,
  "surprise": 0.00000576197

}, {
  "firstName": "Heidi",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412554.jpeg",
  "lastName": "Heitkamp",
  "link": "https://www.govtrack.us/congress/members/heidi_heitkamp/412554",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "ND",
  "twitter": "SenatorHeitkamp",
  "youtube": "senatorheidiheitkamp",
  "anger": 1.01250556e-7,
  "contempt": 6.72967726e-9,
  "disgust": 1.88440723e-7,
  "fear": 2.06903609e-11,
  "happiness": 0.999999464,
  "neutral": 1.92864576e-7,
  "sadness": 6.730338e-11,
  "surprise": 3.96462028e-8

}, {
  "firstName": "Deb",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412556.jpeg",
  "lastName": "Fischer",
  "link": "https://www.govtrack.us/congress/members/deb_fischer/412556",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "NE",
  "twitter": "SenatorFischer",
  "youtube": "senatordebfischer",
  "anger": 0.000284171547,
  "contempt": 0.000132394242,
  "disgust": 0.00133899751,
  "fear": 0.0000148303852,
  "happiness": 0.997440934,
  "neutral": 0.0005596366,
  "sadness": 0.0000936256838,
  "surprise": 0.000135399008

}, {
  "firstName": "Ted",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412573.jpeg",
  "lastName": "Cruz",
  "link": "https://www.govtrack.us/congress/members/ted_cruz/412573",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "TX",
  "twitter": "SenTedCruz",
  "youtube": "sentedcruz",
  "anger": 6.069506e-8,
  "contempt": 6.008714e-7,
  "disgust": 0.00000206937671,
  "fear": 1.86877361e-10,
  "happiness": 0.999946058,
  "neutral": 0.000049831142,
  "sadness": 0.00000130558772,
  "surprise": 5.753424e-8


}, {
  "firstName": "Timothy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412582.jpeg",
  "lastName": "Kaine",
  "link": "https://www.govtrack.us/congress/members/timothy_kaine/412582",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "VA",
  "twitter": "SenKaineOffice",
  "youtube": "SenatorTimKaine",
  "anger": 5.772608e-10,
  "contempt": 0.00000202997,
  "disgust": 1.61068259e-9,
  "fear": 6.619984e-13,
  "happiness": 0.999150634,
  "neutral": 0.0008472878,
  "sadness": 8.717866e-10,
  "surprise": 2.30172965e-8

}, {
  "firstName": "Roger",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400432.jpeg",
  "lastName": "Wicker",
  "link": "https://www.govtrack.us/congress/members/roger_wicker/400432",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "MS",
  "twitter": "SenatorWicker",
  "youtube": "SenatorWicker",
  "anger": 2.06972411e-10,
  "contempt": 8.88387461e-8,
  "disgust": 5.691264e-9,
  "fear": 8.86942646e-13,
  "happiness": 0.9999996,
  "neutral": 3.20872715e-7,
  "sadness": 1.300047e-9,
  "surprise": 1.5143472e-9

}, {
  "firstName": "Lamar",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300002.jpeg",
  "lastName": "Alexander",
  "link": "https://www.govtrack.us/congress/members/lamar_alexander/300002",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "TN",
  "twitter": "SenAlexander",
  "youtube": "lamaralexander",
  "anger": 0.00007091775,
  "contempt": 7.467404e-7,
  "disgust": 0.0000221086848,
  "fear": 2.653095e-7,
  "happiness": 0.9998031,
  "neutral": 0.00006813774,
  "sadness": 0.0000337548263,
  "surprise": 9.546147e-7

}, {
  "firstName": "Thad",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300023.jpeg",
  "lastName": "Cochran",
  "link": "https://www.govtrack.us/congress/members/thad_cochran/300023",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "MS",
  "twitter": "SenThadCochran",
  "youtube": "sencochran",
  "anger": 2.88888957e-9,
  "contempt": 3.38409762e-8,
  "disgust": 2.909961e-8,
  "fear": 8.811446e-12,
  "happiness": 0.9999942,
  "neutral": 0.000005731461,
  "sadness": 2.51935939e-9,
  "surprise": 4.02535649e-9

}, {
  "firstName": "Susan",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/300025.jpeg",
  "lastName": "Collins",
  "link": "https://www.govtrack.us/congress/members/susan_collins/300025",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "ME",
  "twitter": "SenatorCollins",
  "youtube": "SenatorSusanCollins",
  "anger": 3.57185559e-10,
  "contempt": 3.684026e-12,
  "disgust": 3.53168539e-9,
  "fear": 2.129719e-13,
  "happiness": 1,
  "neutral": 1.95331355e-11,
  "sadness": 2.575921e-11,
  "surprise": 3.03641751e-10

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300027.jpeg",
  "lastName": "Cornyn",
  "link": "https://www.govtrack.us/congress/members/john_cornyn/300027",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "TX",
  "twitter": "JohnCornyn",
  "youtube": "senjohncornyn",
  "anger": 1.38352066e-10,
  "contempt": 2.082768e-8,
  "disgust": 1.90510341e-9,
  "fear": 4.079903e-14,
  "happiness": 0.9999982,
  "neutral": 0.00000177864922,
  "sadness": 1.60844851e-10,
  "surprise": 1.10589593e-9

}, {
  "firstName": "Richard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300038.jpeg",
  "lastName": "Durbin",
  "link": "https://www.govtrack.us/congress/members/richard_durbin/300038",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "IL",
  "twitter": "SenatorDurbin",
  "youtube": "SenatorDurbin",
  "anger": 4.72595119e-8,
  "contempt": 1.00796157e-7,
  "disgust": 3.5552597e-7,
  "fear": 2.71251632e-10,
  "happiness": 0.9999361,
  "neutral": 0.0000630411159,
  "sadness": 2.79750452e-7,
  "surprise": 9.087955e-8

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300041.jpeg",
  "lastName": "Enzi",
  "link": "https://www.govtrack.us/congress/members/michael_enzi/300041",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "WY",
  "twitter": "SenatorEnzi",
  "youtube": "senatorenzi",
  "anger": 0.000716020237,
  "contempt": 0.000409407221,
  "disgust": 0.000639085367,
  "fear": 9.637866e-7,
  "happiness": 0.988996565,
  "neutral": 0.00899044,
  "sadness": 0.000112289425,
  "surprise": 0.000135256123

}, {
  "firstName": "Lindsey",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300047.jpeg",
  "lastName": "Graham",
  "link": "https://www.govtrack.us/congress/members/lindsey_graham/300047",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "SC",
  "twitter": "GrahamBlog",
  "youtube": "USSenLindseyGraham",
  "anger": 0.000004416827,
  "contempt": 4.31608925e-7,
  "disgust": 0.00003728591,
  "fear": 1.45556775e-10,
  "happiness": 0.99995476,
  "neutral": 0.00000299249882,
  "sadness": 5.34620836e-9,
  "surprise": 9.45688043e-8

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300055.jpeg",
  "lastName": "Inhofe",
  "link": "https://www.govtrack.us/congress/members/james_inhofe/300055",
  "nickname": "Jim",
  "party": "Republican",
  "role": "Senator",
  "state": "OK",
  "twitter": "InhofePress",
  "youtube": "jiminhofepressoffice",
  "anger": 0.000036198795,
  "contempt": 6.37882067e-7,
  "disgust": 0.0001330644,
  "fear": 2.93169961e-7,
  "happiness": 0.999606669,
  "neutral": 0.0000240247173,
  "sadness": 0.000196558176,
  "surprise": 0.00000252846075

}, {
  "firstName": "Mitch",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300072.jpeg",
  "lastName": "McConnell",
  "link": "https://www.govtrack.us/congress/members/mitch_mcconnell/300072",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "KY",
  "twitter": "McConnellPress",
  "anger": 0.0000491814862,
  "contempt": 0.0007494209,
  "disgust": 0.00008133967,
  "fear": 0.00000402357864,
  "happiness": 0.9436522,
  "neutral": 0.05484298,
  "sadness": 0.000344184838,
  "surprise": 0.0002766642

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300081.jpeg",
  "lastName": "Reed",
  "link": "https://www.govtrack.us/congress/members/john_reed/300081",
  "nickname": "Jack",
  "party": "Democrat",
  "role": "Senator",
  "state": "RI",
  "twitter": "SenJackReed",
  "youtube": "SenatorReed",
  "anger": 0.00000208480787,
  "contempt": 0.0007460056,
  "disgust": 0.000003238574,
  "fear": 1.303875e-7,
  "happiness": 0.8163199,
  "neutral": 0.182899475,
  "sadness": 0.0000269821612,
  "surprise": 0.00000217145339

}, {
  "firstName": "Pat",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300083.jpeg",
  "lastName": "Roberts",
  "link": "https://www.govtrack.us/congress/members/pat_roberts/300083",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "KS",
  "twitter": "SenPatRoberts",
  "youtube": "SenPatRoberts",
  "anger": 0.0134303374,
  "contempt": 0.0242572166,
  "disgust": 0.0062773,
  "fear": 0.0000755443543,
  "happiness": 0.174091384,
  "neutral": 0.773354,
  "sadness": 0.00563622639,
  "surprise": 0.002877981

}, {
  "firstName": "Shelley",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400061.jpeg",
  "lastName": "Capito",
  "link": "https://www.govtrack.us/congress/members/shelley_capito/400061",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "WV",
  "twitter": "SenCapito",
  "anger": 2.26963778e-11,
  "contempt": 1.54971327e-12,
  "disgust": 1.6035678e-11,
  "fear": 3.870669e-16,
  "happiness": 1,
  "neutral": 5.236536e-12,
  "sadness": 1.64611949e-15,
  "surprise": 2.38219219e-11

}, {
  "firstName": "Edward",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400253.jpeg",
  "lastName": "Markey",
  "link": "https://www.govtrack.us/congress/members/edward_markey/400253",
  "nickname": "Ed",
  "party": "Democrat",
  "role": "Senator",
  "state": "MA",
  "twitter": "SenMarkey",
  "youtube": "RepMarkey",
  "anger": 0.00000444549323,
  "contempt": 0.002810579,
  "disgust": 0.0000327700254,
  "fear": 0.000001200349,
  "happiness": 0.9323391,
  "neutral": 0.06439633,
  "sadness": 0.0000400342869,
  "surprise": 0.000375587872

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400413.jpeg",
  "lastName": "Udall",
  "link": "https://www.govtrack.us/congress/members/tom_udall/400413",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "NM",
  "twitter": "SenatorTomUdall",
  "youtube": "senatortomudall",
  "anger": 0.0000012524572,
  "contempt": 0.000345156557,
  "disgust": 0.0000101449759,
  "fear": 3.27532234e-7,
  "happiness": 0.9665825,
  "neutral": 0.03298678,
  "sadness": 0.00002138894,
  "surprise": 0.000052443178

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412269.jpeg",
  "lastName": "Cassidy",
  "link": "https://www.govtrack.us/congress/members/bill_cassidy/412269",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "LA",
  "youtube": "SenatorBillCassidy",
  "anger": 4.13775458e-10,
  "contempt": 1.83704232e-10,
  "disgust": 6.78188949e-10,
  "fear": 5.55200243e-12,
  "happiness": 1,
  "neutral": 1.98441641e-9,
  "sadness": 1.22366867e-10,
  "surprise": 6.4938e-11

}, {
  "firstName": "Gary",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412305.jpeg",
  "lastName": "Peters",
  "link": "https://www.govtrack.us/congress/members/gary_peters/412305",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "MI",
  "twitter": "SenGaryPeters",
  "youtube": "RepGaryPeters",
  "anger": 0.00014840829,
  "contempt": 0.0000167544222,
  "disgust": 0.0004562821,
  "fear": 1.36954741e-8,
  "happiness": 0.99911803,
  "neutral": 0.000247523771,
  "sadness": 0.0000119528986,
  "surprise": 0.00000105067045

}, {
  "firstName": "Mark",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412321.jpeg",
  "lastName": "Warner",
  "link": "https://www.govtrack.us/congress/members/mark_warner/412321",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "VA",
  "twitter": "MarkWarner",
  "youtube": "SenatorMarkWarner",
  "anger": 0.00015459719,
  "contempt": 0.000223847048,
  "disgust": 0.00434932159,
  "fear": 5.071253e-7,
  "happiness": 0.988626,
  "neutral": 0.00654652528,
  "sadness": 0.00009447723,
  "surprise": 0.00000473912633

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412322.jpeg",
  "lastName": "Risch",
  "link": "https://www.govtrack.us/congress/members/james_risch/412322",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "ID",
  "twitter": "SenatorRisch",
  "youtube": "SenatorJamesRisch",
  "anger": 3.51371519e-8,
  "contempt": 0.00000182886936,
  "disgust": 1.57890028e-7,
  "fear": 2.51175081e-9,
  "happiness": 0.9991881,
  "neutral": 0.000808942248,
  "sadness": 5.84883e-7,
  "surprise": 2.968671e-7

}, {
  "firstName": "Jeanne",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412323.jpeg",
  "lastName": "Shaheen",
  "link": "https://www.govtrack.us/congress/members/jeanne_shaheen/412323",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "NH",
  "twitter": "SenatorShaheen",
  "youtube": "senatorshaheen",
  "anger": 0.000005787634,
  "contempt": 1.51707813e-9,
  "disgust": 0.00000101525336,
  "fear": 3.07886583e-9,
  "happiness": 0.999993145,
  "neutral": 1.87799123e-10,
  "sadness": 1.64389813e-9,
  "surprise": 6.84694044e-8

}, {
  "firstName": "Jeff",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412325.jpeg",
  "lastName": "Merkley",
  "link": "https://www.govtrack.us/congress/members/jeff_merkley/412325",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "OR",
  "twitter": "SenJeffMerkley",
  "youtube": "SenatorJeffMerkley",
  "anger": 3.02066683e-9,
  "contempt": 6.54096368e-7,
  "disgust": 4.82546767e-8,
  "fear": 8.122225e-12,
  "happiness": 0.999971449,
  "neutral": 0.0000277544859,
  "sadness": 9.61353844e-11,
  "surprise": 9.331078e-8

}, {
  "firstName": "Alan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412378.jpeg",
  "lastName": "Franken",
  "link": "https://www.govtrack.us/congress/members/alan_franken/412378",
  "nickname": "Al",
  "party": "Democrat",
  "role": "Senator",
  "state": "MN",
  "twitter": "SenFranken",
  "youtube": "SenatorFranken",
  "anger": 3.052183e-8,
  "contempt": 0.00006240468,
  "disgust": 6.24902555e-7,
  "fear": 1.32100483e-10,
  "happiness": 0.9885525,
  "neutral": 0.0113830417,
  "sadness": 0.0000013491757,
  "surprise": 4.15559072e-8

}, {
  "firstName": "Chris",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412390.jpeg",
  "lastName": "Coons",
  "link": "https://www.govtrack.us/congress/members/chris_coons/412390",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "DE",
  "twitter": "SenCoonsOffice",
  "youtube": "senatorchriscoons",
  "anger": 0.00528060971,
  "contempt": 0.002497635,
  "disgust": 0.00124664174,
  "fear": 4.1681627e-8,
  "happiness": 0.0178618245,
  "neutral": 0.9729011,
  "sadness": 0.0002048202,
  "surprise": 0.00000729328576

}, {
  "firstName": "Cory",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412406.jpeg",
  "lastName": "Gardner",
  "link": "https://www.govtrack.us/congress/members/cory_gardner/412406",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "CO",
  "twitter": "SenCoryGardner",
  "anger": 2.76898383e-11,
  "contempt": 1.08062853e-12,
  "disgust": 1.07031578e-10,
  "fear": 1.80598819e-12,
  "happiness": 1,
  "neutral": 1.47329787e-10,
  "sadness": 2.95085e-13,
  "surprise": 2.39923037e-9

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412508.jpeg",
  "lastName": "Cotton",
  "link": "https://www.govtrack.us/congress/members/tom_cotton/412508",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "AR",
  "twitter": "SenTomCotton",
  "youtube": "RepTomCotton",
  "anger": 2.79126535e-8,
  "contempt": 5.5122463e-8,
  "disgust": 2.96433527e-8,
  "fear": 2.02966643e-10,
  "happiness": 0.9999889,
  "neutral": 0.0000109401972,
  "sadness": 7.37794137e-9,
  "surprise": 5.53031754e-8

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412549.jpeg",
  "lastName": "Daines",
  "link": "https://www.govtrack.us/congress/members/steve_daines/412549",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "MT",
  "twitter": "SteveDaines",
  "youtube": "SteveDainesMT",
  "anger": 4.789235e-9,
  "contempt": 1.82557933e-8,
  "disgust": 1.47449617e-8,
  "fear": 1.22380743e-11,
  "happiness": 0.999999464,
  "neutral": 4.794138e-7,
  "sadness": 1.8739528e-10,
  "surprise": 5.25834043e-9

}, {
  "firstName": "Cory",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412598.jpeg",
  "lastName": "Booker",
  "link": "https://www.govtrack.us/congress/members/cory_booker/412598",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "NJ",
  "twitter": "SenBooker",
  "youtube": "SenCoryBooker",
  "anger": 1.01715694e-8,
  "contempt": 2.611371e-7,
  "disgust": 0.000001078476,
  "fear": 6.612901e-12,
  "happiness": 0.9999943,
  "neutral": 0.00000432031447,
  "sadness": 1.92295513e-9,
  "surprise": 2.78184658e-8

}, {
  "firstName": "Dan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412665.jpeg",
  "lastName": "Sullivan",
  "link": "https://www.govtrack.us/congress/members/dan_sullivan/412665",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "AK",
  "twitter": "SenDanSullivan",
  "anger": 0.0000227496384,
  "contempt": 0.0000236624237,
  "disgust": 0.00009543071,
  "fear": 9.324464e-8,
  "happiness": 0.997678161,
  "neutral": 0.002162267,
  "sadness": 0.000008644742,
  "surprise": 0.000009001496

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412666.jpeg",
  "lastName": "Perdue",
  "link": "https://www.govtrack.us/congress/members/david_perdue/412666",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "GA",
  "twitter": "sendavidperdue",
  "anger": 1.91107389e-7,
  "contempt": 2.10389e-7,
  "disgust": 0.00000129465263,
  "fear": 4.585798e-12,
  "happiness": 0.999998152,
  "neutral": 1.67148457e-7,
  "sadness": 3.312356e-9,
  "surprise": 4.12013784e-10

}, {
  "firstName": "Joni",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412667.jpeg",
  "lastName": "Ernst",
  "link": "https://www.govtrack.us/congress/members/joni_ernst/412667",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "IA",
  "twitter": "SenJoniErnst",
  "anger": 1.73612946e-8,
  "contempt": 4.162451e-10,
  "disgust": 9.638319e-8,
  "fear": 4.731251e-11,
  "happiness": 0.9999999,
  "neutral": 6.680723e-9,
  "sadness": 7.53932056e-11,
  "surprise": 1.40536e-8

}, {
  "firstName": "Thom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412668.jpeg",
  "lastName": "Tillis",
  "link": "https://www.govtrack.us/congress/members/thom_tillis/412668",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "NC",
  "twitter": "senthomtillis",
  "anger": 0.000001108229,
  "contempt": 3.834132e-7,
  "disgust": 0.000006391275,
  "fear": 1.2625051e-10,
  "happiness": 0.9999907,
  "neutral": 0.00000140121062,
  "sadness": 7.95961252e-9,
  "surprise": 2.3146228e-8

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412669.jpeg",
  "lastName": "Rounds",
  "link": "https://www.govtrack.us/congress/members/mike_rounds/412669",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "SD",
  "twitter": "SenatorRounds",
  "anger": 1.6631451e-12,
  "contempt": 3.447642e-14,
  "disgust": 2.39456475e-11,
  "fear": 1.20698783e-18,
  "happiness": 1,
  "neutral": 1.869696e-12,
  "sadness": 2.61378972e-13,
  "surprise": 3.43346736e-14

}, {
  "firstName": "Benjamin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412671.jpeg",
  "lastName": "Sasse",
  "link": "https://www.govtrack.us/congress/members/benjamin_sasse/412671",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "NE",
  "twitter": "SenSasse",
  "anger": 4.82460871e-9,
  "contempt": 1.67528325e-10,
  "disgust": 2.85415087e-8,
  "fear": 7.13184557e-13,
  "happiness": 0.99999994,
  "neutral": 5.33140145e-8,
  "sadness": 5.62948126e-12,
  "surprise": 1.27562216e-9

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300030.jpeg",
  "lastName": "Crapo",
  "link": "https://www.govtrack.us/congress/members/michael_crapo/300030",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "ID",
  "twitter": "MikeCrapo",
  "youtube": "senatorcrapo",
  "anger": 3.783903e-8,
  "contempt": 2.547621e-9,
  "disgust": 4.828679e-7,
  "fear": 2.2583567e-11,
  "happiness": 0.9999991,
  "neutral": 3.32336128e-7,
  "sadness": 1.02784536e-8,
  "surprise": 2.284753e-9

}, {
  "firstName": "Charles",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300048.jpeg",
  "lastName": "Grassley",
  "link": "https://www.govtrack.us/congress/members/charles_grassley/300048",
  "nickname": "Chuck",
  "party": "Republican",
  "role": "Senator",
  "state": "IA",
  "twitter": "ChuckGrassley",
  "youtube": "senchuckgrassley",
  "anger": 4.895709e-8,
  "contempt": 2.35825137e-9,
  "disgust": 3.78304065e-7,
  "fear": 5.844604e-13,
  "happiness": 0.9999996,
  "neutral": 2.6970115e-9,
  "sadness": 1.347212e-9,
  "surprise": 4.381539e-10

}, {
  "firstName": "Patrick",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300065.jpeg",
  "lastName": "Leahy",
  "link": "https://www.govtrack.us/congress/members/patrick_leahy/300065",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "VT",
  "twitter": "SenatorLeahy",
  "youtube": "SenatorPatrickLeahy",
  "anger": 0.1310871,
  "contempt": 0.09501616,
  "disgust": 0.0352992676,
  "fear": 0.000437468552,
  "happiness": 0.03309693,
  "neutral": 0.6462041,
  "sadness": 0.0545540564,
  "surprise": 0.00430489751

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300071.jpeg",
  "lastName": "McCain",
  "link": "https://www.govtrack.us/congress/members/john_mccain/300071",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "AZ",
  "twitter": "SenJohnMcCain",
  "youtube": "SenatorJohnMcCain",
  "anger": 0.00000111132772,
  "contempt": 0.00000192829862,
  "disgust": 0.00000377989272,
  "fear": 4.158048e-10,
  "happiness": 0.99995625,
  "neutral": 0.0000367747525,
  "sadness": 1.15655e-7,
  "surprise": 6.241952e-8

}, {
  "firstName": "Lisa",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/300075.jpeg",
  "lastName": "Murkowski",
  "link": "https://www.govtrack.us/congress/members/lisa_murkowski/300075",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "AK",
  "twitter": "LisaMurkowski",
  "youtube": "senatormurkowski",
  "anger": 1.70585182e-8,
  "contempt": 5.186046e-10,
  "disgust": 2.31750718e-7,
  "fear": 1.89215532e-10,
  "happiness": 0.999999642,
  "neutral": 8.512666e-8,
  "sadness": 4.854663e-9,
  "surprise": 2.28122836e-8

}, {
  "firstName": "Patty",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/300076.jpeg",
  "lastName": "Murray",
  "link": "https://www.govtrack.us/congress/members/patty_murray/300076",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "WA",
  "twitter": "PattyMurray",
  "youtube": "SenatorPattyMurray",
  "anger": 3.47709062e-8,
  "contempt": 4.72431267e-8,
  "disgust": 1.70356344e-7,
  "fear": 1.87755089e-11,
  "happiness": 0.999999464,
  "neutral": 2.915033e-7,
  "sadness": 2.03034323e-9,
  "surprise": 1.01764339e-8

}, {
  "firstName": "Charles",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300087.jpeg",
  "lastName": "Schumer",
  "link": "https://www.govtrack.us/congress/members/charles_schumer/300087",
  "nickname": "Chuck",
  "party": "Democrat",
  "role": "Senator",
  "state": "NY",
  "twitter": "SenSchumer",
  "youtube": "SenatorSchumer",
  "anger": 3.843448e-9,
  "contempt": 2.48725018e-9,
  "disgust": 1.09778631e-8,
  "fear": 2.84542659e-12,
  "happiness": 0.99999994,
  "neutral": 2.51053933e-8,
  "sadness": 1.65689826e-8,
  "surprise": 1.3989675e-9

}, {
  "firstName": "Richard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300089.jpeg",
  "lastName": "Shelby",
  "link": "https://www.govtrack.us/congress/members/richard_shelby/300089",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "AL",
  "twitter": "SenShelby",
  "youtube": "SenatorRichardShelby",
  "anger": 0.000006683368,
  "contempt": 0.0007450697,
  "disgust": 0.000021566113,
  "fear": 5.750842e-9,
  "happiness": 0.9348937,
  "neutral": 0.0643283948,
  "sadness": 0.00000261246669,
  "surprise": 0.00000195758776

}, {
  "firstName": "Ron",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/300100.jpeg",
  "lastName": "Wyden",
  "link": "https://www.govtrack.us/congress/members/ron_wyden/300100",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "OR",
  "twitter": "RonWyden",
  "youtube": "senronwyden",
  "anger": 4.213272e-8,
  "contempt": 1.004101e-8,
  "disgust": 0.00000647103934,
  "fear": 1.46150869e-10,
  "happiness": 0.9999921,
  "neutral": 0.00000124786266,
  "sadness": 4.697735e-8,
  "surprise": 1.24394575e-7

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400004.jpeg",
  "lastName": "Aderholt",
  "link": "https://www.govtrack.us/congress/members/robert_aderholt/400004",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AL",
  "twitter": "Robert_Aderholt",
  "youtube": "RobertAderholt",
  "anger": 6.078694e-10,
  "contempt": 7.876869e-9,
  "disgust": 3.660001e-7,
  "fear": 1.38531236e-13,
  "happiness": 0.9999969,
  "neutral": 0.00000271369618,
  "sadness": 1.70353132e-9,
  "surprise": 1.16921206e-9

}, {
  "firstName": "Joe",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400018.jpeg",
  "lastName": "Barton",
  "link": "https://www.govtrack.us/congress/members/joe_barton/400018",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepJoeBarton",
  "youtube": "repjoebarton",
  "anger": 3.97013e-8,
  "contempt": 0.00000463402,
  "disgust": 5.230718e-7,
  "fear": 8.40812364e-10,
  "happiness": 0.999738336,
  "neutral": 0.000252751372,
  "sadness": 0.00000359530623,
  "surprise": 9.45788159e-8

}, {
  "firstName": "Rob",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400029.jpeg",
  "lastName": "Bishop",
  "link": "https://www.govtrack.us/congress/members/rob_bishop/400029",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "UT",
  "twitter": "RepRobBishop",
  "youtube": "CongressmanBishop",
  "anger": 0.0004088788,
  "contempt": 0.00253541488,
  "disgust": 0.0000706334758,
  "fear": 8.454876e-8,
  "happiness": 0.07081177,
  "neutral": 0.9257814,
  "sadness": 0.0003845034,
  "surprise": 0.00000726061444

}, {
  "firstName": "Sanford",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400030.jpeg",
  "lastName": "Bishop",
  "link": "https://www.govtrack.us/congress/members/sanford_bishop/400030",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "GA",
  "twitter": "SanfordBishop",
  "youtube": "RepSanfordBishop",
  "anger": 3.97087035e-7,
  "contempt": 0.0229017045,
  "disgust": 0.0000343353749,
  "fear": 1.21526644e-9,
  "happiness": 0.973554552,
  "neutral": 0.00349612976,
  "sadness": 0.0000125015858,
  "surprise": 3.879048e-7

}, {
  "firstName": "Marsha",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400032.jpeg",
  "lastName": "Blackburn",
  "link": "https://www.govtrack.us/congress/members/marsha_blackburn/400032",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TN",
  "twitter": "MarshaBlackburn",
  "youtube": "RepMarshaBlackburn",
  "anger": 1.01677472e-7,
  "contempt": 8.693978e-9,
  "disgust": 3.235164e-7,
  "fear": 4.98660731e-11,
  "happiness": 0.9999994,
  "neutral": 1.11013364e-7,
  "sadness": 8.104885e-9,
  "surprise": 2.90346751e-8

}, {
  "firstName": "Earl",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400033.jpeg",
  "lastName": "Blumenauer",
  "link": "https://www.govtrack.us/congress/members/earl_blumenauer/400033",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "OR",
  "twitter": "BlumenauerMedia",
  "youtube": "RepBlumenauer",
  "anger": 7.897227e-9,
  "contempt": 1.48037422e-8,
  "disgust": 2.51358642e-7,
  "fear": 1.97114013e-13,
  "happiness": 0.999999344,
  "neutral": 3.73426218e-7,
  "sadness": 8.808203e-11,
  "surprise": 2.64380717e-9

}, {
  "firstName": "Roy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400034.jpeg",
  "lastName": "Blunt",
  "link": "https://www.govtrack.us/congress/members/roy_blunt/400034",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "MO",
  "twitter": "RoyBlunt",
  "youtube": "SenatorBlunt",
  "anger": 0.000158182,
  "contempt": 0.000056269364,
  "disgust": 0.0004335061,
  "fear": 1.92787724e-8,
  "happiness": 0.9993364,
  "neutral": 0.0000107292863,
  "sadness": 2.09094438e-7,
  "surprise": 0.000004633695

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400040.jpeg",
  "lastName": "Boozman",
  "link": "https://www.govtrack.us/congress/members/john_boozman/400040",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "AR",
  "twitter": "JohnBoozman",
  "youtube": "BoozmanPressOffice",
  "anger": 0.000004595657,
  "contempt": 0.000557090039,
  "disgust": 9.746293e-7,
  "fear": 4.99231455e-11,
  "happiness": 0.585222065,
  "neutral": 0.414214343,
  "sadness": 8.53606e-7,
  "surprise": 7.816782e-8

}, {
  "firstName": "Madeleine",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400041.jpeg",
  "lastName": "Bordallo",
  "link": "https://www.govtrack.us/congress/members/madeleine_bordallo/400041",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "GU",
  "youtube": "RepMadeleineBordallo",
  "anger": 0.0000135879518,
  "contempt": 0.00000611621135,
  "disgust": 0.0000180217921,
  "fear": 0.00000241365183,
  "happiness": 0.9986718,
  "neutral": 0.00041982744,
  "sadness": 5.12246231e-7,
  "surprise": 0.000867681345

}, {
  "firstName": "Kevin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400046.jpeg",
  "lastName": "Brady",
  "link": "https://www.govtrack.us/congress/members/kevin_brady/400046",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepKevinBrady",
  "youtube": "KBrady8",
  "anger": 0.00135185011,
  "contempt": 0.00141385186,
  "disgust": 0.00182906,
  "fear": 1.716739e-7,
  "happiness": 0.662545,
  "neutral": 0.3327364,
  "sadness": 0.00003023561,
  "surprise": 0.00009340281

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400047.jpeg",
  "lastName": "Brady",
  "link": "https://www.govtrack.us/congress/members/robert_brady/400047",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepBrady",
  "youtube": "BradyPA01",
  "anger": 0.00165794627,
  "contempt": 0.00419761147,
  "disgust": 0.0009687607,
  "fear": 1.30193754e-7,
  "happiness": 0.381558836,
  "neutral": 0.611474454,
  "sadness": 0.00011786657,
  "surprise": 0.00002439418

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400052.jpeg",
  "lastName": "Burgess",
  "link": "https://www.govtrack.us/congress/members/michael_burgess/400052",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "MichaelCBurgess",
  "youtube": "michaelcburgessmd",
  "anger": 0.00000135833466,
  "contempt": 0.000009347809,
  "disgust": 0.000173180655,
  "fear": 5.11191867e-10,
  "happiness": 0.9997421,
  "neutral": 0.00006858026,
  "sadness": 0.00000544681234,
  "surprise": 1.30992914e-8

}, {
  "firstName": "Richard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400054.jpeg",
  "lastName": "Burr",
  "link": "https://www.govtrack.us/congress/members/richard_burr/400054",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "NC",
  "twitter": "SenatorBurr",
  "youtube": "SenatorRichardBurr",
  "anger": 0.000005572743,
  "contempt": 0.0001796624,
  "disgust": 0.0000253854,
  "fear": 1.41373029e-8,
  "happiness": 0.982896566,
  "neutral": 0.0168761928,
  "sadness": 0.00000423936535,
  "surprise": 0.000012341452

}, {
  "firstName": "Ken",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400057.jpeg",
  "lastName": "Calvert",
  "link": "https://www.govtrack.us/congress/members/ken_calvert/400057",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "KenCalvert",
  "youtube": "RepKenCalvert",
  "anger": 0.000115369716,
  "contempt": 0.000181649913,
  "disgust": 0.000134844842,
  "fear": 0.00000377846072,
  "happiness": 0.976404548,
  "neutral": 0.0229775775,
  "sadness": 0.0001467137,
  "surprise": 0.00003550885

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400063.jpeg",
  "lastName": "Capuano",
  "link": "https://www.govtrack.us/congress/members/michael_capuano/400063",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "RepMikeCapuano",
  "youtube": "RepMikeCapuano",
  "anger": 0.00000111212785,
  "contempt": 0.000001892515,
  "disgust": 0.00000238854227,
  "fear": 1.70598957e-9,
  "happiness": 0.9999759,
  "neutral": 0.0000185183089,
  "sadness": 7.408111e-8,
  "surprise": 6.561219e-8

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400068.jpeg",
  "lastName": "Carter",
  "link": "https://www.govtrack.us/congress/members/john_carter/400068",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "JudgeCarter",
  "youtube": "repjohncarter",
  "anger": 0.0000893844,
  "contempt": 0.000547491538,
  "disgust": 0.0011001816,
  "fear": 2.343816e-8,
  "happiness": 0.982340038,
  "neutral": 0.0159027483,
  "sadness": 0.0000152293451,
  "surprise": 0.000004931069

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400071.jpeg",
  "lastName": "Chabot",
  "link": "https://www.govtrack.us/congress/members/steve_chabot/400071",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepSteveChabot",
  "youtube": "congressmanchabot",
  "anger": 1.14527516e-8,
  "contempt": 1.22687895e-8,
  "disgust": 5.022196e-7,
  "fear": 4.06867075e-12,
  "happiness": 0.9999945,
  "neutral": 0.000004843381,
  "sadness": 1.43760823e-10,
  "surprise": 9.523762e-8

}, {
  "firstName": "Wm.",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400074.jpeg",
  "lastName": "Clay",
  "link": "https://www.govtrack.us/congress/members/lacy_clay/400074",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MO",
  "youtube": "WilliamLacyClay",
  "anger": 2.37791813e-8,
  "contempt": 3.02419867e-9,
  "disgust": 4.01401934e-7,
  "fear": 8.31310853e-11,
  "happiness": 0.9999994,
  "neutral": 2.582762e-8,
  "sadness": 3.9596304e-9,
  "surprise": 1.15443122e-7

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400075.jpeg",
  "lastName": "Clyburn",
  "link": "https://www.govtrack.us/congress/members/james_clyburn/400075",
  "nickname": "Jim",
  "party": "Democrat",
  "role": "Representative",
  "state": "SC",
  "twitter": "Clyburn",
  "youtube": "repjamesclyburn",
  "anger": 0.00002357151,
  "contempt": 0.000353269832,
  "disgust": 0.0000128225274,
  "fear": 2.40635813e-8,
  "happiness": 0.992998,
  "neutral": 0.006608002,
  "sadness": 0.00000338245582,
  "surprise": 9.252995e-7

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400077.jpeg",
  "lastName": "Cole",
  "link": "https://www.govtrack.us/congress/members/tom_cole/400077",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OK",
  "twitter": "TomColeOK04",
  "youtube": "reptomcole",
  "anger": 1.45376518e-7,
  "contempt": 1.13675e-8,
  "disgust": 9.44966e-8,
  "fear": 2.15198172e-12,
  "happiness": 0.9999997,
  "neutral": 5.78064956e-8,
  "sadness": 2.29802965e-11,
  "surprise": 7.142173e-10

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400080.jpeg",
  "lastName": "Conyers",
  "link": "https://www.govtrack.us/congress/members/john_conyers/400080",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepJohnConyers",
  "youtube": "JCMI14",
  "anger": 8.47284468e-7,
  "contempt": 0.00016463366,
  "disgust": 0.00000522740356,
  "fear": 5.818626e-9,
  "happiness": 0.995543361,
  "neutral": 0.00427067373,
  "sadness": 0.0000148618346,
  "surprise": 3.87759741e-7

}, {
  "firstName": "Jim",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400081.jpeg",
  "lastName": "Cooper",
  "link": "https://www.govtrack.us/congress/members/jim_cooper/400081",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TN",
  "twitter": "RepJimCooper",
  "youtube": "RepJimCooper",
  "anger": 0.000375007279,
  "contempt": 0.00117963308,
  "disgust": 0.00006877888,
  "fear": 7.728895e-9,
  "happiness": 0.854180455,
  "neutral": 0.14418681,
  "sadness": 0.000008891752,
  "surprise": 4.36122832e-7

}, {
  "firstName": "Joseph",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400087.jpeg",
  "lastName": "Crowley",
  "link": "https://www.govtrack.us/congress/members/joseph_crowley/400087",
  "nickname": "Joe",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepJoeCrowley",
  "youtube": "RepJoeCrowley",
  "anger": 0.007466067,
  "contempt": 0.000214071188,
  "disgust": 0.009343779,
  "fear": 0.000016541373,
  "happiness": 0.9718486,
  "neutral": 0.01096356,
  "sadness": 0.0000128846223,
  "surprise": 0.000134516915

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400089.jpeg",
  "lastName": "Culberson",
  "link": "https://www.govtrack.us/congress/members/john_culberson/400089",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "CongCulberson",
  "youtube": "johnculbersontx07",
  "anger": 2.1053955e-8,
  "contempt": 3.201993e-7,
  "disgust": 6.1285256e-8,
  "fear": 2.61038746e-10,
  "happiness": 0.9999967,
  "neutral": 0.00000274044123,
  "sadness": 1.26021945e-7,
  "surprise": 9.516732e-9

}, {
  "firstName": "Elijah",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400090.jpeg",
  "lastName": "Cummings",
  "link": "https://www.govtrack.us/congress/members/elijah_cummings/400090",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MD",
  "twitter": "RepCummings",
  "youtube": "ElijahECummings",
  "anger": 0.00109929591,
  "contempt": 0.002598414,
  "disgust": 0.0006370372,
  "fear": 0.00000305204321,
  "happiness": 0.007387087,
  "neutral": 0.9863207,
  "sadness": 0.00136334193,
  "surprise": 0.000591116

}, {
  "firstName": "Danny",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400093.jpeg",
  "lastName": "Davis",
  "link": "https://www.govtrack.us/congress/members/danny_davis/400093",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepDannyDavis",
  "youtube": "dannykdavis07",
  "anger": 0.00109611941,
  "contempt": 0.005947634,
  "disgust": 0.000245322939,
  "fear": 0.000009145424,
  "happiness": 0.00014291532,
  "neutral": 0.75106746,
  "sadness": 0.241441175,
  "surprise": 0.0000502395233

}, {
  "firstName": "Susan",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400097.jpeg",
  "lastName": "Davis",
  "link": "https://www.govtrack.us/congress/members/susan_davis/400097",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepSusanDavis",
  "anger": 9.26373957e-7,
  "contempt": 9.857634e-13,
  "disgust": 9.542492e-9,
  "fear": 3.863053e-9,
  "happiness": 0.999999046,
  "neutral": 3.2140215e-12,
  "sadness": 1.01212612e-8,
  "surprise": 1.65396035e-8

}, {
  "firstName": "Peter",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400100.jpeg",
  "lastName": "DeFazio",
  "link": "https://www.govtrack.us/congress/members/peter_defazio/400100",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "OR",
  "twitter": "RepPeterDeFazio",
  "youtube": "PeterDeFazio",
  "anger": 5.395949e-10,
  "contempt": 7.29856064e-10,
  "disgust": 1.54127888e-9,
  "fear": 8.861452e-12,
  "happiness": 0.99999994,
  "neutral": 8.4633875e-8,
  "sadness": 7.526164e-10,
  "surprise": 1.03232123e-9

}, {
  "firstName": "Diana",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400101.jpeg",
  "lastName": "DeGette",
  "link": "https://www.govtrack.us/congress/members/diana_degette/400101",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CO",
  "twitter": "RepDianaDeGette",
  "youtube": "RepDianaDeGette",
  "anger": 8.92033149e-12,
  "contempt": 3.94202553e-11,
  "disgust": 5.16306858e-11,
  "fear": 8.937967e-14,
  "happiness": 1,
  "neutral": 5.28089461e-10,
  "sadness": 8.626774e-12,
  "surprise": 1.589488e-10

}, {
  "firstName": "Rosa",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400103.jpeg",
  "lastName": "DeLauro",
  "link": "https://www.govtrack.us/congress/members/rosa_delauro/400103",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CT",
  "twitter": "RosaDeLauro",
  "youtube": "rosadelauro",
  "anger": 1.292758e-9,
  "contempt": 2.89754375e-12,
  "disgust": 1.21053934e-9,
  "fear": 8.43407844e-11,
  "happiness": 1,
  "neutral": 2.93972041e-10,
  "sadness": 7.401508e-12,
  "surprise": 4.22126645e-9

}, {
  "firstName": "Mario",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400108.jpeg",
  "lastName": "Diaz-Balart",
  "link": "https://www.govtrack.us/congress/members/mario_diaz_balart/400108",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "MarioDB",
  "youtube": "MarioDiazBalart",
  "anger": 1.16661871e-8,
  "contempt": 5.9709123e-7,
  "disgust": 4.32653557e-8,
  "fear": 2.37707215e-11,
  "happiness": 0.9999579,
  "neutral": 0.0000413828566,
  "sadness": 1.02478062e-8,
  "surprise": 7.43882556e-9

}, {
  "firstName": "Lloyd",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400111.jpeg",
  "lastName": "Doggett",
  "link": "https://www.govtrack.us/congress/members/lloyd_doggett/400111",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepLloydDoggett",
  "youtube": "doggett",
  "anger": 0.000001101134,
  "contempt": 0.000011730016,
  "disgust": 0.00000342577414,
  "fear": 6.5900303e-9,
  "happiness": 0.9963005,
  "neutral": 0.003674652,
  "sadness": 4.6396957e-7,
  "surprise": 0.000008084365

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400114.jpeg",
  "lastName": "Doyle",
  "link": "https://www.govtrack.us/congress/members/michael_doyle/400114",
  "nickname": "Mike",
  "party": "Democrat",
  "role": "Representative",
  "state": "PA",
  "twitter": "USRepMikeDoyle",
  "youtube": "CongressmanDoyle",
  "anger": 0.0006988402,
  "contempt": 0.00005880973,
  "disgust": 0.0247684885,
  "fear": 1.79463289e-8,
  "happiness": 0.9740053,
  "neutral": 0.000454985158,
  "sadness": 0.00000856633,
  "surprise": 0.00000501977456

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400116.jpeg",
  "lastName": "Duncan",
  "link": "https://www.govtrack.us/congress/members/john_duncan/400116",
  "nickname": "Jimmy",
  "party": "Republican",
  "role": "Representative",
  "state": "TN",
  "twitter": "RepJohnDuncanJr",
  "youtube": "RepJohnDuncan",
  "anger": 0.0006344462,
  "contempt": 0.0009804517,
  "disgust": 0.000441513024,
  "fear": 6.628176e-7,
  "happiness": 0.98829937,
  "neutral": 0.009269889,
  "sadness": 0.00000137950587,
  "surprise": 0.0003722738

}, {
  "firstName": "Eliot",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400122.jpeg",
  "lastName": "Engel",
  "link": "https://www.govtrack.us/congress/members/eliot_engel/400122",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepEliotEngel",
  "youtube": "engel2161",
  "anger": 0.00001648596,
  "contempt": 2.00488444e-7,
  "disgust": 0.00000130913043,
  "fear": 6.7023926e-8,
  "happiness": 0.999968469,
  "neutral": 0.000006629319,
  "sadness": 0.000002039155,
  "surprise": 0.000004795309

}, {
  "firstName": "Anna",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400124.jpeg",
  "lastName": "Eshoo",
  "link": "https://www.govtrack.us/congress/members/anna_eshoo/400124",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepAnnaEshoo",
  "youtube": "RepAnnaEshoo",
  "anger": 6.263526e-8,
  "contempt": 2.2889175e-8,
  "disgust": 0.00000136502058,
  "fear": 5.20195831e-10,
  "happiness": 0.999996245,
  "neutral": 2.236927e-8,
  "sadness": 0.00000229754528,
  "surprise": 1.18180337e-8

}, {
  "firstName": "Trent",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400141.jpeg",
  "lastName": "Franks",
  "link": "https://www.govtrack.us/congress/members/trent_franks/400141",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AZ",
  "twitter": "RepTrentFranks",
  "youtube": "RepTrentFranks",
  "anger": 2.13582553e-7,
  "contempt": 0.00009859593,
  "disgust": 6.864163e-8,
  "fear": 7.480647e-10,
  "happiness": 0.727614045,
  "neutral": 0.272284448,
  "sadness": 0.00000143259217,
  "surprise": 0.0000012147334

}, {
  "firstName": "Rodney",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400142.jpeg",
  "lastName": "Frelinghuysen",
  "link": "https://www.govtrack.us/congress/members/rodney_frelinghuysen/400142",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NJ",
  "twitter": "USRepRodney",
  "youtube": "RepFrelinghuysen",
  "anger": 0.0000136010995,
  "contempt": 0.0000371605274,
  "disgust": 0.0000523944473,
  "fear": 0.000001151214,
  "happiness": 0.993479669,
  "neutral": 0.00614620559,
  "sadness": 0.00000115561829,
  "surprise": 0.000268680364

}, {
  "firstName": "Bob",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400154.jpeg",
  "lastName": "Goodlatte",
  "link": "https://www.govtrack.us/congress/members/bob_goodlatte/400154",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "VA",
  "twitter": "RepGoodlatte",
  "youtube": "RepBobGoodlatte",
  "anger": 0.00057271705,
  "contempt": 0.008686366,
  "disgust": 0.00767346565,
  "fear": 0.000004014665,
  "happiness": 0.8701713,
  "neutral": 0.11224629,
  "sadness": 0.000189896542,
  "surprise": 0.000455958827

}, {
  "firstName": "Kay",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400157.jpeg",
  "lastName": "Granger",
  "link": "https://www.govtrack.us/congress/members/kay_granger/400157",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepKayGranger",
  "youtube": "RepKayGranger",
  "anger": 3.50233222e-7,
  "contempt": 2.02526e-10,
  "disgust": 1.49857335e-8,
  "fear": 5.2505456e-8,
  "happiness": 0.999999464,
  "neutral": 2.878674e-9,
  "sadness": 3.17186077e-9,
  "surprise": 1.33558743e-7

}, {
  "firstName": "Sam",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400158.jpeg",
  "lastName": "Graves",
  "link": "https://www.govtrack.us/congress/members/sam_graves/400158",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MO",
  "twitter": "RepSamGraves",
  "anger": 3.91995314e-7,
  "contempt": 1.05332747e-8,
  "disgust": 2.27828693e-7,
  "fear": 4.607305e-8,
  "happiness": 0.9999944,
  "neutral": 7.53540945e-8,
  "sadness": 3.14067328e-9,
  "surprise": 0.000004820009

}, {
  "firstName": "Gene",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400160.jpeg",
  "lastName": "Green",
  "link": "https://www.govtrack.us/congress/members/gene_green/400160",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepGeneGreen",
  "youtube": "RepGeneGreen",
  "anger": 0.0006109636,
  "contempt": 0.0351731032,
  "disgust": 0.000394381263,
  "fear": 0.00000266382563,
  "happiness": 0.1280969,
  "neutral": 0.8329611,
  "sadness": 0.002716224,
  "surprise": 0.00004467994

}, {
  "firstName": "Raúl",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400162.jpeg",
  "lastName": "Grijalva",
  "link": "https://www.govtrack.us/congress/members/raul_grijalva/400162",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "AZ",
  "twitter": "RepraulGrijalva",
  "youtube": "raulgrijalvaaz07",
  "anger": 0.0005447889,
  "contempt": 0.00219658623,
  "disgust": 0.0008187084,
  "fear": 0.000009877514,
  "happiness": 0.61815244,
  "neutral": 0.376143545,
  "sadness": 0.00154831365,
  "surprise": 0.000585752132

}, {
  "firstName": "Luis",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400163.jpeg",
  "lastName": "Gutiérrez",
  "link": "https://www.govtrack.us/congress/members/luis_gutierrez/400163",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepGutierrez",
  "youtube": "repluisgutierrez",
  "anger": 3.07025459e-7,
  "contempt": 5.71445069e-9,
  "disgust": 5.65324854e-7,
  "fear": 8.706544e-11,
  "happiness": 0.9999989,
  "neutral": 1.6056751e-7,
  "sadness": 1.53758446e-8,
  "surprise": 4.57160843e-9

}, {
  "firstName": "Alcee",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400170.jpeg",
  "lastName": "Hastings",
  "link": "https://www.govtrack.us/congress/members/alcee_hastings/400170",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepHastingsFL",
  "youtube": "RepAlceeHastings",
  "anger": 5.368029e-8,
  "contempt": 0.00000152559164,
  "disgust": 0.00000115876855,
  "fear": 2.21333438e-10,
  "happiness": 0.999995351,
  "neutral": 0.0000014341889,
  "sadness": 4.3161657e-7,
  "surprise": 6.11436661e-8

}, {
  "firstName": "Jeb",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400175.jpeg",
  "lastName": "Hensarling",
  "link": "https://www.govtrack.us/congress/members/jeb_hensarling/400175",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepHensarling",
  "youtube": "repjebhensarling",
  "anger": 3.44703072e-10,
  "contempt": 3.766389e-11,
  "disgust": 7.230615e-9,
  "fear": 1.77515527e-13,
  "happiness": 1,
  "neutral": 6.915861e-10,
  "sadness": 3.28717276e-10,
  "surprise": 2.04507355e-10

}, {
  "firstName": "Steny",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400189.jpeg",
  "lastName": "Hoyer",
  "link": "https://www.govtrack.us/congress/members/steny_hoyer/400189",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MD",
  "twitter": "WhipHoyer",
  "youtube": "LeaderHoyer",
  "anger": 2.55808629e-7,
  "contempt": 0.0002182357,
  "disgust": 0.0000223890383,
  "fear": 4.59995063e-11,
  "happiness": 0.9980113,
  "neutral": 0.00174734392,
  "sadness": 8.405767e-8,
  "surprise": 4.015816e-7

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400194.jpeg",
  "lastName": "Isakson",
  "link": "https://www.govtrack.us/congress/members/john_isakson/400194",
  "nickname": "Johnny",
  "party": "Republican",
  "role": "Senator",
  "state": "GA",
  "twitter": "SenatorIsakson",
  "youtube": "SenatorIsakson",
  "anger": 0.0000575752019,
  "contempt": 0.00110426161,
  "disgust": 0.000152334411,
  "fear": 6.899841e-8,
  "happiness": 0.781407,
  "neutral": 0.217199862,
  "sadness": 0.0000598679362,
  "surprise": 0.0000190442079

}, {
  "firstName": "Darrell",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400196.jpeg",
  "lastName": "Issa",
  "link": "https://www.govtrack.us/congress/members/darrell_issa/400196",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "DarrellIssa",
  "youtube": "repdarrellissa",
  "anger": 2.25332558e-10,
  "contempt": 1.22780145e-11,
  "disgust": 4.98018737e-10,
  "fear": 1.30343718e-12,
  "happiness": 1,
  "neutral": 8.673966e-11,
  "sadness": 3.710416e-11,
  "surprise": 4.163974e-11

}, {
  "firstName": "Sheila",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400199.jpeg",
  "lastName": "Jackson Lee",
  "link": "https://www.govtrack.us/congress/members/sheila_jackson_lee/400199",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "JacksonLeeTX18",
  "youtube": "TX18SJL",
  "anger": 5.052816e-8,
  "contempt": 8.034776e-7,
  "disgust": 2.87207683e-7,
  "fear": 1.8153866e-8,
  "happiness": 0.9999776,
  "neutral": 0.000009300938,
  "sadness": 6.348398e-7,
  "surprise": 0.0000113027527

}, {
  "firstName": "Eddie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400204.jpeg",
  "lastName": "Johnson",
  "link": "https://www.govtrack.us/congress/members/eddie_johnson/400204",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepEBJ",
  "youtube": "RepEddieBJohnson",
  "anger": 0.0000180974985,
  "contempt": 6.504759e-7,
  "disgust": 0.00000364714333,
  "fear": 0.00000261978357,
  "happiness": 0.999946654,
  "neutral": 0.0000116423107,
  "sadness": 8.37528e-7,
  "surprise": 0.0000158594

}, {
  "firstName": "Sam",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400206.jpeg",
  "lastName": "Johnson",
  "link": "https://www.govtrack.us/congress/members/sam_johnson/400206",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "SamsPressShop",
  "youtube": "RepSamJohnson",
  "anger": 0.000116083407,
  "contempt": 0.00232058577,
  "disgust": 0.000113423972,
  "fear": 7.315907e-7,
  "happiness": 0.952608645,
  "neutral": 0.04477709,
  "sadness": 0.0000395821153,
  "surprise": 0.0000238646862

}, {
  "firstName": "Walter",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400209.jpeg",
  "lastName": "Jones",
  "link": "https://www.govtrack.us/congress/members/walter_jones/400209",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepWalterJones",
  "youtube": "RepWalterJones",
  "anger": 0.00002167067,
  "contempt": 0.0008546483,
  "disgust": 0.00000750217941,
  "fear": 2.950283e-8,
  "happiness": 0.808990836,
  "neutral": 0.19011341,
  "sadness": 0.00000800529,
  "surprise": 0.000003883581

}, {
  "firstName": "Marcy",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400211.jpeg",
  "lastName": "Kaptur",
  "link": "https://www.govtrack.us/congress/members/marcy_kaptur/400211",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepMarcyKaptur",
  "youtube": "USRepMarcyKaptur",
  "anger": 0.0000303604011,
  "contempt": 0.00018947784,
  "disgust": 0.0008083844,
  "fear": 3.42002522e-7,
  "happiness": 0.9985315,
  "neutral": 0.0003872299,
  "sadness": 0.00000185025226,
  "surprise": 0.000050852057

}, {
  "firstName": "Ron",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400218.jpeg",
  "lastName": "Kind",
  "link": "https://www.govtrack.us/congress/members/ron_kind/400218",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WI",
  "twitter": "RepRonKind",
  "youtube": "RepRonKind",
  "anger": 4.55286425e-7,
  "contempt": 0.000873827434,
  "disgust": 0.000009785123,
  "fear": 1.00269759e-9,
  "happiness": 0.9986083,
  "neutral": 0.000506784068,
  "sadness": 7.933728e-7,
  "surprise": 5.69844758e-8

}, {
  "firstName": "Peter",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400219.jpeg",
  "lastName": "King",
  "link": "https://www.govtrack.us/congress/members/peter_king/400219",
  "nickname": "Pete",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepPeteKing",
  "youtube": "RepPeterKing",
  "anger": 1.83749886e-8,
  "contempt": 1.88265417e-7,
  "disgust": 1.99399381e-7,
  "fear": 1.98421661e-11,
  "happiness": 0.9999996,
  "neutral": 2.64589755e-8,
  "sadness": 2.54808863e-9,
  "surprise": 6.420475e-9

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400220.jpeg",
  "lastName": "King",
  "link": "https://www.govtrack.us/congress/members/steve_king/400220",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IA",
  "twitter": "SteveKingIA",
  "youtube": "stevekingia",
  "anger": 6.804197e-9,
  "contempt": 1.32386418e-7,
  "disgust": 6.01615e-8,
  "fear": 7.699224e-11,
  "happiness": 0.9999989,
  "neutral": 8.45628335e-7,
  "sadness": 8.358872e-9,
  "surprise": 4.53362965e-8

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400230.jpeg",
  "lastName": "Langevin",
  "link": "https://www.govtrack.us/congress/members/james_langevin/400230",
  "nickname": "Jim",
  "party": "Democrat",
  "role": "Representative",
  "state": "RI",
  "twitter": "JimLangevin",
  "youtube": "jimlangevin",
  "anger": 3.142585e-8,
  "contempt": 9.320766e-10,
  "disgust": 2.28928471e-7,
  "fear": 3.25770633e-13,
  "happiness": 0.9999997,
  "neutral": 7.729402e-9,
  "sadness": 9.503297e-10,
  "surprise": 6.270256e-11

}, {
  "firstName": "Rick",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400232.jpeg",
  "lastName": "Larsen",
  "link": "https://www.govtrack.us/congress/members/rick_larsen/400232",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WA",
  "twitter": "RepRickLarsen",
  "youtube": "congressmanlarsen",
  "anger": 3.28082344e-8,
  "contempt": 8.576907e-9,
  "disgust": 7.205559e-8,
  "fear": 1.41699595e-11,
  "happiness": 0.9999996,
  "neutral": 2.72565359e-7,
  "sadness": 1.32116915e-10,
  "surprise": 4.481769e-9

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400233.jpeg",
  "lastName": "Larson",
  "link": "https://www.govtrack.us/congress/members/john_larson/400233",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CT",
  "twitter": "RepJohnLarson",
  "youtube": "RepJohnLarson",
  "anger": 0.000832607446,
  "contempt": 0.0245876443,
  "disgust": 0.000633636664,
  "fear": 0.00000444849456,
  "happiness": 0.8313805,
  "neutral": 0.141162038,
  "sadness": 0.00127657526,
  "surprise": 0.0001225826

}, {
  "firstName": "Barbara",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400237.jpeg",
  "lastName": "Lee",
  "link": "https://www.govtrack.us/congress/members/barbara_lee/400237",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepBarbaraLee",
  "youtube": "RepLee",
  "anger": 8.316698e-11,
  "contempt": 2.15125183e-12,
  "disgust": 4.36988973e-10,
  "fear": 8.86388348e-13,
  "happiness": 1,
  "neutral": 1.72829685e-11,
  "sadness": 1.55935709e-10,
  "surprise": 1.39169676e-9

}, {
  "firstName": "Sander",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400238.jpeg",
  "lastName": "Levin",
  "link": "https://www.govtrack.us/congress/members/sander_levin/400238",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepSandyLevin",
  "youtube": "mi12yes",
  "anger": 0.000428505416,
  "contempt": 0.000158254115,
  "disgust": 0.000620885869,
  "fear": 3.65782249e-8,
  "happiness": 0.942101836,
  "neutral": 0.05664472,
  "sadness": 0.0000435869624,
  "surprise": 0.00000219366711

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400240.jpeg",
  "lastName": "Lewis",
  "link": "https://www.govtrack.us/congress/members/john_lewis/400240",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepJohnLewis",
  "youtube": "repjohnlewis",
  "anger": 0.005396586,
  "contempt": 0.01777357,
  "disgust": 0.00477401633,
  "fear": 0.000248661148,
  "happiness": 0.425607741,
  "neutral": 0.534540832,
  "sadness": 0.0106463339,
  "surprise": 0.00101222913

}, {
  "firstName": "Frank",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400244.jpeg",
  "lastName": "LoBiondo",
  "link": "https://www.govtrack.us/congress/members/frank_lobiondo/400244",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NJ",
  "twitter": "RepLoBiondo",
  "youtube": "USRepFrankLoBiondo",
  "anger": 0.0000786752644,
  "contempt": 0.000151190456,
  "disgust": 0.00013252499,
  "fear": 0.000168928513,
  "happiness": 0.992919564,
  "neutral": 0.006106859,
  "sadness": 0.000331151852,
  "surprise": 0.000111132256

}, {
  "firstName": "Zoe",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400245.jpeg",
  "lastName": "Lofgren",
  "link": "https://www.govtrack.us/congress/members/zoe_lofgren/400245",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepZoeLofgren",
  "youtube": "RepZoeLofgren",
  "anger": 0.00000301491241,
  "contempt": 8.88890838e-7,
  "disgust": 0.000129774809,
  "fear": 1.222328e-7,
  "happiness": 0.9998217,
  "neutral": 0.000003186995,
  "sadness": 0.00003357393,
  "surprise": 0.000007718257

}, {
  "firstName": "Nita",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400246.jpeg",
  "lastName": "Lowey",
  "link": "https://www.govtrack.us/congress/members/nita_lowey/400246",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "NitaLowey",
  "youtube": "nitalowey",
  "anger": 7.335877e-11,
  "contempt": 1.19807387e-12,
  "disgust": 7.16791e-11,
  "fear": 2.547221e-12,
  "happiness": 1,
  "neutral": 1.68000627e-10,
  "sadness": 6.184475e-12,
  "surprise": 2.69915357e-9

}, {
  "firstName": "Frank",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400247.jpeg",
  "lastName": "Lucas",
  "link": "https://www.govtrack.us/congress/members/frank_lucas/400247",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OK",
  "twitter": "RepFrankLucas",
  "youtube": "RepFrankLucas",
  "anger": 3.8470966e-11,
  "contempt": 2.60984817e-10,
  "disgust": 2.32254022e-10,
  "fear": 2.738746e-14,
  "happiness": 0.99999994,
  "neutral": 3.55469147e-8,
  "sadness": 2.47565884e-13,
  "surprise": 7.21213045e-9

}, {
  "firstName": "Stephen",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400249.jpeg",
  "lastName": "Lynch",
  "link": "https://www.govtrack.us/congress/members/stephen_lynch/400249",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "RepStephenLynch",
  "youtube": "RepLynch",
  "anger": 0.000113908354,
  "contempt": 0.002895775,
  "disgust": 0.000387247215,
  "fear": 0.0000193448432,
  "happiness": 0.64337796,
  "neutral": 0.3460125,
  "sadness": 0.0004619518,
  "surprise": 0.00673131831

}, {
  "firstName": "Carolyn",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400251.jpeg",
  "lastName": "Maloney",
  "link": "https://www.govtrack.us/congress/members/carolyn_maloney/400251",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepMaloney",
  "youtube": "carolynbmaloney",
  "anger": 0.00323488424,
  "contempt": 0.008909053,
  "disgust": 0.0100542828,
  "fear": 0.000178585353,
  "happiness": 0.728317,
  "neutral": 0.219277486,
  "sadness": 0.0283276327,
  "surprise": 0.00170106709

}, {
  "firstName": "Betty",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400259.jpeg",
  "lastName": "McCollum",
  "link": "https://www.govtrack.us/congress/members/betty_mccollum/400259",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MN",
  "twitter": "BettyMcCollum04",
  "anger": 0.00000373577473,
  "contempt": 0.00000250113453,
  "disgust": 0.0000220009933,
  "fear": 0.000008123128,
  "happiness": 0.999702,
  "neutral": 0.00008414176,
  "sadness": 0.00000374152228,
  "surprise": 0.000173795459

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400263.jpeg",
  "lastName": "McGovern",
  "link": "https://www.govtrack.us/congress/members/james_mcgovern/400263",
  "nickname": "Jim",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "RepMcGovern",
  "youtube": "repjimmcgovern",
  "anger": 4.678273e-8,
  "contempt": 0.0000509231832,
  "disgust": 0.00000109504651,
  "fear": 1.93090769e-11,
  "happiness": 0.9754206,
  "neutral": 0.024527099,
  "sadness": 1.93388971e-7,
  "surprise": 2.54260168e-8

}, {
  "firstName": "Gregory",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400271.jpeg",
  "lastName": "Meeks",
  "link": "https://www.govtrack.us/congress/members/gregory_meeks/400271",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepGregoryMeeks",
  "youtube": "gwmeeks",
  "anger": 3.85735754e-9,
  "contempt": 2.84201246e-10,
  "disgust": 2.740092e-8,
  "fear": 1.74230869e-13,
  "happiness": 0.99999994,
  "neutral": 8.196763e-10,
  "sadness": 2.23654928e-10,
  "surprise": 2.05498066e-11

}, {
  "firstName": "Jerry",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400284.jpeg",
  "lastName": "Moran",
  "link": "https://www.govtrack.us/congress/members/jerry_moran/400284",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "KS",
  "twitter": "JerryMoran",
  "youtube": "senatorjerrymoran",
  "anger": 0.00000397876647,
  "contempt": 1.729792e-8,
  "disgust": 0.000008306297,
  "fear": 8.648539e-10,
  "happiness": 0.9999858,
  "neutral": 0.0000017813976,
  "sadness": 4.12048422e-8,
  "surprise": 3.82476237e-8

}, {
  "firstName": "Jerrold",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400289.jpeg",
  "lastName": "Nadler",
  "link": "https://www.govtrack.us/congress/members/jerrold_nadler/400289",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepJerryNadler",
  "youtube": "congressmannadler",
  "anger": 2.19900773e-8,
  "contempt": 8.55914e-8,
  "disgust": 3.589484e-7,
  "fear": 2.14922741e-12,
  "happiness": 0.999996841,
  "neutral": 0.00000265997,
  "sadness": 4.07763645e-9,
  "surprise": 2.37738473e-9

}, {
  "firstName": "Grace",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400290.jpeg",
  "lastName": "Napolitano",
  "link": "https://www.govtrack.us/congress/members/grace_napolitano/400290",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "GraceNapolitano",
  "youtube": "RepGraceNapolitano",
  "anger": 0.0007546585,
  "contempt": 0.00027520975,
  "disgust": 0.0015362649,
  "fear": 0.000008874809,
  "happiness": 0.9694015,
  "neutral": 0.0271001682,
  "sadness": 0.000262608955,
  "surprise": 0.0006607456

}, {
  "firstName": "Richard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400291.jpeg",
  "lastName": "Neal",
  "link": "https://www.govtrack.us/congress/members/richard_neal/400291",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "RepRichardNeal",
  "youtube": "RepRichardENeal",
  "anger": 0.00000217641832,
  "contempt": 8.595649e-9,
  "disgust": 2.41070126e-7,
  "fear": 0.00000301069258,
  "happiness": 0.9999393,
  "neutral": 9.082491e-8,
  "sadness": 4.752062e-8,
  "surprise": 0.00005512328

}, {
  "firstName": "Eleanor",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400295.jpeg",
  "lastName": "Norton",
  "link": "https://www.govtrack.us/congress/members/eleanor_norton/400295",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "DC",
  "twitter": "EleanorNorton",
  "youtube": "EleanorHNorton",
  "anger": 9.024379e-7,
  "contempt": 0.000022807566,
  "disgust": 9.40117445e-7,
  "fear": 3.376743e-9,
  "happiness": 0.9999725,
  "neutral": 0.00000208259348,
  "sadness": 5.29116981e-8,
  "surprise": 7.06879348e-7

}, {
  "firstName": "Devin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400297.jpeg",
  "lastName": "Nunes",
  "link": "https://www.govtrack.us/congress/members/devin_nunes/400297",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepDevinNunes",
  "youtube": "RepDevinNunes",
  "anger": 1.48142831e-7,
  "contempt": 1.27333507e-7,
  "disgust": 1.839705e-7,
  "fear": 6.48546356e-11,
  "happiness": 0.999982,
  "neutral": 0.0000173789031,
  "sadness": 1.56309377e-9,
  "surprise": 1.60360344e-7

}, {
  "firstName": "Frank",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400308.jpeg",
  "lastName": "Pallone",
  "link": "https://www.govtrack.us/congress/members/frank_pallone/400308",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NJ",
  "twitter": "FrankPallone",
  "youtube": "repfrankpallone",
  "anger": 0.0000400853023,
  "contempt": 0.00004413422,
  "disgust": 0.00015700332,
  "fear": 3.79367435e-8,
  "happiness": 0.999517,
  "neutral": 0.000229010431,
  "sadness": 0.0000117688724,
  "surprise": 9.590165e-7

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400309.jpeg",
  "lastName": "Pascrell",
  "link": "https://www.govtrack.us/congress/members/bill_pascrell/400309",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NJ",
  "twitter": "BillPascrell",
  "youtube": "RepPascrell",
  "anger": 0.009131419,
  "contempt": 0.0218151566,
  "disgust": 0.00622493727,
  "fear": 0.000123392179,
  "happiness": 0.8328465,
  "neutral": 0.108280636,
  "sadness": 0.0210398417,
  "surprise": 0.000538113643

}, {
  "firstName": "Stevan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400313.jpeg",
  "lastName": "Pearce",
  "link": "https://www.govtrack.us/congress/members/stevan_pearce/400313",
  "nickname": "Steve",
  "party": "Republican",
  "role": "Representative",
  "state": "NM",
  "twitter": "RepStevePearce",
  "youtube": "NMStevePearce",
  "anger": 0.0000334733559,
  "contempt": 0.00005195988,
  "disgust": 0.00009104331,
  "fear": 1.43020467e-8,
  "happiness": 0.9984993,
  "neutral": 0.001315646,
  "sadness": 0.000007468374,
  "surprise": 0.00000114722752

}, {
  "firstName": "Nancy",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400314.jpeg",
  "lastName": "Pelosi",
  "link": "https://www.govtrack.us/congress/members/nancy_pelosi/400314",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "NancyPelosi",
  "youtube": "nancypelosi",
  "anger": 0.00000288139722,
  "contempt": 7.912021e-8,
  "disgust": 0.000008903848,
  "fear": 0.00006870345,
  "happiness": 0.9998124,
  "neutral": 0.0000023557684,
  "sadness": 0.000008369817,
  "surprise": 0.00009627286

}, {
  "firstName": "Collin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400316.jpeg",
  "lastName": "Peterson",
  "link": "https://www.govtrack.us/congress/members/collin_peterson/400316",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MN",
  "anger": 2.69705573e-8,
  "contempt": 0.00000289784043,
  "disgust": 0.00000189322157,
  "fear": 3.457232e-13,
  "happiness": 0.9996989,
  "neutral": 0.000296299,
  "sadness": 5.25629851e-9,
  "surprise": 1.45676782e-9

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400325.jpeg",
  "lastName": "Portman",
  "link": "https://www.govtrack.us/congress/members/robert_portman/400325",
  "nickname": "Rob",
  "party": "Republican",
  "role": "Senator",
  "state": "OH",
  "twitter": "SenRobPortman",
  "youtube": "SenRobPortman",
  "anger": 3.470126e-12,
  "contempt": 2.71882716e-9,
  "disgust": 1.88058347e-10,
  "fear": 4.31840213e-16,
  "happiness": 0.999999166,
  "neutral": 8.1329506e-7,
  "sadness": 5.181547e-13,
  "surprise": 7.132609e-11

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400326.jpeg",
  "lastName": "Price",
  "link": "https://www.govtrack.us/congress/members/david_price/400326",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepDavidEPrice",
  "youtube": "RepDavidPrice",
  "anger": 0.00001982572,
  "contempt": 0.00183068088,
  "disgust": 0.0000377983233,
  "fear": 2.41664466e-8,
  "happiness": 0.9405721,
  "neutral": 0.0574926957,
  "sadness": 0.00004297735,
  "surprise": 0.00000393912251

}, {
  "firstName": "Harold",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400340.jpeg",
  "lastName": "Rogers",
  "link": "https://www.govtrack.us/congress/members/harold_rogers/400340",
  "nickname": "Hal",
  "party": "Republican",
  "role": "Representative",
  "state": "KY",
  "twitter": "RepHalRogers",
  "youtube": "RepHalRogers",
  "anger": 0.0140527328,
  "contempt": 0.0246247947,
  "disgust": 0.00226970552,
  "fear": 0.00000100254169,
  "happiness": 0.0019738283,
  "neutral": 0.9543004,
  "sadness": 0.00258663739,
  "surprise": 0.000190904932

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400341.jpeg",
  "lastName": "Rogers",
  "link": "https://www.govtrack.us/congress/members/mike_rogers/400341",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AL",
  "twitter": "RepMikeRogersAL",
  "youtube": "MikeRogersAL03",
  "anger": 0.002735885,
  "contempt": 0.000633233343,
  "disgust": 0.00147787679,
  "fear": 0.000004758088,
  "happiness": 0.9902461,
  "neutral": 0.00471759262,
  "sadness": 0.0000139248568,
  "surprise": 0.0001705866

}, {
  "firstName": "Dana",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400343.jpeg",
  "lastName": "Rohrabacher",
  "link": "https://www.govtrack.us/congress/members/dana_rohrabacher/400343",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "reprohrabacher",
  "youtube": "RepDanaRohrabacher",
  "anger": 2.79028e-7,
  "contempt": 3.30001683e-7,
  "disgust": 0.000003984669,
  "fear": 2.82703555e-10,
  "happiness": 0.999991953,
  "neutral": 0.000002441482,
  "sadness": 7.543131e-7,
  "surprise": 2.547751e-7

}, {
  "firstName": "Ileana",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400344.jpeg",
  "lastName": "Ros-Lehtinen",
  "link": "https://www.govtrack.us/congress/members/ileana_ros_lehtinen/400344",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RosLehtinen",
  "youtube": "IleanaRosLehtinen",
  "anger": 0.00000197677787,
  "contempt": 3.82538e-8,
  "disgust": 0.00006419379,
  "fear": 1.98980086e-11,
  "happiness": 0.99993366,
  "neutral": 5.129871e-8,
  "sadness": 2.7472888e-8,
  "surprise": 7.180444e-8

}, {
  "firstName": "Lucille",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400347.jpeg",
  "lastName": "Roybal-Allard",
  "link": "https://www.govtrack.us/congress/members/lucille_roybal_allard/400347",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepRoybalAllard",
  "youtube": "RepRoybalAllard",
  "anger": 1.484722e-7,
  "contempt": 5.551896e-8,
  "disgust": 5.258478e-7,
  "fear": 3.97469746e-9,
  "happiness": 0.9999979,
  "neutral": 0.00000105481593,
  "sadness": 2.3354e-10,
  "surprise": 3.192666e-7

}, {
  "firstName": "Edward",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400348.jpeg",
  "lastName": "Royce",
  "link": "https://www.govtrack.us/congress/members/edward_royce/400348",
  "nickname": "Ed",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepEdRoyce",
  "youtube": "RepEdRoyce",
  "anger": 4.928219e-8,
  "contempt": 1.31510127e-8,
  "disgust": 1.90682385e-7,
  "fear": 4.59269156e-9,
  "happiness": 0.9999996,
  "neutral": 4.841848e-8,
  "sadness": 2.03284767e-8,
  "surprise": 9.711687e-8

}, {
  "firstName": "C.",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400349.jpeg",
  "lastName": "Ruppersberger",
  "link": "https://www.govtrack.us/congress/members/a_dutch_ruppersberger/400349",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MD",
  "twitter": "Call_Me_Dutch",
  "youtube": "ruppersberger",
  "anger": 2.15311019e-7,
  "contempt": 1.70885372e-7,
  "disgust": 0.000030435649,
  "fear": 3.418856e-11,
  "happiness": 0.999968231,
  "neutral": 2.25228632e-7,
  "sadness": 2.2209623e-10,
  "surprise": 7.18993363e-7

}, {
  "firstName": "Bobby",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400350.jpeg",
  "lastName": "Rush",
  "link": "https://www.govtrack.us/congress/members/bobby_rush/400350",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepBobbyRush",
  "youtube": "CongressmanRush",
  "anger": 0.0003292018,
  "contempt": 0.0130818374,
  "disgust": 0.00136962719,
  "fear": 0.000892673561,
  "happiness": 0.205770373,
  "neutral": 0.521705151,
  "sadness": 0.2558148,
  "surprise": 0.00103633641

}, {
  "firstName": "Paul",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400351.jpeg",
  "lastName": "Ryan",
  "link": "https://www.govtrack.us/congress/members/paul_ryan/400351",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WI",
  "twitter": "SpeakerRyan",
  "youtube": "reppaulryan",
  "anger": 0.00000326731129,
  "contempt": 8.03347746e-7,
  "disgust": 7.93392e-7,
  "fear": 0.00000185288673,
  "happiness": 0.9999914,
  "neutral": 5.094734e-7,
  "sadness": 0.00000119520064,
  "surprise": 1.47523892e-7

}, {
  "firstName": "Tim",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400352.jpeg",
  "lastName": "Ryan",
  "link": "https://www.govtrack.us/congress/members/tim_ryan/400352",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepTimRyan",
  "youtube": "timryanvision",
  "anger": 1.17167791e-13,
  "contempt": 2.606443e-12,
  "disgust": 2.763113e-14,
  "fear": 3.725229e-15,
  "happiness": 1,
  "neutral": 1.45476686e-11,
  "sadness": 1.12066916e-15,
  "surprise": 2.17083282e-10

}, {
  "firstName": "Linda",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400355.jpeg",
  "lastName": "Sánchez",
  "link": "https://www.govtrack.us/congress/members/linda_sanchez/400355",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepLindaSanchez",
  "youtube": "LindaTSanchez",
  "anger": 5.926804e-8,
  "contempt": 6.08423e-7,
  "disgust": 0.000008183047,
  "fear": 2.25480815e-10,
  "happiness": 0.9999691,
  "neutral": 0.0000216057269,
  "sadness": 1.74672891e-7,
  "surprise": 2.35260671e-7

}, {
  "firstName": "Janice",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400360.jpeg",
  "lastName": "Schakowsky",
  "link": "https://www.govtrack.us/congress/members/janice_schakowsky/400360",
  "nickname": "Jan",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "JanSchakowsky",
  "youtube": "repschakowsky",
  "anger": 0.00005795395,
  "contempt": 0.00000125565282,
  "disgust": 0.0000935061253,
  "fear": 6.30296242e-8,
  "happiness": 0.9998392,
  "neutral": 0.000004390942,
  "sadness": 0.0000012426251,
  "surprise": 0.00000238932739

}, {
  "firstName": "Adam",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400361.jpeg",
  "lastName": "Schiff",
  "link": "https://www.govtrack.us/congress/members/adam_schiff/400361",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepAdamSchiff",
  "youtube": "adamschiff",
  "anger": 1.52737822e-9,
  "contempt": 1.668239e-7,
  "disgust": 4.356211e-9,
  "fear": 1.89612085e-12,
  "happiness": 0.999248743,
  "neutral": 0.000751081447,
  "sadness": 1.27856969e-9,
  "surprise": 5.570658e-9

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400363.jpeg",
  "lastName": "Scott",
  "link": "https://www.govtrack.us/congress/members/david_scott/400363",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepDavidScott",
  "youtube": "RepDavidScott",
  "anger": 0.000451924076,
  "contempt": 2.93748144e-7,
  "disgust": 0.00003609269,
  "fear": 2.00085033e-8,
  "happiness": 0.999511361,
  "neutral": 1.38356157e-7,
  "sadness": 5.83849022e-8,
  "surprise": 1.26410853e-7

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400364.jpeg",
  "lastName": "Scott",
  "link": "https://www.govtrack.us/congress/members/robert_scott/400364",
  "nickname": "Bobby",
  "party": "Democrat",
  "role": "Representative",
  "state": "VA",
  "twitter": "BobbyScott",
  "youtube": "repbobbyscott",
  "anger": 1.11503431e-10,
  "contempt": 9.17882659e-8,
  "disgust": 1.92626959e-9,
  "fear": 1.15113e-13,
  "happiness": 0.9999883,
  "neutral": 0.0000115870353,
  "sadness": 2.58775029e-10,
  "surprise": 1.76516457e-9

}, {
  "firstName": "F.",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400365.jpeg",
  "lastName": "Sensenbrenner",
  "link": "https://www.govtrack.us/congress/members/james_sensenbrenner/400365",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WI",
  "twitter": "JimPressOffice",
  "youtube": "RepSensenbrenner",
  "anger": 0.0006180447,
  "contempt": 0.000195625224,
  "disgust": 0.00108666532,
  "fear": 1.30505509e-8,
  "happiness": 0.9903675,
  "neutral": 0.00772364,
  "sadness": 0.00000471609428,
  "surprise": 0.00000381035443

}, {
  "firstName": "José",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400366.jpeg",
  "lastName": "Serrano",
  "link": "https://www.govtrack.us/congress/members/jose_serrano/400366",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepJoseSerrano",
  "anger": 5.2700706e-9,
  "contempt": 8.055629e-10,
  "disgust": 8.23223545e-10,
  "fear": 7.16628959e-13,
  "happiness": 0.99999994,
  "neutral": 2.55942059e-8,
  "sadness": 4.57192235e-11,
  "surprise": 4.664019e-10

}, {
  "firstName": "Pete",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400367.jpeg",
  "lastName": "Sessions",
  "link": "https://www.govtrack.us/congress/members/pete_sessions/400367",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "PeteSessions",
  "youtube": "PeteSessions",
  "anger": 0.00000352019242,
  "contempt": 0.0000262617468,
  "disgust": 0.000006780639,
  "fear": 1.97795558e-9,
  "happiness": 0.996900141,
  "neutral": 0.003053167,
  "sadness": 5.886895e-7,
  "surprise": 0.000009564094

}, {
  "firstName": "Brad",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400371.jpeg",
  "lastName": "Sherman",
  "link": "https://www.govtrack.us/congress/members/brad_sherman/400371",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "BradSherman",
  "youtube": "shermanca27",
  "anger": 0.00004094904,
  "contempt": 0.000147691724,
  "disgust": 0.000125398612,
  "fear": 1.83834842e-7,
  "happiness": 0.996868849,
  "neutral": 0.00275327917,
  "sadness": 0.00003210555,
  "surprise": 0.000031522366

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400373.jpeg",
  "lastName": "Shimkus",
  "link": "https://www.govtrack.us/congress/members/john_shimkus/400373",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepShimkus",
  "youtube": "repshimkus",
  "anger": 0.0004735754,
  "contempt": 0.00177014619,
  "disgust": 0.000147013823,
  "fear": 2.29430711e-7,
  "happiness": 0.434448183,
  "neutral": 0.563062847,
  "sadness": 0.0000657904238,
  "surprise": 0.000032224445

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400376.jpeg",
  "lastName": "Simpson",
  "link": "https://www.govtrack.us/congress/members/michael_simpson/400376",
  "nickname": "Mike",
  "party": "Republican",
  "role": "Representative",
  "state": "ID",
  "twitter": "CongMikeSimpson",
  "youtube": "CongMikeSimpson",
  "anger": 0.00008217391,
  "contempt": 6.476868e-8,
  "disgust": 0.00007575213,
  "fear": 5.58058e-7,
  "happiness": 0.999832869,
  "neutral": 4.533398e-7,
  "sadness": 0.000004721207,
  "surprise": 0.00000340144

}, {
  "firstName": "Louise",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400378.jpeg",
  "lastName": "Slaughter",
  "link": "https://www.govtrack.us/congress/members/louise_slaughter/400378",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "LouiseSlaughter",
  "youtube": "louiseslaughter",
  "anger": 5.495307e-7,
  "contempt": 1.62088671e-8,
  "disgust": 0.00000157202,
  "fear": 0.000008668948,
  "happiness": 0.999788761,
  "neutral": 4.10309667e-7,
  "sadness": 2.10633218e-7,
  "surprise": 0.000199806091

}, {
  "firstName": "Adam",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400379.jpeg",
  "lastName": "Smith",
  "link": "https://www.govtrack.us/congress/members/adam_smith/400379",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WA",
  "twitter": "RepAdamSmith",
  "youtube": "CongressmanAdamSmith",
  "anger": 8.44251669e-10,
  "contempt": 7.03990033e-10,
  "disgust": 6.13618933e-10,
  "fear": 3.91950361e-11,
  "happiness": 1,
  "neutral": 1.5651147e-9,
  "sadness": 2.79715229e-9,
  "surprise": 1.1883623e-9

}, {
  "firstName": "Christopher",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400380.jpeg",
  "lastName": "Smith",
  "link": "https://www.govtrack.us/congress/members/christopher_smith/400380",
  "nickname": "Chris",
  "party": "Republican",
  "role": "Representative",
  "state": "NJ",
  "twitter": "RepChrisSmith",
  "youtube": "USRepChrisSmith",
  "anger": 3.0787998e-12,
  "contempt": 2.01904471e-9,
  "disgust": 1.2873784e-10,
  "fear": 6.76448e-16,
  "happiness": 0.99999994,
  "neutral": 6.62133246e-8,
  "sadness": 2.39517542e-12,
  "surprise": 5.13735131e-11

}, {
  "firstName": "Lamar",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400381.jpeg",
  "lastName": "Smith",
  "link": "https://www.govtrack.us/congress/members/lamar_smith/400381",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "LamarSmithTX21",
  "youtube": "lamarsmithtexas21",
  "anger": 0.00000407276457,
  "contempt": 0.0000154289628,
  "disgust": 0.00000857926,
  "fear": 9.104103e-10,
  "happiness": 0.99995,
  "neutral": 0.00002091911,
  "sadness": 9.761145e-7,
  "surprise": 5.75643178e-8

}, {
  "firstName": "Bennie",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400402.jpeg",
  "lastName": "Thompson",
  "link": "https://www.govtrack.us/congress/members/bennie_thompson/400402",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MS",
  "twitter": "BennieGThompson",
  "youtube": "RepBennieThompson",
  "anger": 0.0000095892965,
  "contempt": 0.000691429945,
  "disgust": 0.00002833781,
  "fear": 0.000009746568,
  "happiness": 0.487151474,
  "neutral": 0.509567738,
  "sadness": 0.000456399255,
  "surprise": 0.00208531274

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400403.jpeg",
  "lastName": "Thompson",
  "link": "https://www.govtrack.us/congress/members/mike_thompson/400403",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepThompson",
  "youtube": "CongressmanMThompson",
  "anger": 0.0000021190283,
  "contempt": 0.00006017493,
  "disgust": 0.000047846057,
  "fear": 2.95585473e-10,
  "happiness": 0.9985851,
  "neutral": 0.00130389479,
  "sadness": 8.527224e-8,
  "surprise": 7.94161338e-7

}, {
  "firstName": "Mac",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400404.jpeg",
  "lastName": "Thornberry",
  "link": "https://www.govtrack.us/congress/members/mac_thornberry/400404",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "MacTXPress",
  "youtube": "RepMacThornberry",
  "anger": 1.64936689e-10,
  "contempt": 1.79835979e-9,
  "disgust": 2.22260058e-10,
  "fear": 1.603843e-11,
  "happiness": 0.9999999,
  "neutral": 1.06933783e-7,
  "sadness": 4.71312919e-11,
  "surprise": 3.08823971e-8

}, {
  "firstName": "Patrick",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400406.jpeg",
  "lastName": "Tiberi",
  "link": "https://www.govtrack.us/congress/members/patrick_tiberi/400406",
  "nickname": "Pat",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "pattiberi",
  "youtube": "PatTiberi",
  "anger": 1.09007821e-7,
  "contempt": 4.61455478e-8,
  "disgust": 3.30123449e-8,
  "fear": 1.423552e-9,
  "happiness": 0.9999989,
  "neutral": 8.4007246e-7,
  "sadness": 3.115059e-8,
  "surprise": 4.12826324e-8

}, {
  "firstName": "Patrick",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400408.jpeg",
  "lastName": "Toomey",
  "link": "https://www.govtrack.us/congress/members/patrick_toomey/400408",
  "nickname": "Pat",
  "party": "Republican",
  "role": "Senator",
  "state": "PA",
  "twitter": "SenToomey",
  "youtube": "sentoomey",
  "anger": 0.01786005,
  "contempt": 0.0000134277407,
  "disgust": 0.00225320365,
  "fear": 0.000001280394,
  "happiness": 0.9791906,
  "neutral": 0.000674784358,
  "sadness": 0.000002127018,
  "surprise": 0.000004534009

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400411.jpeg",
  "lastName": "Turner",
  "link": "https://www.govtrack.us/congress/members/michael_turner/400411",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepMikeTurner",
  "youtube": "CongressmanTurner",
  "anger": 0.00000219706453,
  "contempt": 3.53710945e-8,
  "disgust": 7.18928845e-7,
  "fear": 3.48002538e-9,
  "happiness": 0.9999968,
  "neutral": 1.70373426e-7,
  "sadness": 1.23208768e-8,
  "surprise": 9.37534352e-8

}, {
  "firstName": "Fred",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400414.jpeg",
  "lastName": "Upton",
  "link": "https://www.govtrack.us/congress/members/fred_upton/400414",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepFredUpton",
  "youtube": "RepFredUpton",
  "anger": 1.17560631e-7,
  "contempt": 0.000006374233,
  "disgust": 1.75970513e-7,
  "fear": 1.1897526e-10,
  "happiness": 0.998807251,
  "neutral": 0.00118586235,
  "sadness": 1.54870374e-8,
  "surprise": 2.13041332e-7

}, {
  "firstName": "Chris",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400415.jpeg",
  "lastName": "Van Hollen",
  "link": "https://www.govtrack.us/congress/members/chris_van_hollen/400415",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "MD",
  "twitter": "ChrisVanHollen",
  "youtube": "RepChrisVanHollen",
  "anger": 1.9433574e-7,
  "contempt": 5.28448766e-7,
  "disgust": 5.465104e-7,
  "fear": 4.612024e-8,
  "happiness": 0.999969065,
  "neutral": 0.000025555406,
  "sadness": 1.4678804e-7,
  "surprise": 0.00000391299864

}, {
  "firstName": "Nydia",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400416.jpeg",
  "lastName": "Velázquez",
  "link": "https://www.govtrack.us/congress/members/nydia_velazquez/400416",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "NydiaVelazquez",
  "youtube": "nydiavelazquez",
  "anger": 0.003834494,
  "contempt": 0.00214533065,
  "disgust": 0.0165426675,
  "fear": 0.00333206658,
  "happiness": 0.7949289,
  "neutral": 0.11776875,
  "sadness": 0.0305306241,
  "surprise": 0.03091718

}, {
  "firstName": "Peter",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400417.jpeg",
  "lastName": "Visclosky",
  "link": "https://www.govtrack.us/congress/members/peter_visclosky/400417",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IN",
  "twitter": "RepVisclosky",
  "youtube": "PeteVisclosky1",
  "anger": 5.855996e-7,
  "contempt": 4.903275e-7,
  "disgust": 0.00000599786654,
  "fear": 8.54280646e-9,
  "happiness": 0.9999144,
  "neutral": 3.06545445e-7,
  "sadness": 0.00007821354,
  "surprise": 4.60205074e-9

}, {
  "firstName": "Greg",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400419.jpeg",
  "lastName": "Walden",
  "link": "https://www.govtrack.us/congress/members/greg_walden/400419",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OR",
  "twitter": "RepGregWalden",
  "youtube": "RepGregWalden",
  "anger": 2.4505673e-9,
  "contempt": 6.57769464e-11,
  "disgust": 5.360664e-9,
  "fear": 1.43177505e-12,
  "happiness": 1,
  "neutral": 1.29514149e-10,
  "sadness": 5.58145544e-12,
  "surprise": 9.16793641e-10

}, {
  "firstName": "Maxine",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400422.jpeg",
  "lastName": "Waters",
  "link": "https://www.govtrack.us/congress/members/maxine_waters/400422",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepMaxineWaters",
  "youtube": "MaxineWaters",
  "anger": 0.00340719568,
  "contempt": 0.006617013,
  "disgust": 0.004401752,
  "fear": 0.00197249977,
  "happiness": 0.557948053,
  "neutral": 0.398542762,
  "sadness": 0.006284861,
  "surprise": 0.0208258741

}, {
  "firstName": "Joe",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400433.jpeg",
  "lastName": "Wilson",
  "link": "https://www.govtrack.us/congress/members/joe_wilson/400433",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "SC",
  "twitter": "RepJoeWilson",
  "youtube": "RepJoeWilson",
  "anger": 6.088221e-11,
  "contempt": 9.545189e-9,
  "disgust": 9.712786e-10,
  "fear": 2.50163236e-12,
  "happiness": 0.9999993,
  "neutral": 6.44919965e-7,
  "sadness": 1.77225318e-11,
  "surprise": 3.40166544e-8

}, {
  "firstName": "Don",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400440.jpeg",
  "lastName": "Young",
  "link": "https://www.govtrack.us/congress/members/don_young/400440",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AK",
  "twitter": "RepDonYoung",
  "youtube": "RepDonYoung",
  "anger": 8.372124e-9,
  "contempt": 3.739246e-11,
  "disgust": 5.017297e-9,
  "fear": 9.994414e-12,
  "happiness": 0.99999994,
  "neutral": 2.02924575e-8,
  "sadness": 4.21003926e-10,
  "surprise": 6.329382e-9

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400546.jpeg",
  "lastName": "Thune",
  "link": "https://www.govtrack.us/congress/members/john_thune/400546",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "SD",
  "twitter": "SenJohnThune",
  "youtube": "johnthune",
  "anger": 1.33000295e-11,
  "contempt": 5.142579e-14,
  "disgust": 3.743681e-13,
  "fear": 3.04405261e-15,
  "happiness": 1,
  "neutral": 1.94912839e-13,
  "sadness": 4.094471e-15,
  "surprise": 5.6568643e-12

}, {
  "firstName": "Marshall",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400607.jpeg",
  "lastName": "Sanford",
  "link": "https://www.govtrack.us/congress/members/marshall_sanford/400607",
  "nickname": "Mark",
  "party": "Republican",
  "role": "Representative",
  "state": "SC",
  "twitter": "RepSanfordSC",
  "youtube": "RepSanfordSC",
  "anger": 1.88340479e-7,
  "contempt": 0.00000193721121,
  "disgust": 8.94415052e-7,
  "fear": 6.034648e-7,
  "happiness": 0.999774456,
  "neutral": 0.000198340626,
  "sadness": 0.00000100786838,
  "surprise": 0.0000225723179

}, {
  "firstName": "George",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400616.jpeg",
  "lastName": "Butterfield",
  "link": "https://www.govtrack.us/congress/members/george_butterfield/400616",
  "nickname": "G.K.",
  "party": "Democrat",
  "role": "Representative",
  "state": "NC",
  "twitter": "GKButterfield",
  "youtube": "GKBNC01",
  "anger": 4.806914e-8,
  "contempt": 8.71669442e-7,
  "disgust": 0.00000182896736,
  "fear": 1.96698782e-10,
  "happiness": 0.9999395,
  "neutral": 0.0000570446355,
  "sadness": 1.01192548e-7,
  "surprise": 6.23453332e-7

}, {
  "firstName": "Jim",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400618.jpeg",
  "lastName": "Costa",
  "link": "https://www.govtrack.us/congress/members/jim_costa/400618",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepJimCosta",
  "youtube": "RepJimCostaCA20",
  "anger": 8.50487e-10,
  "contempt": 4.184142e-14,
  "disgust": 2.720706e-10,
  "fear": 1.47860647e-11,
  "happiness": 1,
  "neutral": 1.99865888e-11,
  "sadness": 2.16217756e-12,
  "surprise": 4.467024e-9

}, {
  "firstName": "Debbie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400623.jpeg",
  "lastName": "Wasserman Schultz",
  "link": "https://www.govtrack.us/congress/members/debbie_wasserman_schultz/400623",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepDWStweets",
  "youtube": "RepWassermanSchultz",
  "anger": 0.000179948562,
  "contempt": 9.158765e-8,
  "disgust": 0.0000571284181,
  "fear": 7.403938e-7,
  "happiness": 0.9997535,
  "neutral": 7.967722e-8,
  "sadness": 1.25760323e-7,
  "surprise": 0.000008426136

}, {
  "firstName": "Daniel",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400630.jpeg",
  "lastName": "Lipinski",
  "link": "https://www.govtrack.us/congress/members/daniel_lipinski/400630",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepLipinski",
  "youtube": "lipinski03",
  "anger": 0.000304264162,
  "contempt": 0.000406752253,
  "disgust": 0.000189478014,
  "fear": 0.00002167078,
  "happiness": 0.9857328,
  "neutral": 0.00725089759,
  "sadness": 0.00000350838013,
  "surprise": 0.006090619

}, {
  "firstName": "Emanuel",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400639.jpeg",
  "lastName": "Cleaver",
  "link": "https://www.govtrack.us/congress/members/emanuel_cleaver/400639",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MO",
  "twitter": "RepCleaver",
  "youtube": "repcleaver",
  "anger": 0.00179591868,
  "contempt": 0.00418559136,
  "disgust": 0.0008233842,
  "fear": 0.000163636389,
  "happiness": 0.139576882,
  "neutral": 0.844383,
  "sadness": 0.000883224129,
  "surprise": 0.008188358

}, {
  "firstName": "Jeff",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400640.jpeg",
  "lastName": "Fortenberry",
  "link": "https://www.govtrack.us/congress/members/jeff_fortenberry/400640",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NE",
  "twitter": "JeffFortenberry",
  "youtube": "JeffFortenberry",
  "anger": 3.43498063e-10,
  "contempt": 2.142434e-10,
  "disgust": 1.929954e-10,
  "fear": 1.99784782e-14,
  "happiness": 1,
  "neutral": 2.37257236e-9,
  "sadness": 7.35192235e-13,
  "surprise": 7.96092359e-11

}, {
  "firstName": "Brian",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400641.jpeg",
  "lastName": "Higgins",
  "link": "https://www.govtrack.us/congress/members/brian_higgins/400641",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepBrianHiggins",
  "youtube": "CongressmanHiggins",
  "anger": 1.633445e-8,
  "contempt": 2.6982681e-8,
  "disgust": 6.62868e-9,
  "fear": 6.810604e-12,
  "happiness": 0.9999994,
  "neutral": 5.06456558e-7,
  "sadness": 5.352362e-10,
  "surprise": 2.772887e-8

}, {
  "firstName": "Virginia",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400643.jpeg",
  "lastName": "Foxx",
  "link": "https://www.govtrack.us/congress/members/virginia_foxx/400643",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "VirginiaFoxx",
  "youtube": "repvirginiafoxx",
  "anger": 2.704254e-7,
  "contempt": 7.82943346e-8,
  "disgust": 6.10166751e-7,
  "fear": 6.17801144e-10,
  "happiness": 0.999998569,
  "neutral": 3.40614434e-7,
  "sadness": 1.80570687e-8,
  "surprise": 9.321512e-8

}, {
  "firstName": "Patrick",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400644.jpeg",
  "lastName": "McHenry",
  "link": "https://www.govtrack.us/congress/members/patrick_mchenry/400644",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "PatrickMcHenry",
  "youtube": "CongressmanMcHenry",
  "anger": 1.25626579e-10,
  "contempt": 4.03566531e-8,
  "disgust": 1.29854982e-9,
  "fear": 1.0927744e-11,
  "happiness": 0.999999344,
  "neutral": 5.93005041e-7,
  "sadness": 4.14671533e-8,
  "surprise": 3.22627286e-10

}, {
  "firstName": "Charles",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400648.jpeg",
  "lastName": "Dent",
  "link": "https://www.govtrack.us/congress/members/charles_dent/400648",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepCharlieDent",
  "youtube": "CongressmanDent",
  "anger": 2.09602433e-7,
  "contempt": 1.559363e-7,
  "disgust": 0.00000111500549,
  "fear": 6.168615e-10,
  "happiness": 0.9999909,
  "neutral": 0.00000674561625,
  "sadness": 2.611449e-9,
  "surprise": 8.937917e-7

}, {
  "firstName": "Louie",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400651.jpeg",
  "lastName": "Gohmert",
  "link": "https://www.govtrack.us/congress/members/louie_gohmert/400651",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepLouieGohmert",
  "youtube": "GohmertTX01",
  "anger": 7.800468e-7,
  "contempt": 0.00000153022575,
  "disgust": 9.294929e-7,
  "fear": 1.587374e-8,
  "happiness": 0.999988,
  "neutral": 0.00000805216951,
  "sadness": 2.1470504e-7,
  "surprise": 4.69478e-7

}, {
  "firstName": "Ted",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400652.jpeg",
  "lastName": "Poe",
  "link": "https://www.govtrack.us/congress/members/ted_poe/400652",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "JudgeTedPoe",
  "youtube": "CongressmanTedPoe",
  "anger": 0.000293201418,
  "contempt": 0.0000118160724,
  "disgust": 0.00184868777,
  "fear": 3.025093e-7,
  "happiness": 0.9976495,
  "neutral": 0.0000409874374,
  "sadness": 0.000151120155,
  "surprise": 0.000004370751

}, {
  "firstName": "Al",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400653.jpeg",
  "lastName": "Green",
  "link": "https://www.govtrack.us/congress/members/al_green/400653",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepAlGreen",
  "youtube": "RepAlGreen",
  "anger": 0.0290901363,
  "contempt": 0.007257686,
  "disgust": 0.060108427,
  "fear": 0.0005171101,
  "happiness": 0.6431527,
  "neutral": 0.249178633,
  "sadness": 0.008215954,
  "surprise": 0.002479358

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400654.jpeg",
  "lastName": "McCaul",
  "link": "https://www.govtrack.us/congress/members/michael_mccaul/400654",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepMcCaul",
  "youtube": "MichaelTMcCaul",
  "anger": 5.554638e-8,
  "contempt": 6.749886e-9,
  "disgust": 3.79137468e-8,
  "fear": 4.63011834e-12,
  "happiness": 0.9999996,
  "neutral": 3.39091457e-7,
  "sadness": 2.25827379e-9,
  "surprise": 1.21117161e-9

}, {
  "firstName": "K.",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400655.jpeg",
  "lastName": "Conaway",
  "link": "https://www.govtrack.us/congress/members/michael_conaway/400655",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "ConawayTX11",
  "youtube": "mikeconaway11",
  "anger": 1.79850481e-8,
  "contempt": 9.867251e-10,
  "disgust": 2.1366656e-8,
  "fear": 3.868597e-11,
  "happiness": 0.9999999,
  "neutral": 7.99495936e-8,
  "sadness": 1.03240783e-9,
  "surprise": 1.87729587e-9

}, {
  "firstName": "Kenny",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400656.jpeg",
  "lastName": "Marchant",
  "link": "https://www.govtrack.us/congress/members/kenny_marchant/400656",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepKenMarchant",
  "youtube": "RepKennyMarchant",
  "anger": 0.00170240272,
  "contempt": 0.00726844557,
  "disgust": 0.00146694726,
  "fear": 1.11527093e-7,
  "happiness": 0.645735145,
  "neutral": 0.343587667,
  "sadness": 0.00023605999,
  "surprise": 0.00000324098733

}, {
  "firstName": "Henry",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400657.jpeg",
  "lastName": "Cuellar",
  "link": "https://www.govtrack.us/congress/members/henry_cuellar/400657",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepCuellar",
  "youtube": "henrycuellar",
  "anger": 1.08418892e-10,
  "contempt": 3.976918e-10,
  "disgust": 5.335099e-10,
  "fear": 1.71063765e-13,
  "happiness": 1,
  "neutral": 1.48500181e-8,
  "sadness": 1.86899714e-12,
  "surprise": 3.66162856e-9

}, {
  "firstName": "Cathy",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400659.jpeg",
  "lastName": "McMorris Rodgers",
  "link": "https://www.govtrack.us/congress/members/cathy_mcmorris_rodgers/400659",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WA",
  "twitter": "CathyMcMorris",
  "youtube": "mcmorrisrodgers",
  "anger": 5.78611659e-10,
  "contempt": 7.15203764e-12,
  "disgust": 4.9086657e-10,
  "fear": 2.19076181e-13,
  "happiness": 1,
  "neutral": 1.10738758e-10,
  "sadness": 1.64963061e-11,
  "surprise": 3.12337683e-10

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400660.jpeg",
  "lastName": "Reichert",
  "link": "https://www.govtrack.us/congress/members/david_reichert/400660",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WA",
  "twitter": "DaveReichert",
  "youtube": "repdavereichert",
  "anger": 1.32937084e-8,
  "contempt": 1.474951e-10,
  "disgust": 5.38885772e-8,
  "fear": 7.882832e-12,
  "happiness": 0.9999999,
  "neutral": 1.063418e-9,
  "sadness": 2.67987676e-8,
  "surprise": 2.20901e-9

}, {
  "firstName": "Gwen",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400661.jpeg",
  "lastName": "Moore",
  "link": "https://www.govtrack.us/congress/members/gwen_moore/400661",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WI",
  "twitter": "RepGwenMoore",
  "youtube": "RepGwenMoore",
  "anger": 0.0003926296,
  "contempt": 0.00601145066,
  "disgust": 0.0001889709,
  "fear": 0.000008661984,
  "happiness": 0.3034587,
  "neutral": 0.688521862,
  "sadness": 0.0009441492,
  "surprise": 0.000473578228

}, {
  "firstName": "Doris",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/400663.jpeg",
  "lastName": "Matsui",
  "link": "https://www.govtrack.us/congress/members/doris_matsui/400663",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "DorisMatsui",
  "youtube": "RepDorisMatsui",
  "anger": 6.95581148e-10,
  "contempt": 6.324264e-9,
  "disgust": 7.96807e-9,
  "fear": 2.76750756e-9,
  "happiness": 0.999999762,
  "neutral": 7.907751e-9,
  "sadness": 7.821353e-8,
  "surprise": 1.63281086e-7

}, {
  "firstName": "Richard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/408211.jpeg",
  "lastName": "Nolan",
  "link": "https://www.govtrack.us/congress/members/richard_nolan/408211",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MN",
  "twitter": "USRepRickNolan",
  "youtube": "USRepRickNolan",
  "anger": 7.96189141e-8,
  "contempt": 8.361898e-8,
  "disgust": 0.000001404437,
  "fear": 2.00496234e-11,
  "happiness": 0.9999903,
  "neutral": 0.000006154615,
  "sadness": 0.00000196391647,
  "surprise": 6.96050062e-9

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/409888.jpeg",
  "lastName": "Shuster",
  "link": "https://www.govtrack.us/congress/members/bill_shuster/409888",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepBillShuster",
  "youtube": "repshuster",
  "anger": 1.56146862e-12,
  "contempt": 1.24419919e-12,
  "disgust": 3.08216265e-11,
  "fear": 4.69937932e-18,
  "happiness": 1,
  "neutral": 5.950278e-11,
  "sadness": 1.52529577e-14,
  "surprise": 2.54536561e-12

}, {
  "firstName": "Albio",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412186.jpeg",
  "lastName": "Sires",
  "link": "https://www.govtrack.us/congress/members/albio_sires/412186",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NJ",
  "twitter": "RepSires",
  "youtube": "RepSiresNJ13",
  "anger": 1.36648759e-9,
  "contempt": 2.30748323e-10,
  "disgust": 2.38204922e-9,
  "fear": 2.99948239e-12,
  "happiness": 1,
  "neutral": 2.78387779e-9,
  "sadness": 3.65798281e-10,
  "surprise": 2.15547846e-8

}, {
  "firstName": "Jerry",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412189.jpeg",
  "lastName": "McNerney",
  "link": "https://www.govtrack.us/congress/members/jerry_mcnerney/412189",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepMcNerney",
  "youtube": "RepJerryMcNerney",
  "anger": 0.000011047614,
  "contempt": 0.00007737352,
  "disgust": 0.000061744875,
  "fear": 3.39903963e-8,
  "happiness": 0.9929976,
  "neutral": 0.006842381,
  "sadness": 0.0000073623296,
  "surprise": 0.000002464205

}, {
  "firstName": "Kevin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412190.jpeg",
  "lastName": "McCarthy",
  "link": "https://www.govtrack.us/congress/members/kevin_mccarthy/412190",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "GOPLeader",
  "youtube": "repkevinmccarthy",
  "anger": 3.92470668e-7,
  "contempt": 0.00000172272746,
  "disgust": 0.0000115403773,
  "fear": 4.465984e-11,
  "happiness": 0.999974132,
  "neutral": 0.0000120988261,
  "sadness": 7.691878e-9,
  "surprise": 1.07969683e-7

}, {
  "firstName": "Doug",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412191.jpeg",
  "lastName": "Lamborn",
  "link": "https://www.govtrack.us/congress/members/doug_lamborn/412191",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CO",
  "twitter": "RepDLamborn",
  "youtube": "CongressmanLamborn",
  "anger": 0.00000428236763,
  "contempt": 0.00004690265,
  "disgust": 0.0000762684358,
  "fear": 1.01094144e-9,
  "happiness": 0.993920147,
  "neutral": 0.005950809,
  "sadness": 6.334747e-7,
  "surprise": 9.41914266e-7

}, {
  "firstName": "Ed",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412192.jpeg",
  "lastName": "Perlmutter",
  "link": "https://www.govtrack.us/congress/members/ed_perlmutter/412192",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CO",
  "twitter": "RepPerlmutter",
  "youtube": "RepPerlmutter",
  "anger": 7.01279529e-12,
  "contempt": 2.01767686e-14,
  "disgust": 7.13204e-12,
  "fear": 2.14855053e-15,
  "happiness": 1,
  "neutral": 7.770778e-13,
  "sadness": 8.17398449e-14,
  "surprise": 1.34343404e-11

}, {
  "firstName": "Joe",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412193.jpeg",
  "lastName": "Courtney",
  "link": "https://www.govtrack.us/congress/members/joe_courtney/412193",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CT",
  "twitter": "RepJoeCourtney",
  "youtube": "repcourtney",
  "anger": 2.10805921e-11,
  "contempt": 2.64621762e-11,
  "disgust": 7.131418e-11,
  "fear": 6.071265e-13,
  "happiness": 1,
  "neutral": 1.00197339e-9,
  "sadness": 2.78844534e-11,
  "surprise": 5.443937e-10

}, {
  "firstName": "Kathy",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412195.jpeg",
  "lastName": "Castor",
  "link": "https://www.govtrack.us/congress/members/kathy_castor/412195",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "USRepKCastor",
  "youtube": "RepKathyCastor",
  "anger": 0.00000596117843,
  "contempt": 5.30467e-7,
  "disgust": 0.000006920102,
  "fear": 0.00000165620588,
  "happiness": 0.9999624,
  "neutral": 0.000003335306,
  "sadness": 4.96146022e-8,
  "surprise": 0.0000191537183

}, {
  "firstName": "Vern",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412196.jpeg",
  "lastName": "Buchanan",
  "link": "https://www.govtrack.us/congress/members/vern_buchanan/412196",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "VernBuchanan",
  "youtube": "vernbuchanan",
  "anger": 0.000655811164,
  "contempt": 0.006613687,
  "disgust": 0.00150519784,
  "fear": 0.00000301317277,
  "happiness": 0.818816662,
  "neutral": 0.162043542,
  "sadness": 0.000027315642,
  "surprise": 0.0103347544

}, {
  "firstName": "Henry",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412199.jpeg",
  "lastName": "Johnson",
  "link": "https://www.govtrack.us/congress/members/henry_johnson/412199",
  "nickname": "Hank",
  "party": "Democrat",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepHankJohnson",
  "youtube": "RepHankJohnson",
  "anger": 0.000008644918,
  "contempt": 0.0000226770171,
  "disgust": 0.000028900693,
  "fear": 5.27265968e-7,
  "happiness": 0.9959094,
  "neutral": 0.003621825,
  "sadness": 0.00000120458719,
  "surprise": 0.0004068104

}, {
  "firstName": "Peter",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412202.jpeg",
  "lastName": "Roskam",
  "link": "https://www.govtrack.us/congress/members/peter_roskam/412202",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IL",
  "twitter": "PeterRoskam",
  "youtube": "RoskamIL06",
  "anger": 0.000242431081,
  "contempt": 0.00144828018,
  "disgust": 0.000623027037,
  "fear": 0.00000126150815,
  "happiness": 0.675225854,
  "neutral": 0.322220266,
  "sadness": 0.0001478053,
  "surprise": 0.0000910913

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412209.jpeg",
  "lastName": "Loebsack",
  "link": "https://www.govtrack.us/congress/members/david_loebsack/412209",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IA",
  "twitter": "DaveLoebsack",
  "youtube": "congressmanloebsack",
  "anger": 0.000250550569,
  "contempt": 0.003391794,
  "disgust": 0.000451868,
  "fear": 0.000002810026,
  "happiness": 0.988143563,
  "neutral": 0.007652512,
  "sadness": 0.0000395611278,
  "surprise": 0.00006735623

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412211.jpeg",
  "lastName": "Yarmuth",
  "link": "https://www.govtrack.us/congress/members/john_yarmuth/412211",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "KY",
  "twitter": "RepJohnYarmuth",
  "youtube": "RepJohnYarmuth",
  "anger": 1.59783138e-8,
  "contempt": 0.000001692761,
  "disgust": 7.632371e-8,
  "fear": 2.4527535e-12,
  "happiness": 0.9999968,
  "neutral": 0.00000144270155,
  "sadness": 4.20892e-9,
  "surprise": 9.540354e-10

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412212.jpeg",
  "lastName": "Sarbanes",
  "link": "https://www.govtrack.us/congress/members/john_sarbanes/412212",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MD",
  "twitter": "RepSarbanes",
  "anger": 7.687251e-9,
  "contempt": 0.00000158408261,
  "disgust": 2.81215851e-8,
  "fear": 5.2491054e-12,
  "happiness": 0.999994159,
  "neutral": 0.00000420784,
  "sadness": 7.18281337e-11,
  "surprise": 1.34211184e-8

}, {
  "firstName": "Tim",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412213.jpeg",
  "lastName": "Walberg",
  "link": "https://www.govtrack.us/congress/members/tim_walberg/412213",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepWalberg",
  "youtube": "RepWalberg",
  "anger": 0.0000129490236,
  "contempt": 0.00000448335,
  "disgust": 0.000005542559,
  "fear": 9.784521e-11,
  "happiness": 0.999870062,
  "neutral": 0.000105994164,
  "sadness": 1.48890971e-8,
  "surprise": 9.452009e-7

}, {
  "firstName": "Timothy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412214.jpeg",
  "lastName": "Walz",
  "link": "https://www.govtrack.us/congress/members/timothy_walz/412214",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MN",
  "twitter": "RepTimWalz",
  "youtube": "1529tjw",
  "anger": 4.39013756e-11,
  "contempt": 1.13701475e-8,
  "disgust": 2.45570586e-8,
  "fear": 3.12289189e-15,
  "happiness": 0.9999999,
  "neutral": 8.37331e-8,
  "sadness": 1.25215727e-9,
  "surprise": 5.863302e-1

}, {
  "firstName": "Keith",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412215.jpeg",
  "lastName": "Ellison",
  "link": "https://www.govtrack.us/congress/members/keith_ellison/412215",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MN",
  "twitter": "KeithEllison",
  "youtube": "RepKeithEllison",
  "anger": 5.962963e-8,
  "contempt": 0.00005220815,
  "disgust": 4.44179058e-8,
  "fear": 8.1066126e-10,
  "happiness": 0.0027834815,
  "neutral": 0.99715966,
  "sadness": 0.00000113811325,
  "surprise": 0.00000340782572

}, {
  "firstName": "Adrian",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412217.jpeg",
  "lastName": "Smith",
  "link": "https://www.govtrack.us/congress/members/adrian_smith/412217",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NE",
  "twitter": "RepAdrianSmith",
  "youtube": "RepAdrianSmith",
  "anger": 0.0000027525,
  "contempt": 0.00006376935,
  "disgust": 0.00004334209,
  "fear": 3.59218149e-7,
  "happiness": 0.9993426,
  "neutral": 0.000518846035,
  "sadness": 0.000004479028,
  "surprise": 0.0000238574721

}, {
  "firstName": "Carol",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412219.jpeg",
  "lastName": "Shea-Porter",
  "link": "https://www.govtrack.us/congress/members/carol_shea_porter/412219",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NH",
  "twitter": "repsheaporter",
  "anger": 0.00000305282788,
  "contempt": 3.83534427e-7,
  "disgust": 0.0000753719942,
  "fear": 1.69557135e-9,
  "happiness": 0.9999139,
  "neutral": 0.0000030247636,
  "sadness": 2.27656338e-9,
  "surprise": 0.00000432018123

}, {
  "firstName": "Yvette",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412221.jpeg",
  "lastName": "Clarke",
  "link": "https://www.govtrack.us/congress/members/yvette_clarke/412221",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepYvetteClarke",
  "youtube": "repyvetteclarke",
  "anger": 0.0287116673,
  "contempt": 0.0001506696,
  "disgust": 0.00459900824,
  "fear": 0.000945472566,
  "happiness": 0.959378064,
  "neutral": 0.00326419086,
  "sadness": 0.000388701155,
  "surprise": 0.00256220042

}, {
  "firstName": "Jim",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412226.jpeg",
  "lastName": "Jordan",
  "link": "https://www.govtrack.us/congress/members/jim_jordan/412226",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "Jim_Jordan",
  "youtube": "RepJimJordan",
  "anger": 3.007807e-8,
  "contempt": 0.00000582715074,
  "disgust": 0.00000103302011,
  "fear": 7.319357e-11,
  "happiness": 0.9996567,
  "neutral": 0.0003358237,
  "sadness": 5.160204e-7,
  "surprise": 7.25498737e-8

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412236.jpeg",
  "lastName": "Cohen",
  "link": "https://www.govtrack.us/congress/members/steve_cohen/412236",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TN",
  "twitter": "RepCohen",
  "youtube": "repcohen",
  "anger": 2.26184209e-8,
  "contempt": 6.021639e-7,
  "disgust": 0.00000123567315,
  "fear": 9.913106e-12,
  "happiness": 0.999991,
  "neutral": 0.000007099912,
  "sadness": 2.8474048e-8,
  "surprise": 1.71432415e-8

}, {
  "firstName": "Peter",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412239.jpeg",
  "lastName": "Welch",
  "link": "https://www.govtrack.us/congress/members/peter_welch/412239",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "VT",
  "twitter": "PeterWelch",
  "youtube": "reppeterwelch",
  "anger": 5.706542e-7,
  "contempt": 0.00000106582149,
  "disgust": 0.000009406707,
  "fear": 2.22311058e-12,
  "happiness": 0.9999462,
  "neutral": 0.000042749034,
  "sadness": 1.50221e-9,
  "surprise": 3.523094e-8

}, {
  "firstName": "Gus",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412250.jpeg",
  "lastName": "Bilirakis",
  "link": "https://www.govtrack.us/congress/members/gus_bilirakis/412250",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepGusBilirakis",
  "youtube": "RepGusBilirakis",
  "anger": 0.0000185396639,
  "contempt": 0.000755932939,
  "disgust": 0.000028628061,
  "fear": 6.010349e-8,
  "happiness": 0.9770617,
  "neutral": 0.02211871,
  "sadness": 0.0000157048762,
  "surprise": 7.13280144e-7

}, {
  "firstName": "Niki",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412254.jpeg",
  "lastName": "Tsongas",
  "link": "https://www.govtrack.us/congress/members/niki_tsongas/412254",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "NikiInTheHouse",
  "youtube": "RepTsongas",
  "anger": 4.66035637e-8,
  "contempt": 0.00005800978,
  "disgust": 1.18808146e-7,
  "fear": 4.5137682e-8,
  "happiness": 0.9748389,
  "neutral": 0.0250862539,
  "sadness": 0.0000027133915,
  "surprise": 0.0000139149925

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412255.jpeg",
  "lastName": "Wittman",
  "link": "https://www.govtrack.us/congress/members/robert_wittman/412255",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "VA",
  "twitter": "RobWittman",
  "youtube": "RobWittman",
  "anger": 4.783705e-10,
  "contempt": 3.56755834e-8,
  "disgust": 2.45315968e-9,
  "fear": 9.560413e-13,
  "happiness": 0.999992967,
  "neutral": 0.000006975069,
  "sadness": 2.98384123e-10,
  "surprise": 1.226867e-9

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412256.jpeg",
  "lastName": "Latta",
  "link": "https://www.govtrack.us/congress/members/robert_latta/412256",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "BobLatta",
  "youtube": "CongressmanBobLatta",
  "anger": 2.56553022e-7,
  "contempt": 0.0000132335635,
  "disgust": 0.00000209208133,
  "fear": 7.296219e-10,
  "happiness": 0.999904156,
  "neutral": 0.0000790951453,
  "sadness": 6.014249e-8,
  "surprise": 0.00000112801217

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412257.jpeg",
  "lastName": "Foster",
  "link": "https://www.govtrack.us/congress/members/bill_foster/412257",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepBillFoster",
  "youtube": "RepBillFoster",
  "anger": 0.000004082128,
  "contempt": 0.00007849819,
  "disgust": 0.0000146299872,
  "fear": 2.45646383e-8,
  "happiness": 0.963423252,
  "neutral": 0.0363656953,
  "sadness": 0.0000046398477,
  "surprise": 0.000109182431

}, {
  "firstName": "André",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412258.jpeg",
  "lastName": "Carson",
  "link": "https://www.govtrack.us/congress/members/andre_carson/412258",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IN",
  "twitter": "RepAndreCarson",
  "youtube": "repandrecarson",
  "anger": 1.34846317e-7,
  "contempt": 2.28638754e-7,
  "disgust": 7.38218262e-7,
  "fear": 2.86679764e-8,
  "happiness": 0.999996066,
  "neutral": 2.5169652e-7,
  "sadness": 0.000002069729,
  "surprise": 4.69315268e-7

}, {
  "firstName": "Jackie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412259.jpeg",
  "lastName": "Speier",
  "link": "https://www.govtrack.us/congress/members/jackie_speier/412259",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepSpeier",
  "youtube": "jackiespeierca12",
  "anger": 0.00000364408083,
  "contempt": 1.51551767e-8,
  "disgust": 0.000002092947,
  "fear": 9.23410848e-10,
  "happiness": 0.9999935,
  "neutral": 1.95560013e-8,
  "sadness": 8.44436243e-10,
  "surprise": 7.078616e-7

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412261.jpeg",
  "lastName": "Scalise",
  "link": "https://www.govtrack.us/congress/members/steve_scalise/412261",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "LA",
  "twitter": "SteveScalise",
  "youtube": "RepSteveScalise",
  "anger": 4.17194834e-10,
  "contempt": 1.60909384e-8,
  "disgust": 5.16491667e-8,
  "fear": 8.32099459e-11,
  "happiness": 0.999997735,
  "neutral": 0.00000112890984,
  "sadness": 3.55602076e-11,
  "surprise": 0.00000108437894

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412271.jpeg",
  "lastName": "Coffman",
  "link": "https://www.govtrack.us/congress/members/mike_coffman/412271",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CO",
  "twitter": "RepMikeCoffman",
  "youtube": "CongressmanCoffman",
  "anger": 2.182267e-9,
  "contempt": 4.81871834e-11,
  "disgust": 2.54636978e-9,
  "fear": 1.1903743e-13,
  "happiness": 1,
  "neutral": 4.71770356e-9,
  "sadness": 1.53898685e-10,
  "surprise": 9.5075e-11

}, {
  "firstName": "Gerald",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412272.jpeg",
  "lastName": "Connolly",
  "link": "https://www.govtrack.us/congress/members/gerald_connolly/412272",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "VA",
  "twitter": "GerryConnolly",
  "youtube": "repconnolly",
  "anger": 0.00003459742,
  "contempt": 0.00062363164,
  "disgust": 0.000008492575,
  "fear": 0.00000156305987,
  "happiness": 0.000447652332,
  "neutral": 0.9751046,
  "sadness": 0.02374303,
  "surprise": 0.0000364372

}, {
  "firstName": "Brett",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412278.jpeg",
  "lastName": "Guthrie",
  "link": "https://www.govtrack.us/congress/members/brett_guthrie/412278",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "KY",
  "twitter": "RepGuthrie",
  "youtube": "BrettGuthrie",
  "anger": 0.0000295657264,
  "contempt": 0.000290908269,
  "disgust": 0.000115041694,
  "fear": 8.885177e-8,
  "happiness": 0.997326851,
  "neutral": 0.00194852741,
  "sadness": 0.000287451665,
  "surprise": 0.000001541783

}, {
  "firstName": "Gregg",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412280.jpeg",
  "lastName": "Harper",
  "link": "https://www.govtrack.us/congress/members/gregg_harper/412280",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MS",
  "twitter": "GreggHarper",
  "youtube": "congressmanharper",
  "anger": 4.66035637e-8,
  "contempt": 0.00005800978,
  "disgust": 1.18808146e-7,
  "fear": 4.5137682e-8,
  "happiness": 0.9748389,
  "neutral": 0.0250862539,
  "sadness": 0.0000027133915,
  "surprise": 0.0000139149925

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412282.jpeg",
  "lastName": "Himes",
  "link": "https://www.govtrack.us/congress/members/james_himes/412282",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CT",
  "twitter": "JAHimes",
  "youtube": "congressmanhimes",
  "anger": 3.8354802e-8,
  "contempt": 2.67227136e-7,
  "disgust": 2.380995e-8,
  "fear": 2.26788921e-10,
  "happiness": 0.999974549,
  "neutral": 0.0000250463963,
  "sadness": 2.842652e-9,
  "surprise": 6.21764755e-8

}, {
  "firstName": "Duncan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412283.jpeg",
  "lastName": "Hunter",
  "link": "https://www.govtrack.us/congress/members/duncan_hunter/412283",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "Rep_Hunter",
  "youtube": "CongressmanHunter",
  "anger": 0.00000230224828,
  "contempt": 0.0009581465,
  "disgust": 0.0000024333383,
  "fear": 3.26878578e-8,
  "happiness": 0.5929355,
  "neutral": 0.4060708,
  "sadness": 0.0000034891948,
  "surprise": 0.0000272864891

}, {
  "firstName": "Lynn",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412284.jpeg",
  "lastName": "Jenkins",
  "link": "https://www.govtrack.us/congress/members/lynn_jenkins/412284",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "KS",
  "twitter": "RepLynnJenkins",
  "youtube": "RepLynnJenkins",
  "anger": 0.00370944082,
  "contempt": 4.9122864e-8,
  "disgust": 0.0000443287972,
  "fear": 1.46452521e-7,
  "happiness": 0.9962459,
  "neutral": 2.0690484e-8,
  "sadness": 1.630147e-8,
  "surprise": 9.400049e-8

}, {
  "firstName": "Leonard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412290.jpeg",
  "lastName": "Lance",
  "link": "https://www.govtrack.us/congress/members/leonard_lance/412290",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NJ",
  "twitter": "RepLanceNJ7",
  "youtube": "CongressmanLance",
  "anger": 0.00000322807728,
  "contempt": 1.32591627e-8,
  "disgust": 8.039244e-7,
  "fear": 1.53117021e-8,
  "happiness": 0.999991834,
  "neutral": 0.00000266814777,
  "sadness": 0.00000115629621,
  "surprise": 2.530915e-7

}, {
  "firstName": "Blaine",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412292.jpeg",
  "lastName": "Luetkemeyer",
  "link": "https://www.govtrack.us/congress/members/blaine_luetkemeyer/412292",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MO",
  "twitter": "RepBlainePress",
  "youtube": "BLuetkemeyer",
  "anger": 0.000151471977,
  "contempt": 0.00101284112,
  "disgust": 0.00321678934,
  "fear": 2.403375e-7,
  "happiness": 0.936502159,
  "neutral": 0.0587222055,
  "sadness": 0.0003734672,
  "surprise": 0.0000208392084

}, {
  "firstName": "Ben",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412293.jpeg",
  "lastName": "Luján",
  "link": "https://www.govtrack.us/congress/members/ben_lujan/412293",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NM",
  "twitter": "RepBenRayLujan",
  "youtube": "Repbenraylujan",
  "anger": 1.91650718e-9,
  "contempt": 1.525939e-10,
  "disgust": 7.27812643e-10,
  "fear": 4.87040529e-12,
  "happiness": 1,
  "neutral": 9.446589e-10,
  "sadness": 4.90227954e-12,
  "surprise": 2.37190267e-9

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412295.jpeg",
  "lastName": "McClintock",
  "link": "https://www.govtrack.us/congress/members/tom_mcclintock/412295",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepMcClintock",
  "youtube": "McClintockCA04",
  "anger": 0.00000134736786,
  "contempt": 0.000009859176,
  "disgust": 0.000001146287,
  "fear": 2.31048647e-9,
  "happiness": 0.998605967,
  "neutral": 0.0013799771,
  "sadness": 3.50713123e-7,
  "surprise": 0.00000133405513

}, {
  "firstName": "Pete",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412302.jpeg",
  "lastName": "Olson",
  "link": "https://www.govtrack.us/congress/members/pete_olson/412302",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepPeteOlson",
  "anger": 0.00205414044,
  "contempt": 0.0003488542,
  "disgust": 0.00105809711,
  "fear": 0.0000265368326,
  "happiness": 0.960328639,
  "neutral": 0.03557792,
  "sadness": 0.00006361765,
  "surprise": 0.0005422021

}, {
  "firstName": "Erik",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412303.jpeg",
  "lastName": "Paulsen",
  "link": "https://www.govtrack.us/congress/members/erik_paulsen/412303",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MN",
  "twitter": "RepErikPaulsen",
  "youtube": "reperikpaulsen",
  "anger": 1.22473651e-7,
  "contempt": 0.00000201760236,
  "disgust": 0.0000247873322,
  "fear": 1.52288685e-11,
  "happiness": 0.9998446,
  "neutral": 0.00012839555,
  "sadness": 1.82876061e-8,
  "surprise": 3.23282343e-8

}, {
  "firstName": "Chellie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412307.jpeg",
  "lastName": "Pingree",
  "link": "https://www.govtrack.us/congress/members/chellie_pingree/412307",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "ME",
  "twitter": "ChelliePingree",
  "youtube": "congresswomanpingree",
  "anger": 8.808083e-9,
  "contempt": 2.870725e-9,
  "disgust": 6.59405253e-10,
  "fear": 3.350255e-10,
  "happiness": 0.99999994,
  "neutral": 1.84785378e-8,
  "sadness": 3.56711882e-9,
  "surprise": 2.95022562e-9

}, {
  "firstName": "Jared",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412308.jpeg",
  "lastName": "Polis",
  "link": "https://www.govtrack.us/congress/members/jared_polis/412308",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CO",
  "twitter": "RepJaredPolis",
  "youtube": "JaredPolis31275",
  "anger": 0.00000169350244,
  "contempt": 0.000149832253,
  "disgust": 0.000006797572,
  "fear": 1.30392692e-8,
  "happiness": 0.9635889,
  "neutral": 0.03623333,
  "sadness": 0.0000191930176,
  "surprise": 2.21125461e-7

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412309.jpeg",
  "lastName": "Posey",
  "link": "https://www.govtrack.us/congress/members/bill_posey/412309",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "CongBillPosey",
  "youtube": "CongressmanPosey",
  "anger": 0.000001855881,
  "contempt": 0.00000359864225,
  "disgust": 0.00000328751844,
  "fear": 1.45080048e-9,
  "happiness": 0.999443352,
  "neutral": 0.0005463969,
  "sadness": 1.97089207e-7,
  "surprise": 0.00000132874379

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412310.jpeg",
  "lastName": "Roe",
  "link": "https://www.govtrack.us/congress/members/david_roe/412310",
  "nickname": "Phil",
  "party": "Republican",
  "role": "Representative",
  "state": "TN",
  "twitter": "DrPhilRoe",
  "youtube": "drphilroe",
  "anger": 0.00000854595146,
  "contempt": 0.000430949061,
  "disgust": 0.000288792362,
  "fear": 0.00000101909268,
  "happiness": 0.9989959,
  "neutral": 0.000258700515,
  "sadness": 0.000004197038,
  "surprise": 0.0000118819089

}, {
  "firstName": "Thomas",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412311.jpeg",
  "lastName": "Rooney",
  "link": "https://www.govtrack.us/congress/members/thomas_rooney/412311",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "TomRooney",
  "youtube": "CongressmanRooney",
  "anger": 1.39675924e-10,
  "contempt": 8.784217e-11,
  "disgust": 1.61184277e-9,
  "fear": 2.13554285e-14,
  "happiness": 1,
  "neutral": 3.98767552e-9,
  "sadness": 2.25410576e-12,
  "surprise": 2.118314e-10

}, {
  "firstName": "Gregorio",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412312.jpeg",
  "lastName": "Sablan",
  "link": "https://www.govtrack.us/congress/members/gregorio_sablan/412312",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MP",
  "youtube": "CongressmanSablan",
  "anger": 0.00000741148324,
  "contempt": 0.00009974425,
  "disgust": 0.000133545385,
  "fear": 1.25425248e-9,
  "happiness": 0.9920069,
  "neutral": 0.007742995,
  "sadness": 0.00000914013253,
  "surprise": 2.40935123e-7

}, {
  "firstName": "Kurt",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412315.jpeg",
  "lastName": "Schrader",
  "link": "https://www.govtrack.us/congress/members/kurt_schrader/412315",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "OR",
  "twitter": "RepSchrader",
  "youtube": "repkurtschrader",
  "anger": 9.001947e-10,
  "contempt": 4.922493e-9,
  "disgust": 1.14796395e-8,
  "fear": 4.9997223e-10,
  "happiness": 0.999993443,
  "neutral": 0.00000540841347,
  "sadness": 9.601848e-9,
  "surprise": 0.00000112762245

}, {
  "firstName": "Glenn",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412317.jpeg",
  "lastName": "Thompson",
  "link": "https://www.govtrack.us/congress/members/glenn_thompson/412317",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "CongressmanGT",
  "youtube": "CongressmanGT",
  "anger": 0.00000130296939,
  "contempt": 0.0000194543045,
  "disgust": 0.00001915306,
  "fear": 4.92588748e-10,
  "happiness": 0.9988262,
  "neutral": 0.00113288569,
  "sadness": 8.204945e-7,
  "surprise": 1.68028521e-7

}, {
  "firstName": "Dina",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412318.jpeg",
  "lastName": "Titus",
  "link": "https://www.govtrack.us/congress/members/dina_titus/412318",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NV",
  "twitter": "RepDinaTitus",
  "youtube": "CongresswomanTitus",
  "anger": 7.698553e-9,
  "contempt": 6.979036e-9,
  "disgust": 5.062897e-8,
  "fear": 3.03758463e-9,
  "happiness": 0.9999985,
  "neutral": 3.03722857e-7,
  "sadness": 3.56771057e-10,
  "surprise": 0.00000113765634

}, {
  "firstName": "Paul",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412319.jpeg",
  "lastName": "Tonko",
  "link": "https://www.govtrack.us/congress/members/paul_tonko/412319",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepPaulTonko",
  "youtube": "reppaultonko",
  "anger": 3.391948e-8,
  "contempt": 6.32170627e-9,
  "disgust": 3.24265024e-8,
  "fear": 7.038521e-12,
  "happiness": 0.9999996,
  "neutral": 3.29979031e-7,
  "sadness": 1.51457258e-9,
  "surprise": 3.90156041e-9

}, {
  "firstName": "Marcia",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412327.jpeg",
  "lastName": "Fudge",
  "link": "https://www.govtrack.us/congress/members/marcia_fudge/412327",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepMarciaFudge",
  "youtube": "marcialfudge",
  "anger": 5.08621518e-8,
  "contempt": 8.787684e-9,
  "disgust": 2.5464422e-7,
  "fear": 1.61013638e-8,
  "happiness": 0.9999969,
  "neutral": 3.6051123e-8,
  "sadness": 2.93243124e-10,
  "surprise": 0.00000271656518

}, {
  "firstName": "Michael",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412330.jpeg",
  "lastName": "Bennet",
  "link": "https://www.govtrack.us/congress/members/michael_bennet/412330",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "CO",
  "twitter": "SenBennetCo",
  "youtube": "SenatorBennet",
  "anger": 3.39348938e-10,
  "contempt": 2.10477111e-7,
  "disgust": 1.5223721e-8,
  "fear": 3.082631e-14,
  "happiness": 0.9999972,
  "neutral": 0.00000259036619,
  "sadness": 1.44904844e-9,
  "surprise": 3.14317483e-9

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412331.jpeg",
  "lastName": "Quigley",
  "link": "https://www.govtrack.us/congress/members/mike_quigley/412331",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepMikeQuigley",
  "youtube": "RepMikeQuigley",
  "anger": 2.142792e-8,
  "contempt": 0.0000040603104,
  "disgust": 3.36511249e-7,
  "fear": 1.777825e-10,
  "happiness": 0.9988793,
  "neutral": 0.00111555145,
  "sadness": 6.08123756e-8,
  "surprise": 6.47426134e-7

}, {
  "firstName": "Judy",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412379.jpeg",
  "lastName": "Chu",
  "link": "https://www.govtrack.us/congress/members/judy_chu/412379",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepJudyChu",
  "youtube": "RepJudyChu",
  "anger": 1.19774149e-10,
  "contempt": 5.58889133e-12,
  "disgust": 3.759675e-9,
  "fear": 9.962017e-13,
  "happiness": 1,
  "neutral": 2.1492844e-11,
  "sadness": 3.70960936e-11,
  "surprise": 4.812404e-9

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412382.jpeg",
  "lastName": "Garamendi",
  "link": "https://www.govtrack.us/congress/members/john_garamendi/412382",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepGaramendi",
  "youtube": "garamendiCA10",
  "anger": 1.55663582e-9,
  "contempt": 4.18806456e-9,
  "disgust": 8.43701553e-9,
  "fear": 1.61217849e-12,
  "happiness": 0.99999994,
  "neutral": 1.36401441e-8,
  "sadness": 1.52122626e-9,
  "surprise": 1.02571485e-9

}, {
  "firstName": "Theodore",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412385.jpeg",
  "lastName": "Deutch",
  "link": "https://www.govtrack.us/congress/members/theodore_deutch/412385",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepTedDeutch",
  "youtube": "congressmanteddeutch",
  "anger": 2.43122553e-11,
  "contempt": 4.30210148e-13,
  "disgust": 1.25910142e-11,
  "fear": 5.49611253e-14,
  "happiness": 1,
  "neutral": 3.62289032e-10,
  "sadness": 7.244926e-14,
  "surprise": 5.750511e-11

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412388.jpeg",
  "lastName": "Graves",
  "link": "https://www.govtrack.us/congress/members/tom_graves/412388",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepTomGraves",
  "youtube": "CongressmanGraves",
  "anger": 1.6319052e-11,
  "contempt": 2.07046727e-10,
  "disgust": 6.07053e-11,
  "fear": 5.093341e-14,
  "happiness": 1,
  "neutral": 5.373047e-10,
  "sadness": 4.22019516e-13,
  "surprise": 3.36896622e-10

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412393.jpeg",
  "lastName": "Reed",
  "link": "https://www.govtrack.us/congress/members/tom_reed/412393",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepTomReed",
  "youtube": "CongressmanTomReed",
  "anger": 1.14833587e-14,
  "contempt": 3.24295068e-14,
  "disgust": 7.203369e-14,
  "fear": 2.91188421e-18,
  "happiness": 1,
  "neutral": 9.023446e-13,
  "sadness": 1.08048319e-14,
  "surprise": 1.09187756e-14

}, {
  "firstName": "Martha",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412394.jpeg",
  "lastName": "Roby",
  "link": "https://www.govtrack.us/congress/members/martha_roby/412394",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AL",
  "twitter": "RepMarthaRoby",
  "youtube": "reproby",
  "anger": 9.760408e-10,
  "contempt": 9.421137e-12,
  "disgust": 6.3413e-8,
  "fear": 3.54893767e-13,
  "happiness": 0.99999994,
  "neutral": 2.43951331e-10,
  "sadness": 3.32815268e-11,
  "surprise": 3.38193429e-9

}, {
  "firstName": "Mo",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412395.jpeg",
  "lastName": "Brooks",
  "link": "https://www.govtrack.us/congress/members/mo_brooks/412395",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AL",
  "twitter": "RepMoBrooks",
  "youtube": "RepMoBrooks",
  "anger": 0.0004877605,
  "contempt": 0.00338115683,
  "disgust": 0.00100205536,
  "fear": 4.40493721e-7,
  "happiness": 0.4491034,
  "neutral": 0.545031846,
  "sadness": 0.0000510300379,
  "surprise": 0.0009423356

}, {
  "firstName": "Terri",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412396.jpeg",
  "lastName": "Sewell",
  "link": "https://www.govtrack.us/congress/members/terri_sewell/412396",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "AL",
  "twitter": "RepTerriSewell",
  "youtube": "RepSewell",
  "anger": 0.007747569,
  "contempt": 0.0000983121063,
  "disgust": 0.00123400008,
  "fear": 0.048389025,
  "happiness": 0.9070681,
  "neutral": 0.00036273204,
  "sadness": 0.0000598775332,
  "surprise": 0.0350404121

}, {
  "firstName": "Paul",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412397.jpeg",
  "lastName": "Gosar",
  "link": "https://www.govtrack.us/congress/members/paul_gosar/412397",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AZ",
  "twitter": "RepGosar",
  "youtube": "repgosar",
  "anger": 2.07092654e-7,
  "contempt": 1.42529245e-7,
  "disgust": 2.7481093e-7,
  "fear": 2.759903e-10,
  "happiness": 0.999999,
  "neutral": 3.22237781e-7,
  "sadness": 3.71761537e-8,
  "surprise": 2.10776974e-9

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412399.jpeg",
  "lastName": "Schweikert",
  "link": "https://www.govtrack.us/congress/members/david_schweikert/412399",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AZ",
  "twitter": "RepDavid",
  "youtube": "RepDavidSchweikert",
  "anger": 0.0000235482858,
  "contempt": 0.0126826074,
  "disgust": 0.0000122616275,
  "fear": 0.000001101431,
  "happiness": 0.4497346,
  "neutral": 0.537351966,
  "sadness": 0.0001469063,
  "surprise": 0.00004698229

}, {
  "firstName": "Eric",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412400.jpeg",
  "lastName": "Crawford",
  "link": "https://www.govtrack.us/congress/members/eric_crawford/412400",
  "nickname": "Rick",
  "party": "Republican",
  "role": "Representative",
  "state": "AR",
  "twitter": "RepRickCrawford",
  "youtube": "RepRickCrawford",
  "anger": 7.839691e-9,
  "contempt": 5.133494e-10,
  "disgust": 2.01127364e-8,
  "fear": 6.521506e-10,
  "happiness": 0.9999998,
  "neutral": 4.05362677e-8,
  "sadness": 2.60247246e-9,
  "surprise": 9.60348956e-8

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412402.jpeg",
  "lastName": "Womack",
  "link": "https://www.govtrack.us/congress/members/steve_womack/412402",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AR",
  "twitter": "Rep_SteveWomack",
  "youtube": "CongressmanWomack",
  "anger": 0.00121676619,
  "contempt": 0.00278137252,
  "disgust": 0.00004330649,
  "fear": 0.00000113430269,
  "happiness": 0.00211979821,
  "neutral": 0.993333,
  "sadness": 0.000447438,
  "surprise": 0.00005721594

}, {
  "firstName": "Jeff",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412403.jpeg",
  "lastName": "Denham",
  "link": "https://www.govtrack.us/congress/members/jeff_denham/412403",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepJeffDenham",
  "youtube": "repjeffdenham",
  "anger": 1.13669385e-8,
  "contempt": 1.55342586e-10,
  "disgust": 9.593563e-9,
  "fear": 5.018244e-13,
  "happiness": 0.99999994,
  "neutral": 4.26531033e-9,
  "sadness": 4.744631e-9,
  "surprise": 1.49482059e-11

}, {
  "firstName": "Karen",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412404.jpeg",
  "lastName": "Bass",
  "link": "https://www.govtrack.us/congress/members/karen_bass/412404",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepKarenBass",
  "youtube": "RepKarenBass",
  "anger": 0.00000338474933,
  "contempt": 1.31818414e-8,
  "disgust": 0.00000150878986,
  "fear": 5.746976e-10,
  "happiness": 0.999995053,
  "neutral": 2.30472086e-8,
  "sadness": 3.01239673e-8,
  "surprise": 2.7104694e-9

}, {
  "firstName": "Scott",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412405.jpeg",
  "lastName": "Tipton",
  "link": "https://www.govtrack.us/congress/members/scott_tipton/412405",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CO",
  "twitter": "RepTipton",
  "youtube": "RepScottTipton",
  "anger": 2.08644781e-8,
  "contempt": 9.348594e-9,
  "disgust": 2.73679518e-7,
  "fear": 8.78190532e-13,
  "happiness": 0.999997258,
  "neutral": 0.0000024630383,
  "sadness": 1.02881911e-10,
  "surprise": 1.25791821e-9

}, {
  "firstName": "Daniel",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412410.jpeg",
  "lastName": "Webster",
  "link": "https://www.govtrack.us/congress/members/daniel_webster/412410",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepWebster",
  "youtube": "repdanwebster",
  "anger": 0.00013444644,
  "contempt": 0.00000408463075,
  "disgust": 0.0003624402,
  "fear": 4.05992864e-7,
  "happiness": 0.9993366,
  "neutral": 0.000130090426,
  "sadness": 0.00000646366561,
  "surprise": 0.000025450061

}, {
  "firstName": "Dennis",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412411.jpeg",
  "lastName": "Ross",
  "link": "https://www.govtrack.us/congress/members/dennis_ross/412411",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepDennisRoss",
  "youtube": "RepDennisRoss",
  "anger": 7.42379846e-9,
  "contempt": 9.719464e-9,
  "disgust": 2.40383969e-7,
  "fear": 5.001846e-12,
  "happiness": 0.9999995,
  "neutral": 2.14055731e-7,
  "sadness": 4.88546448e-9,
  "surprise": 4.809906e-9

}, {
  "firstName": "Frederica",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412412.jpeg",
  "lastName": "Wilson",
  "link": "https://www.govtrack.us/congress/members/frederica_wilson/412412",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepWilson",
  "youtube": "repfredericawilson",
  "anger": 0.000007733489,
  "contempt": 4.815053e-8,
  "disgust": 6.95545566e-7,
  "fear": 1.81816571e-8,
  "happiness": 0.999989033,
  "neutral": 3.02764477e-7,
  "sadness": 1.03332759e-7,
  "surprise": 0.00000206980121

}, {
  "firstName": "Rob",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412416.jpeg",
  "lastName": "Woodall",
  "link": "https://www.govtrack.us/congress/members/rob_woodall/412416",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepRobWoodall",
  "youtube": "RobWoodallGA07",
  "anger": 1.3848708e-8,
  "contempt": 9.123387e-9,
  "disgust": 4.42046e-8,
  "fear": 1.50229842e-10,
  "happiness": 0.9999998,
  "neutral": 3.92852e-8,
  "sadness": 1.56423624e-10,
  "surprise": 7.89181342e-8

}, {
  "firstName": "Austin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412417.jpeg",
  "lastName": "Scott",
  "link": "https://www.govtrack.us/congress/members/austin_scott/412417",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "AustinScottGA08",
  "youtube": "RepAustinScott",
  "anger": 4.50425652e-9,
  "contempt": 5.36142153e-8,
  "disgust": 1.51059787e-8,
  "fear": 1.15940792e-10,
  "happiness": 0.999999642,
  "neutral": 2.40158528e-7,
  "sadness": 2.75141243e-9,
  "surprise": 2.37725661e-8

}, {
  "firstName": "Colleen",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412418.jpeg",
  "lastName": "Hanabusa",
  "link": "https://www.govtrack.us/congress/members/colleen_hanabusa/412418",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "HI",
  "twitter": "RepHanabusa",
  "anger": 0.00000245974661,
  "contempt": 0.00009081868,
  "disgust": 0.0000296256057,
  "fear": 2.93536232e-7,
  "happiness": 0.9992038,
  "neutral": 0.0006384279,
  "sadness": 0.000002217826,
  "surprise": 0.0000323453

}, {
  "firstName": "Raúl",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412419.jpeg",
  "lastName": "Labrador",
  "link": "https://www.govtrack.us/congress/members/raul_labrador/412419",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "ID",
  "twitter": "Raul_Labrador",
  "youtube": "RepLabrador",
  "anger": 3.244119e-9,
  "contempt": 2.298996e-8,
  "disgust": 9.01372857e-7,
  "fear": 2.58380882e-13,
  "happiness": 0.999999,
  "neutral": 6.032812e-8,
  "sadness": 2.018858e-9,
  "surprise": 1.65208658e-9

}, {
  "firstName": "Adam",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412421.jpeg",
  "lastName": "Kinzinger",
  "link": "https://www.govtrack.us/congress/members/adam_kinzinger/412421",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepKinzinger",
  "youtube": "RepAdamKinzinger",
  "anger": 6.37994857e-9,
  "contempt": 1.22824773e-9,
  "disgust": 9.538207e-9,
  "fear": 4.16027456e-11,
  "happiness": 1,
  "neutral": 2.17634777e-9,
  "sadness": 8.850517e-10,
  "surprise": 5.42168133e-9

}, {
  "firstName": "Randy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412422.jpeg",
  "lastName": "Hultgren",
  "link": "https://www.govtrack.us/congress/members/randy_hultgren/412422",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepHultgren",
  "youtube": "rephultgren",
  "anger": 3.43349862e-11,
  "contempt": 6.458676e-9,
  "disgust": 4.64879635e-10,
  "fear": 7.631262e-15,
  "happiness": 1,
  "neutral": 1.53249733e-8,
  "sadness": 2.58532223e-11,
  "surprise": 8.37492645e-11

}, {
  "firstName": "Todd",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412426.jpeg",
  "lastName": "Rokita",
  "link": "https://www.govtrack.us/congress/members/todd_rokita/412426",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IN",
  "twitter": "ToddRokita",
  "youtube": "reptoddrokita",
  "anger": 4.597051e-12,
  "contempt": 3.2455174e-11,
  "disgust": 3.91246952e-10,
  "fear": 6.90701158e-15,
  "happiness": 1,
  "neutral": 2.19742025e-9,
  "sadness": 3.46661137e-11,
  "surprise": 7.76770759e-10

}, {
  "firstName": "Larry",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412427.jpeg",
  "lastName": "Bucshon",
  "link": "https://www.govtrack.us/congress/members/larry_bucshon/412427",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IN",
  "twitter": "RepLarryBucshon",
  "youtube": "RepLarryBucshon",
  "anger": 1.86870768e-8,
  "contempt": 0.0000101407586,
  "disgust": 8.121539e-8,
  "fear": 4.24859564e-10,
  "happiness": 0.998432755,
  "neutral": 0.00155651791,
  "sadness": 3.65204642e-7,
  "surprise": 1.22556642e-7

}, {
  "firstName": "Todd",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412428.jpeg",
  "lastName": "Young",
  "link": "https://www.govtrack.us/congress/members/todd_young/412428",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "IN",
  "twitter": "SenToddYoung",
  "youtube": "RepToddYoung",
  "anger": 0.0005438801,
  "contempt": 0.000218482353,
  "disgust": 0.00136309082,
  "fear": 0.00000651445362,
  "happiness": 0.994991541,
  "neutral": 0.002698933,
  "sadness": 0.000142895311,
  "surprise": 0.0000346481429

}, {
  "firstName": "Kevin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412430.jpeg",
  "lastName": "Yoder",
  "link": "https://www.govtrack.us/congress/members/kevin_yoder/412430",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "KS",
  "twitter": "RepKevinYoder",
  "youtube": "RepYoder",
  "anger": 4.99162063e-8,
  "contempt": 1.876529e-9,
  "disgust": 1.44655132e-7,
  "fear": 1.270769e-10,
  "happiness": 0.9999995,
  "neutral": 2.588198e-7,
  "sadness": 3.017502e-10,
  "surprise": 3.20440741e-8

}, {
  "firstName": "Cedric",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412432.jpeg",
  "lastName": "Richmond",
  "link": "https://www.govtrack.us/congress/members/cedric_richmond/412432",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "LA",
  "twitter": "RepRichmond",
  "youtube": "RepCedricRichmond",
  "anger": 0.00000370619614,
  "contempt": 0.0027393417,
  "disgust": 7.26451844e-7,
  "fear": 9.488363e-9,
  "happiness": 0.6300477,
  "neutral": 0.367195636,
  "sadness": 0.0000070066535,
  "surprise": 0.000005885773

}, {
  "firstName": "Andy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412434.jpeg",
  "lastName": "Harris",
  "link": "https://www.govtrack.us/congress/members/andy_harris/412434",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MD",
  "twitter": "RepAndyHarrisMD",
  "youtube": "RepAndyHarris",
  "anger": 5.345736e-9,
  "contempt": 3.520118e-9,
  "disgust": 6.59279831e-9,
  "fear": 1.64753086e-10,
  "happiness": 0.99999994,
  "neutral": 1.7559314e-8,
  "sadness": 4.925681e-9,
  "surprise": 1.74583847e-9

}, {
  "firstName": "William",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412435.jpeg",
  "lastName": "Keating",
  "link": "https://www.govtrack.us/congress/members/william_keating/412435",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "USRepKeating",
  "youtube": "RepBillKeating",
  "anger": 1.13852167e-7,
  "contempt": 0.00000205152423,
  "disgust": 9.0965716e-7,
  "fear": 4.21933079e-11,
  "happiness": 0.998724937,
  "neutral": 0.00127192866,
  "sadness": 6.525493e-9,
  "surprise": 4.65881449e-8

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412437.jpeg",
  "lastName": "Huizenga",
  "link": "https://www.govtrack.us/congress/members/bill_huizenga/412437",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepHuizenga",
  "youtube": "RepHuizenga",
  "anger": 1.3581517e-9,
  "contempt": 3.02462527e-10,
  "disgust": 1.40868849e-7,
  "fear": 3.193343e-14,
  "happiness": 0.9999999,
  "neutral": 4.67643835e-9,
  "sadness": 4.60224636e-11,
  "surprise": 3.49121676e-10

}, {
  "firstName": "Justin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412438.jpeg",
  "lastName": "Amash",
  "link": "https://www.govtrack.us/congress/members/justin_amash/412438",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "youtube": "repjustinamash",
  "anger": 0.007918538,
  "contempt": 0.00006392032,
  "disgust": 0.00186273153,
  "fear": 4.1385718e-8,
  "happiness": 0.9901515,
  "neutral": 0.00000194597419,
  "sadness": 7.602687e-7,
  "surprise": 5.21029733e-7

}, {
  "firstName": "Steven",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412443.jpeg",
  "lastName": "Palazzo",
  "link": "https://www.govtrack.us/congress/members/steven_palazzo/412443",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MS",
  "twitter": "CongPalazzo",
  "youtube": "CongressmanPalazzo",
  "anger": 1.0053499e-7,
  "contempt": 2.10725553e-8,
  "disgust": 0.00000131040906,
  "fear": 1.35788958e-11,
  "happiness": 0.999994755,
  "neutral": 0.00000377865422,
  "sadness": 2.59935384e-9,
  "surprise": 7.913264e-9

}, {
  "firstName": "Vicky",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412444.jpeg",
  "lastName": "Hartzler",
  "link": "https://www.govtrack.us/congress/members/vicky_hartzler/412444",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MO",
  "twitter": "RepHartzler",
  "youtube": "repvickyhartzler",
  "anger": 1.02815e-7,
  "contempt": 3.704721e-11,
  "disgust": 4.31368719e-8,
  "fear": 1.33068227e-7,
  "happiness": 0.999997437,
  "neutral": 3.049854e-9,
  "sadness": 3.02621217e-9,
  "surprise": 0.00000226775978

}, {
  "firstName": "Billy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412445.jpeg",
  "lastName": "Long",
  "link": "https://www.govtrack.us/congress/members/billy_long/412445",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MO",
  "twitter": "USRepLong",
  "youtube": "MOdistrict7",
  "anger": 6.795262e-7,
  "contempt": 0.00000638875,
  "disgust": 0.0000227268538,
  "fear": 3.94648064e-10,
  "happiness": 0.9998683,
  "neutral": 0.000101670696,
  "sadness": 9.786404e-8,
  "surprise": 1.498066e-7

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412460.jpeg",
  "lastName": "Johnson",
  "link": "https://www.govtrack.us/congress/members/bill_johnson/412460",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepBillJohnson",
  "youtube": "RepBillJohnson",
  "anger": 0.00000609342123,
  "contempt": 0.000002398813,
  "disgust": 0.0000182768727,
  "fear": 1.47821382e-8,
  "happiness": 0.9997253,
  "neutral": 0.000246408134,
  "sadness": 8.40878045e-7,
  "surprise": 6.64613538e-7

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412461.jpeg",
  "lastName": "Stivers",
  "link": "https://www.govtrack.us/congress/members/steve_stivers/412461",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepSteveStivers",
  "youtube": "RepSteveStivers",
  "anger": 0.00000601041256,
  "contempt": 0.00000243028876,
  "disgust": 0.000128724656,
  "fear": 9.32199e-10,
  "happiness": 0.999818146,
  "neutral": 0.00004124643,
  "sadness": 0.00000325512679,
  "surprise": 1.77073289e-7

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412462.jpeg",
  "lastName": "Renacci",
  "link": "https://www.govtrack.us/congress/members/james_renacci/412462",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepJimRenacci",
  "youtube": "repjimrenacci",
  "anger": 0.00000368194242,
  "contempt": 0.00180982682,
  "disgust": 0.000179556024,
  "fear": 3.49940628e-8,
  "happiness": 0.9957438,
  "neutral": 0.00225928449,
  "sadness": 8.83234748e-7,
  "surprise": 0.000002906729

}, {
  "firstName": "Bob",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412463.jpeg",
  "lastName": "Gibbs",
  "link": "https://www.govtrack.us/congress/members/bob_gibbs/412463",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepBobGibbs",
  "youtube": "RepBobGibbs",
  "anger": 1.33358881e-7,
  "contempt": 0.000197132569,
  "disgust": 2.38317227e-7,
  "fear": 1.660118e-11,
  "happiness": 0.814893842,
  "neutral": 0.184908241,
  "sadness": 3.81444863e-7,
  "surprise": 2.35365487e-8

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412464.jpeg",
  "lastName": "Lankford",
  "link": "https://www.govtrack.us/congress/members/james_lankford/412464",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "OK",
  "twitter": "SenatorLankford",
  "youtube": "SenatorLankford",
  "anger": 0.00000533629373,
  "contempt": 0.00000123819052,
  "disgust": 0.0000452088134,
  "fear": 0.00000152908956,
  "happiness": 0.9971417,
  "neutral": 0.00001066781,
  "sadness": 6.694708e-9,
  "surprise": 0.00279430416

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412465.jpeg",
  "lastName": "Kelly",
  "link": "https://www.govtrack.us/congress/members/mike_kelly/412465",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "MikeKellyPA",
  "youtube": "repmikekelly",
  "anger": 7.502978e-9,
  "contempt": 1.5298447e-9,
  "disgust": 1.63841332e-8,
  "fear": 1.4453072e-12,
  "happiness": 0.99999994,
  "neutral": 3.57409426e-8,
  "sadness": 2.096616e-10,
  "surprise": 5.342879e-10

}, {
  "firstName": "Patrick",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412466.jpeg",
  "lastName": "Meehan",
  "link": "https://www.govtrack.us/congress/members/patrick_meehan/412466",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepMeehan",
  "youtube": "repmeehan",
  "anger": 0.00000168456233,
  "contempt": 3.05211586e-7,
  "disgust": 6.05371667e-7,
  "fear": 5.275766e-11,
  "happiness": 0.9999901,
  "neutral": 0.000007203794,
  "sadness": 8.07722e-8,
  "surprise": 3.051193e-9

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412468.jpeg",
  "lastName": "Marino",
  "link": "https://www.govtrack.us/congress/members/tom_marino/412468",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepTomMarino",
  "youtube": "RepMarino",
  "anger": 0.0000105015679,
  "contempt": 0.00000440227177,
  "disgust": 0.00009645097,
  "fear": 4.374328e-8,
  "happiness": 0.9998087,
  "neutral": 0.00007788938,
  "sadness": 3.41611468e-7,
  "surprise": 0.00000164956464

}, {
  "firstName": "Lou",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412469.jpeg",
  "lastName": "Barletta",
  "link": "https://www.govtrack.us/congress/members/lou_barletta/412469",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepLouBarletta",
  "youtube": "reploubarletta",
  "anger": 0.000001005384,
  "contempt": 2.79823723e-7,
  "disgust": 0.00000219245339,
  "fear": 2.96883584e-9,
  "happiness": 0.9999939,
  "neutral": 0.00000254363,
  "sadness": 3.2903662e-9,
  "surprise": 6.421495e-8

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412470.jpeg",
  "lastName": "Cicilline",
  "link": "https://www.govtrack.us/congress/members/david_cicilline/412470",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "RI",
  "twitter": "RepCicilline",
  "youtube": "RepDavidCicilline",
  "anger": 1.216583e-7,
  "contempt": 0.00000165402832,
  "disgust": 3.86064841e-7,
  "fear": 4.748234e-11,
  "happiness": 0.9999857,
  "neutral": 0.0000121084313,
  "sadness": 8.413686e-10,
  "surprise": 1.30375932e-8

}, {
  "firstName": "Tim",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412471.jpeg",
  "lastName": "Scott",
  "link": "https://www.govtrack.us/congress/members/tim_scott/412471",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "SC",
  "twitter": "SenatorTimScott",
  "youtube": "SenatorTimScott",
  "anger": 0.0000321805055,
  "contempt": 4.79879247e-7,
  "disgust": 0.0000182278727,
  "fear": 1.08511834e-7,
  "happiness": 0.99993217,
  "neutral": 0.00000671674525,
  "sadness": 6.449772e-8,
  "surprise": 0.0000100277166

}, {
  "firstName": "Jeff",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412472.jpeg",
  "lastName": "Duncan",
  "link": "https://www.govtrack.us/congress/members/jeff_duncan/412472",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "SC",
  "twitter": "RepJeffDuncan",
  "youtube": "congjeffduncan",
  "anger": 2.21232963e-11,
  "contempt": 4.17946078e-9,
  "disgust": 4.50337767e-10,
  "fear": 5.253879e-13,
  "happiness": 0.9999996,
  "neutral": 4.0139895e-7,
  "sadness": 4.4068818e-11,
  "surprise": 1.22028982e-8

}, {
  "firstName": "Trey",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412473.jpeg",
  "lastName": "Gowdy",
  "link": "https://www.govtrack.us/congress/members/trey_gowdy/412473",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "SC",
  "twitter": "TGowdySC",
  "youtube": "TGowdySC",
  "anger": 3.625213e-8,
  "contempt": 0.000006881053,
  "disgust": 5.40305848e-7,
  "fear": 2.92311e-11,
  "happiness": 0.9998712,
  "neutral": 0.000121106765,
  "sadness": 2.502067e-7,
  "surprise": 1.34800873e-8

}, {
  "firstName": "Kristi",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412475.jpeg",
  "lastName": "Noem",
  "link": "https://www.govtrack.us/congress/members/kristi_noem/412475",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "SD",
  "twitter": "RepKristiNoem",
  "youtube": "RepKristiNoem",
  "anger": 7.73536e-8,
  "contempt": 3.296516e-8,
  "disgust": 5.84983582e-8,
  "fear": 1.32200242e-7,
  "happiness": 0.999983966,
  "neutral": 3.72096622e-7,
  "sadness": 2.901561e-9,
  "surprise": 0.0000153741112

}, {
  "firstName": "Charles",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412476.jpeg",
  "lastName": "Fleischmann",
  "link": "https://www.govtrack.us/congress/members/charles_fleischmann/412476",
  "nickname": "Chuck",
  "party": "Republican",
  "role": "Representative",
  "state": "TN",
  "twitter": "RepChuck",
  "youtube": "repchuck",
  "anger": 0.000003829768,
  "contempt": 0.00310926372,
  "disgust": 0.0000271989156,
  "fear": 1.76724182e-8,
  "happiness": 0.949907,
  "neutral": 0.04692438,
  "sadness": 0.00000243322052,
  "surprise": 0.0000258534365

}, {
  "firstName": "Scott",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412477.jpeg",
  "lastName": "DesJarlais",
  "link": "https://www.govtrack.us/congress/members/scott_desjarlais/412477",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TN",
  "twitter": "DesJarlaisTN04",
  "youtube": "ScottDesJarlaisTN04",
  "anger": 0.009441882,
  "contempt": 0.0006403504,
  "disgust": 0.02430568,
  "fear": 0.00006911683,
  "happiness": 0.9446656,
  "neutral": 0.0198437348,
  "sadness": 0.000171324733,
  "surprise": 0.00086227915

}, {
  "firstName": "Diane",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412478.jpeg",
  "lastName": "Black",
  "link": "https://www.govtrack.us/congress/members/diane_black/412478",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TN",
  "twitter": "RepDianeBlack",
  "youtube": "RepDianeBlack",
  "anger": 6.98967639e-9,
  "contempt": 5.69854053e-10,
  "disgust": 5.58726079e-8,
  "fear": 1.08148324e-10,
  "happiness": 0.9999999,
  "neutral": 2.98533358e-8,
  "sadness": 4.661102e-10,
  "surprise": 4.548477e-9

}, {
  "firstName": "Bill",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412480.jpeg",
  "lastName": "Flores",
  "link": "https://www.govtrack.us/congress/members/bill_flores/412480",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepBillFlores",
  "youtube": "RepBillFlores",
  "anger": 0.00000350865639,
  "contempt": 3.58626e-7,
  "disgust": 0.00000739209645,
  "fear": 4.319309e-7,
  "happiness": 0.999577165,
  "neutral": 0.000013431596,
  "sadness": 0.00039442454,
  "surprise": 0.0000032749715

}, {
  "firstName": "Blake",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412482.jpeg",
  "lastName": "Farenthold",
  "link": "https://www.govtrack.us/congress/members/blake_farenthold/412482",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "Farenthold",
  "youtube": "BlakeFarenthold",
  "anger": 6.355277e-8,
  "contempt": 0.000328694645,
  "disgust": 2.29675678e-7,
  "fear": 3.744489e-10,
  "happiness": 0.9994819,
  "neutral": 0.000187750236,
  "sadness": 0.00000133028618,
  "surprise": 2.173662e-8

}, {
  "firstName": "H.",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412485.jpeg",
  "lastName": "Griffith",
  "link": "https://www.govtrack.us/congress/members/morgan_griffith/412485",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "VA",
  "twitter": "RepMGriffith",
  "youtube": "RepMorganGriffith",
  "anger": 0.5928965,
  "contempt": 0.041326493,
  "disgust": 0.07937142,
  "fear": 0.0000380700221,
  "happiness": 0.004790486,
  "neutral": 0.278106362,
  "sadness": 0.000132809786,
  "surprise": 0.003337846

}, {
  "firstName": "Jaime",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412486.jpeg",
  "lastName": "Herrera Beutler",
  "link": "https://www.govtrack.us/congress/members/jaime_herrera_beutler/412486",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WA",
  "twitter": "HerreraBeutler",
  "youtube": "RepHerreraBeutler",
  "anger": 0.000424084545,
  "contempt": 7.019511e-8,
  "disgust": 0.0000105692679,
  "fear": 0.0000299426174,
  "happiness": 0.99905777,
  "neutral": 1.989014e-7,
  "sadness": 1.53127914e-7,
  "surprise": 0.000477189547

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412487.jpeg",
  "lastName": "McKinley",
  "link": "https://www.govtrack.us/congress/members/david_mckinley/412487",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WV",
  "twitter": "RepMcKinley",
  "youtube": "RepDavidMcKinley",
  "anger": 0.00163036177,
  "contempt": 0.0095428,
  "disgust": 0.00122307637,
  "fear": 0.0000146711354,
  "happiness": 0.573076844,
  "neutral": 0.412499458,
  "sadness": 0.00190337584,
  "surprise": 0.000109393492

}, {
  "firstName": "Sean",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412488.jpeg",
  "lastName": "Duffy",
  "link": "https://www.govtrack.us/congress/members/sean_duffy/412488",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WI",
  "twitter": "RepSeanDuffy",
  "youtube": "RepSeanDuffy",
  "anger": 9.306512e-12,
  "contempt": 1.67974738e-13,
  "disgust": 2.34000384e-12,
  "fear": 4.298661e-11,
  "happiness": 1,
  "neutral": 9.751165e-13,
  "sadness": 7.54843237e-14,
  "surprise": 5.990687e-9

}, {
  "firstName": "Richard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412490.jpeg",
  "lastName": "Blumenthal",
  "link": "https://www.govtrack.us/congress/members/richard_blumenthal/412490",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "CT",
  "twitter": "SenBlumenthal",
  "youtube": "SenatorBlumenthal",
  "anger": 3.392954e-9,
  "contempt": 1.68281584e-8,
  "disgust": 8.5385814e-8,
  "fear": 1.56928377e-12,
  "happiness": 0.999999046,
  "neutral": 8.242233e-7,
  "sadness": 8.423368e-10,
  "surprise": 7.8304746e-10

}, {
  "firstName": "Marco",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412491.jpeg",
  "lastName": "Rubio",
  "link": "https://www.govtrack.us/congress/members/marco_rubio/412491",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "FL",
  "twitter": "SenRubioPress",
  "youtube": "SenatorMarcoRubio",
  "anger": 1.13173392e-7,
  "contempt": 8.047789e-8,
  "disgust": 0.00000167400583,
  "fear": 1.08610809e-9,
  "happiness": 0.9999942,
  "neutral": 0.00000376280082,
  "sadness": 2.99182479e-9,
  "surprise": 1.41481991e-7

}, {
  "firstName": "Rand",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412492.jpeg",
  "lastName": "Paul",
  "link": "https://www.govtrack.us/congress/members/rand_paul/412492",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "KY",
  "youtube": "SenatorRandPaul",
  "anger": 0.0000477796639,
  "contempt": 0.00217997585,
  "disgust": 0.000004830276,
  "fear": 1.66068844e-7,
  "happiness": 0.0168765262,
  "neutral": 0.9807212,
  "sadness": 0.000145058992,
  "surprise": 0.0000244704424

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412494.jpeg",
  "lastName": "Hoeven",
  "link": "https://www.govtrack.us/congress/members/john_hoeven/412494",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "ND",
  "twitter": "SenJohnHoeven",
  "youtube": "senatorjohnhoevennd",
  "anger": 0.00002483172,
  "contempt": 0.000336596771,
  "disgust": 0.0000317995946,
  "fear": 2.97892825e-7,
  "happiness": 0.9414122,
  "neutral": 0.0581188463,
  "sadness": 0.00006417118,
  "surprise": 0.00001122989

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412495.jpeg",
  "lastName": "Lee",
  "link": "https://www.govtrack.us/congress/members/mike_lee/412495",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "UT",
  "twitter": "SenMikeLee",
  "youtube": "senatormikelee",
  "anger": 1.21378477e-10,
  "contempt": 3.06630728e-11,
  "disgust": 2.26898847e-11,
  "fear": 4.06684452e-13,
  "happiness": 1,
  "neutral": 2.90932972e-11,
  "sadness": 3.99054531e-12,
  "surprise": 6.18537443e-11

}, {
  "firstName": "Ron",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412496.jpeg",
  "lastName": "Johnson",
  "link": "https://www.govtrack.us/congress/members/ron_johnson/412496",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "WI",
  "twitter": "SenRonJohnson",
  "youtube": "SenatorRonJohnson",
  "anger": 4.07235461e-7,
  "contempt": 0.00008608564,
  "disgust": 0.00000387633554,
  "fear": 2.52779042e-8,
  "happiness": 0.9964591,
  "neutral": 0.00343258469,
  "sadness": 0.0000122989422,
  "surprise": 0.00000557592148

}, {
  "firstName": "Mark",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412500.jpeg",
  "lastName": "Amodei",
  "link": "https://www.govtrack.us/congress/members/mark_amodei/412500",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NV",
  "twitter": "MarkAmodeiNV2",
  "youtube": "markamodeinv2",
  "anger": 0.0000163531149,
  "contempt": 0.00000228746921,
  "disgust": 0.0000362021674,
  "fear": 1.17905126e-8,
  "happiness": 0.999745667,
  "neutral": 0.00019484818,
  "sadness": 0.00000418926675,
  "surprise": 4.33329063e-7

}, {
  "firstName": "Suzanne",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412501.jpeg",
  "lastName": "Bonamici",
  "link": "https://www.govtrack.us/congress/members/suzanne_bonamici/412501",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "OR",
  "twitter": "RepBonamici",
  "youtube": "RepSuzanneBonamici",
  "anger": 0.000122420621,
  "contempt": 0.00003169811,
  "disgust": 0.000155529444,
  "fear": 0.000117973526,
  "happiness": 0.997774065,
  "neutral": 0.0009728743,
  "sadness": 0.000111137888,
  "surprise": 0.000714309164

}, {
  "firstName": "Thomas",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412503.jpeg",
  "lastName": "Massie",
  "link": "https://www.govtrack.us/congress/members/thomas_massie/412503",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "KY",
  "twitter": "RepThomasMassie",
  "youtube": "repthomasmassie",
  "anger": 1.59306266e-11,
  "contempt": 4.71945833e-13,
  "disgust": 6.6344194e-11,
  "fear": 1.41272972e-15,
  "happiness": 1,
  "neutral": 2.371466e-11,
  "sadness": 4.39822773e-14,
  "surprise": 2.07796731e-11

}, {
  "firstName": "Suzan",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412505.jpeg",
  "lastName": "DelBene",
  "link": "https://www.govtrack.us/congress/members/suzan_delbene/412505",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WA",
  "twitter": "RepDelBene",
  "anger": 1.34670453e-8,
  "contempt": 3.65541625e-10,
  "disgust": 1.19917365e-8,
  "fear": 1.62122035e-11,
  "happiness": 1,
  "neutral": 8.138248e-11,
  "sadness": 1.77174057e-11,
  "surprise": 3.622892e-9

}, {
  "firstName": "Donald",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412506.jpeg",
  "lastName": "Payne",
  "link": "https://www.govtrack.us/congress/members/donald_payne/412506",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NJ",
  "twitter": "RepDonaldPayne",
  "anger": 0.00238749618,
  "contempt": 0.000414346869,
  "disgust": 0.004574365,
  "fear": 0.0000067390406,
  "happiness": 0.991207659,
  "neutral": 0.00113672693,
  "sadness": 0.00006936513,
  "surprise": 0.000203306176

}, {
  "firstName": "Brian",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412507.jpeg",
  "lastName": "Schatz",
  "link": "https://www.govtrack.us/congress/members/brian_schatz/412507",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "HI",
  "twitter": "SenBrianSchatz",
  "youtube": "senbrianschatz",
  "anger": 1.70778574e-8,
  "contempt": 3.897559e-9,
  "disgust": 2.31987784e-7,
  "fear": 1.48890311e-9,
  "happiness": 0.9999997,
  "neutral": 3.551004e-8,
  "sadness": 2.70228462e-9,
  "surprise": 2.91561051e-8

}, {
  "firstName": "Kyrsten",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412509.jpeg",
  "lastName": "Sinema",
  "link": "https://www.govtrack.us/congress/members/kyrsten_sinema/412509",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "AZ",
  "twitter": "RepSinema",
  "youtube": "repsinema",
  "anger": 0.0000263446946,
  "contempt": 3.447321e-8,
  "disgust": 0.000149064523,
  "fear": 1.12091222e-7,
  "happiness": 0.999806643,
  "neutral": 0.00000141487089,
  "sadness": 6.39471637e-7,
  "surprise": 0.0000157762679

}, {
  "firstName": "Doug",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412510.jpeg",
  "lastName": "LaMalfa",
  "link": "https://www.govtrack.us/congress/members/doug_lamalfa/412510",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepLaMalfa",
  "youtube": "RepLaMalfa",
  "anger": 0.0142693371,
  "contempt": 0.00360957766,
  "disgust": 0.003589585,
  "fear": 0.00008131818,
  "happiness": 0.5836916,
  "neutral": 0.393067867,
  "sadness": 0.0005847945,
  "surprise": 0.00110589084

}, {
  "firstName": "Jared",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412511.jpeg",
  "lastName": "Huffman",
  "link": "https://www.govtrack.us/congress/members/jared_huffman/412511",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepHuffman",
  "youtube": "rephuffman",
  "anger": 4.51090472e-7,
  "contempt": 0.00000140401812,
  "disgust": 0.00000461763329,
  "fear": 5.51944844e-11,
  "happiness": 0.999861836,
  "neutral": 0.00013162251,
  "sadness": 1.2393051e-8,
  "surprise": 8.184189e-8

}, {
  "firstName": "Ami",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412512.jpeg",
  "lastName": "Bera",
  "link": "https://www.govtrack.us/congress/members/ami_bera/412512",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepBera",
  "youtube": "repamibera",
  "anger": 2.73213914e-8,
  "contempt": 5.72233e-10,
  "disgust": 1.32615989e-8,
  "fear": 7.695039e-10,
  "happiness": 0.999996364,
  "neutral": 9.221291e-9,
  "sadness": 2.70789675e-11,
  "surprise": 0.000003610564

}, {
  "firstName": "Paul",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412513.jpeg",
  "lastName": "Cook",
  "link": "https://www.govtrack.us/congress/members/paul_cook/412513",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepPaulCook",
  "youtube": "RepPaulCook",
  "anger": 0.000025428566,
  "contempt": 0.00656343531,
  "disgust": 0.0000778248359,
  "fear": 9.284831e-8,
  "happiness": 0.5857778,
  "neutral": 0.407386482,
  "sadness": 0.000160292853,
  "surprise": 0.00000862265551

}, {
  "firstName": "Eric",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412514.jpeg",
  "lastName": "Swalwell",
  "link": "https://www.govtrack.us/congress/members/eric_swalwell/412514",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepSwalwell",
  "youtube": "ericswalwell",
  "anger": 0.00006495079,
  "contempt": 0.000176851478,
  "disgust": 0.000314802572,
  "fear": 0.00000409656468,
  "happiness": 0.9895506,
  "neutral": 0.009766695,
  "sadness": 0.00008177604,
  "surprise": 0.000040231138

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412515.jpeg",
  "lastName": "Valadao",
  "link": "https://www.govtrack.us/congress/members/david_valadao/412515",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepDavidValadao",
  "youtube": "congressmanvaladao",
  "anger": 9.383906e-9,
  "contempt": 5.58848656e-9,
  "disgust": 6.209302e-7,
  "fear": 2.43652321e-11,
  "happiness": 0.9999985,
  "neutral": 8.696765e-7,
  "sadness": 3.31305228e-9,
  "surprise": 4.2642303e-9

}, {
  "firstName": "Julia",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412516.jpeg",
  "lastName": "Brownley",
  "link": "https://www.govtrack.us/congress/members/julia_brownley/412516",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "JuliaBrownley26",
  "youtube": "RepJuliaBrownley",
  "anger": 0.0000802975,
  "contempt": 0.0000227346027,
  "disgust": 0.000159041068,
  "fear": 7.83873759e-7,
  "happiness": 0.99813,
  "neutral": 0.00155431952,
  "sadness": 0.0000036094732,
  "surprise": 0.00004921866

}, {
  "firstName": "Tony",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412517.jpeg",
  "lastName": "Cárdenas",
  "link": "https://www.govtrack.us/congress/members/tony_cardenas/412517",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepCardenas",
  "youtube": "repcardenas",
  "anger": 7.06719945e-8,
  "contempt": 0.00000107532844,
  "disgust": 3.36921943e-7,
  "fear": 8.21658963e-10,
  "happiness": 0.999848545,
  "neutral": 0.00014743385,
  "sadness": 5.998907e-8,
  "surprise": 0.000002477853

}, {
  "firstName": "Raul",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412519.jpeg",
  "lastName": "Ruiz",
  "link": "https://www.govtrack.us/congress/members/raul_ruiz/412519",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "CongressmanRuiz",
  "youtube": "repraulruiz",
  "anger": 2.55458366e-9,
  "contempt": 0.000001863139,
  "disgust": 7.879906e-9,
  "fear": 3.05945165e-11,
  "happiness": 0.996767461,
  "neutral": 0.00323055685,
  "sadness": 5.13614928e-8,
  "surprise": 5.478948e-8

}, {
  "firstName": "Mark",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412520.jpeg",
  "lastName": "Takano",
  "link": "https://www.govtrack.us/congress/members/mark_takano/412520",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepMarkTakano",
  "youtube": "RepMarkTakano",
  "anger": 8.778435e-8,
  "contempt": 0.0000110768615,
  "disgust": 0.00000132826722,
  "fear": 2.20464935e-9,
  "happiness": 0.9993974,
  "neutral": 0.000589200063,
  "sadness": 1.69663139e-7,
  "surprise": 7.259365e-7

}, {
  "firstName": "Alan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412521.jpeg",
  "lastName": "Lowenthal",
  "link": "https://www.govtrack.us/congress/members/alan_lowenthal/412521",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepLowenthal",
  "youtube": "RepLowenthal",
  "anger": 7.378732e-7,
  "contempt": 7.28828242e-9,
  "disgust": 0.00000108615507,
  "fear": 3.76665532e-10,
  "happiness": 0.9999978,
  "neutral": 1.806471e-7,
  "sadness": 8.404328e-9,
  "surprise": 2.10389729e-7

}, {
  "firstName": "Juan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412522.jpeg",
  "lastName": "Vargas",
  "link": "https://www.govtrack.us/congress/members/juan_vargas/412522",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepJuanVargas",
  "youtube": "RepJuanVargas",
  "anger": 4.2637302e-10,
  "contempt": 2.30499127e-12,
  "disgust": 1.29270941e-8,
  "fear": 1.05656673e-12,
  "happiness": 1,
  "neutral": 5.367987e-10,
  "sadness": 3.591431e-12,
  "surprise": 1.60453006e-9

}, {
  "firstName": "Scott",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412523.jpeg",
  "lastName": "Peters",
  "link": "https://www.govtrack.us/congress/members/scott_peters/412523",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepScottPeters",
  "anger": 2.33524489e-7,
  "contempt": 4.15103152e-9,
  "disgust": 2.659233e-7,
  "fear": 3.350992e-10,
  "happiness": 0.9999987,
  "neutral": 8.009118e-7,
  "sadness": 5.686894e-10,
  "surprise": 1.45009089e-8

}, {
  "firstName": "Elizabeth",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412524.jpeg",
  "lastName": "Esty",
  "link": "https://www.govtrack.us/congress/members/elizabeth_esty/412524",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CT",
  "twitter": "RepEsty",
  "youtube": "RepEsty",
  "anger": 1.02631015e-8,
  "contempt": 1.23975754e-8,
  "disgust": 1.27857014e-8,
  "fear": 1.40968071e-10,
  "happiness": 0.9999998,
  "neutral": 1.23181479e-7,
  "sadness": 2.79150214e-9,
  "surprise": 9.003074e-9

}, {
  "firstName": "Ted",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412525.jpeg",
  "lastName": "Yoho",
  "link": "https://www.govtrack.us/congress/members/ted_yoho/412525",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepTedYoho",
  "youtube": "RepTedYoho",
  "anger": 3.37717354e-11,
  "contempt": 2.20754318e-10,
  "disgust": 4.1355e-9,
  "fear": 3.09470467e-14,
  "happiness": 0.9999999,
  "neutral": 1.00787013e-7,
  "sadness": 4.86799e-12,
  "surprise": 9.910142e-10

}, {
  "firstName": "Ron",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412526.jpeg",
  "lastName": "DeSantis",
  "link": "https://www.govtrack.us/congress/members/ron_desantis/412526",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepDeSantis",
  "youtube": "RepRonDeSantis",
  "anger": 2.65213231e-7,
  "contempt": 2.064758e-7,
  "disgust": 0.0000124581247,
  "fear": 2.89410829e-10,
  "happiness": 0.99998,
  "neutral": 0.00000476616651,
  "sadness": 0.000002309344,
  "surprise": 1.494833e-8

}, {
  "firstName": "Lois",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412529.jpeg",
  "lastName": "Frankel",
  "link": "https://www.govtrack.us/congress/members/lois_frankel/412529",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepLoisFrankel",
  "youtube": "reploisfrankel",
  "anger": 5.04787656e-10,
  "contempt": 1.65455254e-11,
  "disgust": 2.39551863e-8,
  "fear": 2.15467445e-14,
  "happiness": 1,
  "neutral": 4.98216052e-11,
  "sadness": 1.45226209e-9,
  "surprise": 1.44932261e-10

}, {
  "firstName": "Doug",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412531.jpeg",
  "lastName": "Collins",
  "link": "https://www.govtrack.us/congress/members/doug_collins/412531",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepDougCollins",
  "youtube": "repdougcollins",
  "anger": 0.000007866501,
  "contempt": 0.000855143357,
  "disgust": 0.0000105668132,
  "fear": 2.865714e-9,
  "happiness": 0.7458306,
  "neutral": 0.253281236,
  "sadness": 0.00000107999927,
  "surprise": 0.0000134750062

}, {
  "firstName": "Tulsi",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412532.jpeg",
  "lastName": "Gabbard",
  "link": "https://www.govtrack.us/congress/members/tulsi_gabbard/412532",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "HI",
  "twitter": "TulsiPress",
  "youtube": "tulsipress",
  "anger": 0.00000190578851,
  "contempt": 2.64515432e-9,
  "disgust": 3.93656933e-7,
  "fear": 3.721867e-8,
  "happiness": 0.9999976,
  "neutral": 6.19961e-9,
  "sadness": 8.359563e-9,
  "surprise": 3.034387e-8

}, {
  "firstName": "Tammy",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412533.jpeg",
  "lastName": "Duckworth",
  "link": "https://www.govtrack.us/congress/members/tammy_duckworth/412533",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "IL",
  "twitter": "SenDuckworth",
  "youtube": "repduckworth",
  "anger": 1.10265211e-13,
  "contempt": 1.02112326e-10,
  "disgust": 7.90207552e-11,
  "fear": 3.4204547e-17,
  "happiness": 1,
  "neutral": 5.39582867e-9,
  "sadness": 8.02840541e-13,
  "surprise": 2.03351259e-11

}, {
  "firstName": "Bradley",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412534.jpeg",
  "lastName": "Schneider",
  "link": "https://www.govtrack.us/congress/members/bradley_schneider/412534",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "repschneider",
  "youtube": "RepBradSchneider",
  "anger": 0.0000657378041,
  "contempt": 0.0000797381,
  "disgust": 0.00102882832,
  "fear": 4.75745281e-7,
  "happiness": 0.9985883,
  "neutral": 0.000204094671,
  "sadness": 0.0000295061654,
  "surprise": 0.00000329412342

}, {
  "firstName": "Rodney",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412536.jpeg",
  "lastName": "Davis",
  "link": "https://www.govtrack.us/congress/members/rodney_davis/412536",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IL",
  "twitter": "RodneyDavis",
  "youtube": "RepRodneyDavis",
  "anger": 0.0000224226551,
  "contempt": 0.000007500656,
  "disgust": 0.0000158451548,
  "fear": 3.58068561e-8,
  "happiness": 0.9973008,
  "neutral": 0.00264566275,
  "sadness": 0.00000583117526,
  "surprise": 0.00000189950731

}, {
  "firstName": "Cheri",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412537.jpeg",
  "lastName": "Bustos",
  "link": "https://www.govtrack.us/congress/members/cheri_bustos/412537",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepCheri",
  "youtube": "RepCheri",
  "anger": 1.22093287e-8,
  "contempt": 5.39810557e-12,
  "disgust": 1.29056044e-9,
  "fear": 1.0140816e-10,
  "happiness": 1,
  "neutral": 7.21939036e-11,
  "sadness": 5.576056e-10,
  "surprise": 1.00043467e-8

}, {
  "firstName": "Jackie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412538.jpeg",
  "lastName": "Walorski",
  "link": "https://www.govtrack.us/congress/members/jackie_walorski/412538",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IN",
  "twitter": "RepWalorski",
  "youtube": "repwalorski",
  "anger": 0.000008586777,
  "contempt": 4.92004437e-10,
  "disgust": 0.00000277955246,
  "fear": 8.85272e-8,
  "happiness": 0.9999885,
  "neutral": 1.77404846e-9,
  "sadness": 6.54318955e-9,
  "surprise": 6.433229e-8

}, {
  "firstName": "Susan",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412539.jpeg",
  "lastName": "Brooks",
  "link": "https://www.govtrack.us/congress/members/susan_brooks/412539",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IN",
  "twitter": "SusanWBrooks",
  "youtube": "SusanWBrooks",
  "anger": 4.853481e-8,
  "contempt": 1.047978e-9,
  "disgust": 1.28083087e-7,
  "fear": 1.23213245e-10,
  "happiness": 0.999999762,
  "neutral": 7.25747373e-9,
  "sadness": 4.43889325e-9,
  "surprise": 2.52611123e-8

}, {
  "firstName": "Luke",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412540.jpeg",
  "lastName": "Messer",
  "link": "https://www.govtrack.us/congress/members/luke_messer/412540",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IN",
  "twitter": "RepLukeMesser",
  "youtube": "RepLukeMesser",
  "anger": 1.08572484e-9,
  "contempt": 8.34801e-10,
  "disgust": 4.09993959e-8,
  "fear": 1.16002526e-14,
  "happiness": 0.99999994,
  "neutral": 2.3091058e-8,
  "sadness": 6.5970146e-12,
  "surprise": 2.778867e-11

}, {
  "firstName": "Garland",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412541.jpeg",
  "lastName": "Barr",
  "link": "https://www.govtrack.us/congress/members/garland_barr/412541",
  "nickname": "Andy",
  "party": "Republican",
  "role": "Representative",
  "state": "KY",
  "twitter": "RepAndyBarr",
  "youtube": "RepAndyBarr",
  "anger": 4.045833e-12,
  "contempt": 6.728721e-12,
  "disgust": 6.565411e-11,
  "fear": 9.425966e-17,
  "happiness": 1,
  "neutral": 1.20327817e-10,
  "sadness": 3.69305552e-14,
  "surprise": 4.03969523e-12

}, {
  "firstName": "Joseph",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412543.jpeg",
  "lastName": "Kennedy",
  "link": "https://www.govtrack.us/congress/members/joseph_kennedy/412543",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "RepJoeKennedy",
  "anger": 1.34396378e-8,
  "contempt": 9.169005e-13,
  "disgust": 8.337288e-9,
  "fear": 6.20099527e-9,
  "happiness": 0.999999762,
  "neutral": 1.0629787e-11,
  "sadness": 1.55532892e-10,
  "surprise": 2.22243415e-7

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412544.jpeg",
  "lastName": "Delaney",
  "link": "https://www.govtrack.us/congress/members/john_delaney/412544",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MD",
  "twitter": "RepJohnDelaney",
  "youtube": "repjohndelaney",
  "anger": 9.686332e-11,
  "contempt": 5.252146e-10,
  "disgust": 3.08475162e-10,
  "fear": 2.348132e-12,
  "happiness": 1,
  "neutral": 4.247628e-9,
  "sadness": 1.4525099e-11,
  "surprise": 7.860114e-9

}, {
  "firstName": "Daniel",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412546.jpeg",
  "lastName": "Kildee",
  "link": "https://www.govtrack.us/congress/members/daniel_kildee/412546",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepDanKildee",
  "youtube": "RepDanKildee",
  "anger": 0.00000300777447,
  "contempt": 7.46165256e-7,
  "disgust": 5.361322e-7,
  "fear": 7.00788227e-9,
  "happiness": 0.999991953,
  "neutral": 0.00000335617028,
  "sadness": 3.35690942e-8,
  "surprise": 3.670091e-7

}, {
  "firstName": "Ann",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412548.jpeg",
  "lastName": "Wagner",
  "link": "https://www.govtrack.us/congress/members/ann_wagner/412548",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MO",
  "twitter": "RepAnnWagner",
  "anger": 3.97844758e-7,
  "contempt": 1.02307884e-9,
  "disgust": 0.00000124132737,
  "fear": 1.23256845e-8,
  "happiness": 0.999997735,
  "neutral": 1.40843763e-8,
  "sadness": 8.039551e-11,
  "surprise": 5.736181e-7

}, {
  "firstName": "Richard",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412550.jpeg",
  "lastName": "Hudson",
  "link": "https://www.govtrack.us/congress/members/richard_hudson/412550",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepRichHudson",
  "youtube": "RepRichHudson",
  "anger": 4.6272536e-8,
  "contempt": 2.79460721e-7,
  "disgust": 2.781345e-7,
  "fear": 1.40942206e-12,
  "happiness": 0.9999966,
  "neutral": 0.0000027529095,
  "sadness": 7.703617e-10,
  "surprise": 3.09366541e-8

}, {
  "firstName": "Robert",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412551.jpeg",
  "lastName": "Pittenger",
  "link": "https://www.govtrack.us/congress/members/robert_pittenger/412551",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepPittenger",
  "youtube": "CongressmanPittenger",
  "anger": 1.17692679e-7,
  "contempt": 5.353618e-7,
  "disgust": 3.417771e-7,
  "fear": 8.08924162e-13,
  "happiness": 0.999738455,
  "neutral": 0.000260527,
  "sadness": 3.6912895e-9,
  "surprise": 2.91489743e-9

}, {
  "firstName": "Mark",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412552.jpeg",
  "lastName": "Meadows",
  "link": "https://www.govtrack.us/congress/members/mark_meadows/412552",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepMarkMeadows",
  "youtube": "RepMarkMeadows",
  "anger": 9.438356e-7,
  "contempt": 5.32396655e-7,
  "disgust": 4.572909e-7,
  "fear": 4.31065272e-9,
  "happiness": 0.99999243,
  "neutral": 0.00000553206246,
  "sadness": 3.86264638e-8,
  "surprise": 5.66575231e-8

}, {
  "firstName": "George",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412553.jpeg",
  "lastName": "Holding",
  "link": "https://www.govtrack.us/congress/members/george_holding/412553",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepHolding",
  "youtube": "repholding",
  "anger": 7.352214e-7,
  "contempt": 0.000196075693,
  "disgust": 0.000003985957,
  "fear": 1.49419925e-8,
  "happiness": 0.9898404,
  "neutral": 0.009861835,
  "sadness": 0.00009639938,
  "surprise": 5.40817e-7

}, {
  "firstName": "Kevin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412555.jpeg",
  "lastName": "Cramer",
  "link": "https://www.govtrack.us/congress/members/kevin_cramer/412555",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "ND",
  "twitter": "RepKevinCramer",
  "youtube": "kevincramer",
  "anger": 0.00000326419627,
  "contempt": 0.0000150929727,
  "disgust": 0.00020195714,
  "fear": 4.486023e-10,
  "happiness": 0.999665141,
  "neutral": 0.000113151211,
  "sadness": 5.822542e-7,
  "surprise": 8.027196e-7

}, {
  "firstName": "Ann",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412557.jpeg",
  "lastName": "Kuster",
  "link": "https://www.govtrack.us/congress/members/ann_kuster/412557",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NH",
  "twitter": "RepAnnieKuster",
  "youtube": "RepKuster",
  "anger": 0.000374624651,
  "contempt": 0.0000674124,
  "disgust": 0.00160455878,
  "fear": 0.0000133210342,
  "happiness": 0.9973138,
  "neutral": 0.000511657738,
  "sadness": 0.000095313655,
  "surprise": 0.0000193403721

}, {
  "firstName": "Michelle",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412558.jpeg",
  "lastName": "Lujan Grisham",
  "link": "https://www.govtrack.us/congress/members/michelle_lujan_grisham/412558",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NM",
  "twitter": "RepLujanGrisham",
  "youtube": "RepLujanGrisham",
  "anger": 0.00000141356054,
  "contempt": 0.00000160708646,
  "disgust": 0.00000404613775,
  "fear": 1.43971974e-7,
  "happiness": 0.9999444,
  "neutral": 0.0000418558047,
  "sadness": 1.00449228e-7,
  "surprise": 0.00000644881175

}, {
  "firstName": "Grace",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412560.jpeg",
  "lastName": "Meng",
  "link": "https://www.govtrack.us/congress/members/grace_meng/412560",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepGraceMeng",
  "anger": 6.23709937e-8,
  "contempt": 0.00030417848,
  "disgust": 0.000002656882,
  "fear": 6.37519371e-10,
  "happiness": 0.9926009,
  "neutral": 0.007086408,
  "sadness": 0.000004170847,
  "surprise": 0.00000159572244

}, {
  "firstName": "Hakeem",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412561.jpeg",
  "lastName": "Jeffries",
  "link": "https://www.govtrack.us/congress/members/hakeem_jeffries/412561",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepJeffries",
  "anger": 0.000004340641,
  "contempt": 0.000216751287,
  "disgust": 0.0000230680271,
  "fear": 2.6770044e-9,
  "happiness": 0.9055535,
  "neutral": 0.09416639,
  "sadness": 4.885378e-7,
  "surprise": 0.00003542392

}, {
  "firstName": "Sean",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412562.jpeg",
  "lastName": "Maloney",
  "link": "https://www.govtrack.us/congress/members/sean_maloney/412562",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepSeanMaloney",
  "anger": 1.12928089e-9,
  "contempt": 0.000160751122,
  "disgust": 1.149141e-8,
  "fear": 9.890114e-12,
  "happiness": 0.999812841,
  "neutral": 0.000026052985,
  "sadness": 8.714891e-11,
  "surprise": 3.487721e-7

}, {
  "firstName": "Chris",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412563.jpeg",
  "lastName": "Collins",
  "link": "https://www.govtrack.us/congress/members/chris_collins/412563",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepChrisCollins",
  "youtube": "RepChrisCollins",
  "anger": 8.659158e-8,
  "contempt": 5.011711e-7,
  "disgust": 3.95275e-7,
  "fear": 4.89721828e-8,
  "happiness": 0.9999473,
  "neutral": 0.00004509953,
  "sadness": 6.987809e-7,
  "surprise": 0.00000587961677

}, {
  "firstName": "Brad",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412564.jpeg",
  "lastName": "Wenstrup",
  "link": "https://www.govtrack.us/congress/members/brad_wenstrup/412564",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepBradWenstrup",
  "youtube": "repbradwenstrup",
  "anger": 0.00005258664,
  "contempt": 0.00103957392,
  "disgust": 0.000138366973,
  "fear": 1.47057166e-8,
  "happiness": 0.735284269,
  "neutral": 0.2634758,
  "sadness": 0.00000253864823,
  "surprise": 0.00000685289933

}, {
  "firstName": "Joyce",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412565.jpeg",
  "lastName": "Beatty",
  "link": "https://www.govtrack.us/congress/members/joyce_beatty/412565",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepBeatty",
  "anger": 0.000103985556,
  "contempt": 1.946308e-7,
  "disgust": 0.000212364917,
  "fear": 1.09216254e-8,
  "happiness": 0.999674261,
  "neutral": 1.90307944e-7,
  "sadness": 2.087971e-8,
  "surprise": 0.000008949931

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412566.jpeg",
  "lastName": "Joyce",
  "link": "https://www.govtrack.us/congress/members/david_joyce/412566",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "RepDaveJoyce",
  "youtube": "repdavejoyce",
  "anger": 1.1807032e-9,
  "contempt": 6.88358953e-11,
  "disgust": 6.958653e-10,
  "fear": 9.215926e-13,
  "happiness": 1,
  "neutral": 1.72646675e-9,
  "sadness": 4.818962e-9,
  "surprise": 7.64126956e-11

}, {
  "firstName": "Jim",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412567.jpeg",
  "lastName": "Bridenstine",
  "link": "https://www.govtrack.us/congress/members/jim_bridenstine/412567",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OK",
  "twitter": "RepJBridenstine",
  "youtube": "RepJimBridenstine",
  "anger": 7.16015e-10,
  "contempt": 2.95677225e-8,
  "disgust": 1.28485267e-8,
  "fear": 9.756981e-10,
  "happiness": 0.999999642,
  "neutral": 1.827692e-7,
  "sadness": 6.256977e-9,
  "surprise": 1.17325541e-7

}, {
  "firstName": "Markwayne",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412568.jpeg",
  "lastName": "Mullin",
  "link": "https://www.govtrack.us/congress/members/markwayne_mullin/412568",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OK",
  "twitter": "RepMullin",
  "anger": 3.588614e-8,
  "contempt": 0.000139948766,
  "disgust": 0.000004523322,
  "fear": 1.485355e-11,
  "happiness": 0.9990382,
  "neutral": 0.0008170994,
  "sadness": 5.67606273e-9,
  "surprise": 1.51397259e-7

}, {
  "firstName": "Scott",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412569.jpeg",
  "lastName": "Perry",
  "link": "https://www.govtrack.us/congress/members/scott_perry/412569",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepScottPerry",
  "youtube": "RepScottPerry",
  "anger": 1.06576131e-7,
  "contempt": 5.40856433e-7,
  "disgust": 0.000003605536,
  "fear": 4.30977448e-10,
  "happiness": 0.999978,
  "neutral": 0.0000175012774,
  "sadness": 1.7652593e-7,
  "surprise": 8.13440337e-8

}, {
  "firstName": "Keith",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412570.jpeg",
  "lastName": "Rothfus",
  "link": "https://www.govtrack.us/congress/members/keith_rothfus/412570",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "KeithRothfus",
  "youtube": "reprothfus",
  "anger": 9.506587e-8,
  "contempt": 7.532851e-7,
  "disgust": 3.69207442e-7,
  "fear": 1.06564452e-10,
  "happiness": 0.9999634,
  "neutral": 0.00003286296,
  "sadness": 0.00000253597614,
  "surprise": 4.73102935e-9

}, {
  "firstName": "Matthew",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412571.jpeg",
  "lastName": "Cartwright",
  "link": "https://www.govtrack.us/congress/members/matthew_cartwright/412571",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepCartwright",
  "anger": 0.004918018,
  "contempt": 0.00244738022,
  "disgust": 0.005778374,
  "fear": 5.75752551e-7,
  "happiness": 0.9071208,
  "neutral": 0.07962571,
  "sadness": 0.000101816076,
  "surprise": 0.00000730614056

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412572.jpeg",
  "lastName": "Rice",
  "link": "https://www.govtrack.us/congress/members/tom_rice/412572",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "SC",
  "twitter": "RepTomRice",
  "youtube": "RepTomRice",
  "anger": 8.75233653e-12,
  "contempt": 7.29538444e-11,
  "disgust": 8.932697e-11,
  "fear": 1.37747019e-13,
  "happiness": 1,
  "neutral": 3.90059451e-9,
  "sadness": 1.86336623e-12,
  "surprise": 5.78331438e-10

}, {
  "firstName": "Randy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412574.jpeg",
  "lastName": "Weber",
  "link": "https://www.govtrack.us/congress/members/randy_weber/412574",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "TXRandy14",
  "youtube": "TXRandy14",
  "anger": 4.36534364e-9,
  "contempt": 4.458624e-12,
  "disgust": 1.80222042e-8,
  "fear": 9.487528e-13,
  "happiness": 1,
  "neutral": 2.19636323e-10,
  "sadness": 3.07747783e-9,
  "surprise": 1.539486e-10

}, {
  "firstName": "Beto",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412575.jpeg",
  "lastName": "O’Rourke",
  "link": "https://www.govtrack.us/congress/members/beto_orourke/412575",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepBetoORourke",
  "youtube": "betoorourketx16",
  "anger": 6.98887337e-10,
  "contempt": 5.240498e-10,
  "disgust": 4.466683e-9,
  "fear": 1.8665462e-12,
  "happiness": 1,
  "neutral": 1.00608688e-9,
  "sadness": 4.65147e-12,
  "surprise": 2.24954666e-10

}, {
  "firstName": "Joaquin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412576.jpeg",
  "lastName": "Castro",
  "link": "https://www.govtrack.us/congress/members/joaquin_castro/412576",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "JoaquinCastrotx",
  "youtube": "JoaquinCastroTX",
  "anger": 7.31082439e-9,
  "contempt": 1.51428488e-8,
  "disgust": 3.84925976e-8,
  "fear": 1.26770455e-10,
  "happiness": 0.9999998,
  "neutral": 1.04261986e-7,
  "sadness": 1.94726568e-10,
  "surprise": 3.362973e-8

}, {
  "firstName": "Roger",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412578.jpeg",
  "lastName": "Williams",
  "link": "https://www.govtrack.us/congress/members/roger_williams/412578",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepRWilliams",
  "anger": 7.987151e-9,
  "contempt": 1.03446229e-8,
  "disgust": 2.71743055e-8,
  "fear": 4.42266059e-12,
  "happiness": 0.9999999,
  "neutral": 9.08072e-8,
  "sadness": 4.38930253e-10,
  "surprise": 9.341311e-9

}, {
  "firstName": "Marc",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412579.jpeg",
  "lastName": "Veasey",
  "link": "https://www.govtrack.us/congress/members/marc_veasey/412579",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepVeasey",
  "youtube": "marcveasey",
  "anger": 3.75388822e-8,
  "contempt": 5.090836e-7,
  "disgust": 1.52040457e-7,
  "fear": 1.923949e-10,
  "happiness": 0.9999813,
  "neutral": 0.0000179339077,
  "sadness": 5.86971467e-8,
  "surprise": 3.766554e-8

}, {
  "firstName": "Filemon",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412580.jpeg",
  "lastName": "Vela",
  "link": "https://www.govtrack.us/congress/members/filemon_vela/412580",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepFilemonVela",
  "youtube": "RepFilemonVela",
  "anger": 0.00391723355,
  "contempt": 0.01459887,
  "disgust": 0.00115376746,
  "fear": 0.000036142108,
  "happiness": 0.520637035,
  "neutral": 0.458274662,
  "sadness": 0.000442299672,
  "surprise": 0.000939971

}, {
  "firstName": "Chris",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412581.jpeg",
  "lastName": "Stewart",
  "link": "https://www.govtrack.us/congress/members/chris_stewart/412581",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "UT",
  "twitter": "RepChrisStewart",
  "youtube": "repchrisstewart",
  "anger": 0.000605356938,
  "contempt": 0.0207816,
  "disgust": 0.000375332369,
  "fear": 0.00000680529547,
  "happiness": 0.401346177,
  "neutral": 0.5760824,
  "sadness": 0.0005850056,
  "surprise": 0.00021733428

}, {
  "firstName": "Derek",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412583.jpeg",
  "lastName": "Kilmer",
  "link": "https://www.govtrack.us/congress/members/derek_kilmer/412583",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WA",
  "twitter": "RepDerekKilmer",
  "anger": 0.0147893839,
  "contempt": 0.0000145229915,
  "disgust": 0.01329916,
  "fear": 0.00602785638,
  "happiness": 0.9313424,
  "neutral": 0.000454412162,
  "sadness": 0.03023267,
  "surprise": 0.003839586

}, {
  "firstName": "Denny",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412584.jpeg",
  "lastName": "Heck",
  "link": "https://www.govtrack.us/congress/members/denny_heck/412584",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WA",
  "twitter": "RepDennyHeck",
  "youtube": "RepDennyHeck",
  "anger": 1.02855175e-7,
  "contempt": 2.60819633e-8,
  "disgust": 2.98709836e-7,
  "fear": 4.2309492e-10,
  "happiness": 0.999999046,
  "neutral": 4.81752863e-7,
  "sadness": 1.05024633e-9,
  "surprise": 4.82526943e-8

}, {
  "firstName": "Mark",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412585.jpeg",
  "lastName": "Pocan",
  "link": "https://www.govtrack.us/congress/members/mark_pocan/412585",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WI",
  "twitter": "RepMarkPocan",
  "youtube": "repmarkpocan",
  "anger": 6.45633236e-8,
  "contempt": 0.00000226377,
  "disgust": 4.00171018e-7,
  "fear": 2.07985261e-11,
  "happiness": 0.999810159,
  "neutral": 0.0001866559,
  "sadness": 1.61022555e-8,
  "surprise": 4.34318565e-7

}, {
  "firstName": "Robin",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412595.jpeg",
  "lastName": "Kelly",
  "link": "https://www.govtrack.us/congress/members/robin_kelly/412595",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepRobinKelly",
  "anger": 3.30969215e-7,
  "contempt": 0.00115934759,
  "disgust": 0.00005443314,
  "fear": 1.70384245e-11,
  "happiness": 0.998676538,
  "neutral": 0.000109232613,
  "sadness": 8.367634e-9,
  "surprise": 9.592812e-8

}, {
  "firstName": "Jason",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412596.jpeg",
  "lastName": "Smith",
  "link": "https://www.govtrack.us/congress/members/jason_smith/412596",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MO",
  "twitter": "RepJasonSmith",
  "youtube": "RepJasonSmith",
  "anger": 2.16838283e-10,
  "contempt": 3.581162e-9,
  "disgust": 7.92574728e-10,
  "fear": 1.556329e-14,
  "happiness": 0.99999994,
  "neutral": 5.77516275e-8,
  "sadness": 2.54602589e-12,
  "surprise": 1.25544256e-10

}, {
  "firstName": "Katherine",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412600.jpeg",
  "lastName": "Clark",
  "link": "https://www.govtrack.us/congress/members/katherine_clark/412600",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "RepKClark",
  "anger": 4.86109264e-10,
  "contempt": 2.7550023e-11,
  "disgust": 3.497389e-10,
  "fear": 2.00118411e-11,
  "happiness": 1,
  "neutral": 7.317155e-10,
  "sadness": 1.58932871e-12,
  "surprise": 1.531095e-8

}, {
  "firstName": "Bradley",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412601.jpeg",
  "lastName": "Byrne",
  "link": "https://www.govtrack.us/congress/members/bradley_byrne/412601",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AL",
  "twitter": "RepByrne",
  "anger": 0.00000170615692,
  "contempt": 0.00004619569,
  "disgust": 0.000003403391,
  "fear": 4.19891677e-10,
  "happiness": 0.964637339,
  "neutral": 0.03531038,
  "sadness": 8.87272336e-7,
  "surprise": 7.97794542e-8

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412605.jpeg",
  "lastName": "Brat",
  "link": "https://www.govtrack.us/congress/members/david_brat/412605",
  "nickname": "Dave",
  "party": "Republican",
  "role": "Representative",
  "state": "VA",
  "twitter": "RepDaveBrat",
  "anger": 1.06534735e-7,
  "contempt": 8.081329e-9,
  "disgust": 1.47717117e-7,
  "fear": 1.09423935e-10,
  "happiness": 0.9999995,
  "neutral": 1.86328478e-7,
  "sadness": 3.40318285e-9,
  "surprise": 1.60797988e-8

}, {
  "firstName": "Donald",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412606.jpeg",
  "lastName": "Norcross",
  "link": "https://www.govtrack.us/congress/members/donald_norcross/412606",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NJ",
  "twitter": "DonaldNorcross",
  "anger": 0.00000251298479,
  "contempt": 0.0000125969109,
  "disgust": 0.0000175648311,
  "fear": 2.72351173e-8,
  "happiness": 0.9995116,
  "neutral": 0.000443233934,
  "sadness": 0.000012382563,
  "surprise": 7.442575e-8

}, {
  "firstName": "Alma",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412607.jpeg",
  "lastName": "Adams",
  "link": "https://www.govtrack.us/congress/members/alma_adams/412607",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepAdams",
  "anger": 4.57755149e-8,
  "contempt": 3.13590237e-10,
  "disgust": 2.31454081e-7,
  "fear": 2.34456565e-9,
  "happiness": 0.9999968,
  "neutral": 3.96939157e-8,
  "sadness": 4.02538031e-10,
  "surprise": 0.000002915794

}, {
  "firstName": "Gary",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412608.jpeg",
  "lastName": "Palmer",
  "link": "https://www.govtrack.us/congress/members/gary_palmer/412608",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AL",
  "twitter": "USRepGaryPalmer",
  "anger": 0.00000184857652,
  "contempt": 0.00000277460822,
  "disgust": 0.00000475988872,
  "fear": 8.11427e-9,
  "happiness": 0.9992955,
  "neutral": 0.000693762267,
  "sadness": 1.87723529e-7,
  "surprise": 0.00000118690184

}, {
  "firstName": "French",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412609.jpeg",
  "lastName": "Hill",
  "link": "https://www.govtrack.us/congress/members/french_hill/412609",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AR",
  "twitter": "RepFrenchHill",
  "anger": 8.18507345e-11,
  "contempt": 8.126592e-9,
  "disgust": 4.167806e-10,
  "fear": 1.16826872e-12,
  "happiness": 1,
  "neutral": 2.96123037e-9,
  "sadness": 1.1657374e-9,
  "surprise": 7.248531e-11

}, {
  "firstName": "Bruce",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412610.jpeg",
  "lastName": "Westerman",
  "link": "https://www.govtrack.us/congress/members/bruce_westerman/412610",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AR",
  "twitter": "RepWesterman",
  "anger": 0.00004128795,
  "contempt": 0.00373156765,
  "disgust": 0.0000312351076,
  "fear": 9.512089e-8,
  "happiness": 0.511635,
  "neutral": 0.48452872,
  "sadness": 0.000020380041,
  "surprise": 0.000011714752

}, {
  "firstName": "Martha",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412611.jpeg",
  "lastName": "McSally",
  "link": "https://www.govtrack.us/congress/members/martha_mcsally/412611",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AZ",
  "twitter": "RepMcSally",
  "anger": 7.202524e-8,
  "contempt": 7.36076444e-8,
  "disgust": 1.50951863e-7,
  "fear": 2.45816576e-8,
  "happiness": 0.9999978,
  "neutral": 6.916648e-7,
  "sadness": 5.2878204e-9,
  "surprise": 0.00000118707476

}, {
  "firstName": "Ruben",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412612.jpeg",
  "lastName": "Gallego",
  "link": "https://www.govtrack.us/congress/members/ruben_gallego/412612",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "AZ",
  "twitter": "RepRubenGallego",
  "anger": 0.0000191545114,
  "contempt": 0.00230691512,
  "disgust": 0.000012079493,
  "fear": 2.3692013e-7,
  "happiness": 0.209620178,
  "neutral": 0.7879292,
  "sadness": 0.00009839557,
  "surprise": 0.0000138405721

}, {
  "firstName": "Mark",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412613.jpeg",
  "lastName": "DeSaulnier",
  "link": "https://www.govtrack.us/congress/members/mark_desaulnier/412613",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepDeSaulnier",
  "anger": 4.79478729e-7,
  "contempt": 0.00000220325182,
  "disgust": 7.92558865e-7,
  "fear": 3.106745e-10,
  "happiness": 0.9999498,
  "neutral": 0.00004654706,
  "sadness": 1.64507288e-8,
  "surprise": 1.45319092e-7

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412614.jpeg",
  "lastName": "Knight",
  "link": "https://www.govtrack.us/congress/members/steve_knight/412614",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "SteveKnight25",
  "anger": 0.00009022566,
  "contempt": 5.87987259e-8,
  "disgust": 0.00003410292,
  "fear": 3.396029e-10,
  "happiness": 0.9998755,
  "neutral": 2.776989e-8,
  "sadness": 6.27015e-10,
  "surprise": 7.50705738e-8

}, {
  "firstName": "Pete",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412615.jpeg",
  "lastName": "Aguilar",
  "link": "https://www.govtrack.us/congress/members/pete_aguilar/412615",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "reppeteaguilar",
  "anger": 5.19174179e-8,
  "contempt": 1.62528821e-7,
  "disgust": 7.3263385e-7,
  "fear": 3.66786332e-12,
  "happiness": 0.9999976,
  "neutral": 0.00000139603969,
  "sadness": 2.10472875e-10,
  "surprise": 1.3731265e-8

}, {
  "firstName": "Ted",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412616.jpeg",
  "lastName": "Lieu",
  "link": "https://www.govtrack.us/congress/members/ted_lieu/412616",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepTedLieu",
  "anger": 4.55909159e-8,
  "contempt": 0.000220153175,
  "disgust": 1.63943255e-7,
  "fear": 1.27046845e-10,
  "happiness": 0.9912149,
  "neutral": 0.008559348,
  "sadness": 8.05658544e-8,
  "surprise": 0.00000532098147

}, {
  "firstName": "Norma",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412617.jpeg",
  "lastName": "Torres",
  "link": "https://www.govtrack.us/congress/members/norma_torres/412617",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "NormaJTorres",
  "anger": 0.0000155818216,
  "contempt": 0.0000233780611,
  "disgust": 0.0000372574141,
  "fear": 0.000150721535,
  "happiness": 0.9990629,
  "neutral": 8.85744555e-7,
  "sadness": 0.00000210865755,
  "surprise": 0.000707162137

}, {
  "firstName": "Mimi",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412618.jpeg",
  "lastName": "Walters",
  "link": "https://www.govtrack.us/congress/members/mimi_walters/412618",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepMimiWalters",
  "anger": 0.00001863334,
  "contempt": 8.65209131e-7,
  "disgust": 0.0000860772343,
  "fear": 3.61392942e-8,
  "happiness": 0.9998876,
  "neutral": 0.00000556197256,
  "sadness": 2.495211e-8,
  "surprise": 0.00000118916921

}, {
  "firstName": "Ken",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412619.jpeg",
  "lastName": "Buck",
  "link": "https://www.govtrack.us/congress/members/ken_buck/412619",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "CO",
  "twitter": "RepKenBuck",
  "anger": 0.0000149355956,
  "contempt": 0.00037412846,
  "disgust": 0.00003137128,
  "fear": 4.85413576e-9,
  "happiness": 0.9246828,
  "neutral": 0.0748902,
  "sadness": 0.00000581562426,
  "surprise": 7.66517871e-7

}, {
  "firstName": "Carlos",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412621.jpeg",
  "lastName": "Curbelo",
  "link": "https://www.govtrack.us/congress/members/carlos_curbelo/412621",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepCurbelo",
  "anger": 1.61536615e-8,
  "contempt": 0.00002648521,
  "disgust": 1.268767e-8,
  "fear": 1.26237854e-10,
  "happiness": 0.9973248,
  "neutral": 0.00264811958,
  "sadness": 3.4110937e-7,
  "surprise": 2.23851814e-7

}, {
  "firstName": "Buddy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412622.jpeg",
  "lastName": "Carter",
  "link": "https://www.govtrack.us/congress/members/buddy_carter/412622",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepBuddyCarter",
  "anger": 0.00100234686,
  "contempt": 0.00381515617,
  "disgust": 0.00117003976,
  "fear": 0.000008566751,
  "happiness": 0.887948453,
  "neutral": 0.103621036,
  "sadness": 0.000170679268,
  "surprise": 0.00226370152

}, {
  "firstName": "Jody",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412623.jpeg",
  "lastName": "Hice",
  "link": "https://www.govtrack.us/congress/members/jody_hice/412623",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "congressmanhice",
  "anger": 6.5760355e-7,
  "contempt": 0.000176493282,
  "disgust": 4.09065251e-7,
  "fear": 8.621251e-10,
  "happiness": 0.729699,
  "neutral": 0.2701218,
  "sadness": 0.00000137359928,
  "surprise": 2.59922984e-7

}, {
  "firstName": "Barry",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412624.jpeg",
  "lastName": "Loudermilk",
  "link": "https://www.govtrack.us/congress/members/barry_loudermilk/412624",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepLoudermilk",
  "anger": 2.057839e-8,
  "contempt": 1.30388589e-10,
  "disgust": 6.550685e-8,
  "fear": 2.86961318e-13,
  "happiness": 0.9999999,
  "neutral": 9.504532e-10,
  "sadness": 4.409456e-11,
  "surprise": 2.700863e-9

}, {
  "firstName": "Rick",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412625.jpeg",
  "lastName": "Allen",
  "link": "https://www.govtrack.us/congress/members/rick_allen/412625",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "reprickallen",
  "anger": 0.00000112127623,
  "contempt": 2.35116978e-11,
  "disgust": 0.00000330966168,
  "fear": 7.576768e-11,
  "happiness": 0.999995351,
  "neutral": 9.589818e-10,
  "sadness": 1.75042018e-7,
  "surprise": 3.5324927e-8

}, {
  "firstName": "Rod",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412627.jpeg",
  "lastName": "Blum",
  "link": "https://www.govtrack.us/congress/members/rod_blum/412627",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IA",
  "twitter": "RepRodBlum",
  "anger": 9.11976542e-7,
  "contempt": 0.000247356133,
  "disgust": 0.0000014177142,
  "fear": 2.74489342e-9,
  "happiness": 0.84115845,
  "neutral": 0.158584371,
  "sadness": 0.000007350829,
  "surprise": 1.36026912e-7

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412628.jpeg",
  "lastName": "Young",
  "link": "https://www.govtrack.us/congress/members/david_young/412628",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IA",
  "twitter": "RepDavidYoung",
  "anger": 0.00002545796,
  "contempt": 0.00000215472755,
  "disgust": 0.0000272756515,
  "fear": 1.23785044e-8,
  "happiness": 0.9999043,
  "neutral": 0.0000363954132,
  "sadness": 0.000004212239,
  "surprise": 2.41745454e-7

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412629.jpeg",
  "lastName": "Bost",
  "link": "https://www.govtrack.us/congress/members/mike_bost/412629",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepBost",
  "anger": 7.283729e-12,
  "contempt": 4.917852e-9,
  "disgust": 1.950485e-10,
  "fear": 5.458943e-13,
  "happiness": 0.99999994,
  "neutral": 2.512954e-8,
  "sadness": 3.816505e-10,
  "surprise": 1.59441382e-9

}, {
  "firstName": "Ralph",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412630.jpeg",
  "lastName": "Abraham",
  "link": "https://www.govtrack.us/congress/members/ralph_abraham/412630",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "LA",
  "twitter": "RepAbraham",
  "anger": 7.283729e-12,
  "contempt": 4.917852e-9,
  "disgust": 1.950485e-10,
  "fear": 5.458943e-13,
  "happiness": 0.99999994,
  "neutral": 2.512954e-8,
  "sadness": 3.816505e-10,
  "surprise": 1.59441382e-9

}, {
  "firstName": "Garret",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412631.jpeg",
  "lastName": "Graves",
  "link": "https://www.govtrack.us/congress/members/garret_graves/412631",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "LA",
  "twitter": "RepGarretGraves",
  "anger": 2.50163068e-9,
  "contempt": 4.72044661e-8,
  "disgust": 1.08489848e-8,
  "fear": 2.3145923e-9,
  "happiness": 0.999997139,
  "neutral": 1.19773077e-7,
  "sadness": 0.0000026882783,
  "surprise": 1.0080476e-8

}, {
  "firstName": "Seth",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412632.jpeg",
  "lastName": "Moulton",
  "link": "https://www.govtrack.us/congress/members/seth_moulton/412632",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MA",
  "twitter": "teammoulton",
  "anger": 4.05397117e-7,
  "contempt": 6.193319e-8,
  "disgust": 0.000001998093,
  "fear": 2.415375e-9,
  "happiness": 0.999996543,
  "neutral": 6.412874e-7,
  "sadness": 3.33678e-7,
  "surprise": 2.862144e-8

}, {
  "firstName": "Bruce",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412633.jpeg",
  "lastName": "Poliquin",
  "link": "https://www.govtrack.us/congress/members/bruce_poliquin/412633",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "ME",
  "twitter": "RepPoliquin",
  "anger": 1.7230489e-8,
  "contempt": 1.36530829e-7,
  "disgust": 4.28387779e-7,
  "fear": 5.02316244e-10,
  "happiness": 0.9999977,
  "neutral": 0.00000123754012,
  "sadness": 2.51979372e-7,
  "surprise": 2.30629354e-7

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412634.jpeg",
  "lastName": "Moolenaar",
  "link": "https://www.govtrack.us/congress/members/john_moolenaar/412634",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepMoolenaar",
  "anger": 3.53602871e-7,
  "contempt": 0.00000304796981,
  "disgust": 0.000002380862,
  "fear": 3.41125483e-9,
  "happiness": 0.9991475,
  "neutral": 0.0008408439,
  "sadness": 3.79492029e-8,
  "surprise": 0.000005849309

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412635.jpeg",
  "lastName": "Bishop",
  "link": "https://www.govtrack.us/congress/members/mike_bishop/412635",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepMikeBishop",
  "anger": 1.56557156e-9,
  "contempt": 1.488096e-7,
  "disgust": 2.4099684e-8,
  "fear": 7.393396e-12,
  "happiness": 0.99990654,
  "neutral": 0.00009324687,
  "sadness": 1.279021e-9,
  "surprise": 2.25527579e-8

}, {
  "firstName": "Dave",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412636.jpeg",
  "lastName": "Trott",
  "link": "https://www.govtrack.us/congress/members/dave_trott/412636",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "twitter": "repdavetrott",
  "anger": 9.664603e-7,
  "contempt": 0.0000330531657,
  "disgust": 0.000021144504,
  "fear": 5.35741435e-7,
  "happiness": 0.997482657,
  "neutral": 0.00200937153,
  "sadness": 0.0000013328596,
  "surprise": 0.0004509277

}, {
  "firstName": "Debbie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412637.jpeg",
  "lastName": "Dingell",
  "link": "https://www.govtrack.us/congress/members/debbie_dingell/412637",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepDebDingell",
  "anger": 0.0000184353885,
  "contempt": 0.0106698861,
  "disgust": 0.000173014836,
  "fear": 0.0000281466109,
  "happiness": 0.900114655,
  "neutral": 0.06321719,
  "sadness": 0.02572636,
  "surprise": 0.000052335643

}, {
  "firstName": "Brenda",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412638.jpeg",
  "lastName": "Lawrence",
  "link": "https://www.govtrack.us/congress/members/brenda_lawrence/412638",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepLawrence",
  "anger": 4.650323e-7,
  "contempt": 3.0057698e-10,
  "disgust": 6.93149843e-7,
  "fear": 7.705455e-10,
  "happiness": 0.9999987,
  "neutral": 6.47383747e-9,
  "sadness": 9.02352149e-9,
  "surprise": 1.44458156e-7

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412639.jpeg",
  "lastName": "Emmer",
  "link": "https://www.govtrack.us/congress/members/tom_emmer/412639",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MN",
  "twitter": "RepTomEmmer",
  "youtube": "RepTomEmmer",
  "anger": 3.016926e-7,
  "contempt": 0.00006342965,
  "disgust": 0.00000191821732,
  "fear": 5.16996046e-9,
  "happiness": 0.9923823,
  "neutral": 0.00754948,
  "sadness": 0.00000199478245,
  "surprise": 5.844923e-7

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412641.jpeg",
  "lastName": "Rouzer",
  "link": "https://www.govtrack.us/congress/members/david_rouzer/412641",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepDavidRouzer",
  "anger": 0.000001001465,
  "contempt": 0.0000179992549,
  "disgust": 0.00000770711449,
  "fear": 6.6469326e-8,
  "happiness": 0.9998057,
  "neutral": 0.00013919847,
  "sadness": 0.0000250377725,
  "surprise": 0.000003302004

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412643.jpeg",
  "lastName": "MacArthur",
  "link": "https://www.govtrack.us/congress/members/tom_macarthur/412643",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NJ",
  "twitter": "RepTomMacArthur",
  "anger": 6.128947e-7,
  "contempt": 0.000212476691,
  "disgust": 0.00000111656516,
  "fear": 1.00299559e-7,
  "happiness": 0.996314347,
  "neutral": 0.00341503625,
  "sadness": 2.42227884e-7,
  "surprise": 0.000056076944

}, {
  "firstName": "Bonnie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412644.jpeg",
  "lastName": "Watson Coleman",
  "link": "https://www.govtrack.us/congress/members/bonnie_watson_coleman/412644",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NJ",
  "twitter": "RepBonnie",
  "anger": 4.15074965e-7,
  "contempt": 0.0000125595161,
  "disgust": 5.304274e-7,
  "fear": 8.615296e-9,
  "happiness": 0.9999527,
  "neutral": 0.0000330427429,
  "sadness": 1.4455955e-7,
  "surprise": 6.072641e-7

}, {
  "firstName": "Lee",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412646.jpeg",
  "lastName": "Zeldin",
  "link": "https://www.govtrack.us/congress/members/lee_zeldin/412646",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepLeeZeldin",
  "anger": 3.68823749e-10,
  "contempt": 4.43722428e-8,
  "disgust": 2.11315268e-8,
  "fear": 5.37728279e-15,
  "happiness": 0.999993265,
  "neutral": 0.00000669799,
  "sadness": 1.70561065e-11,
  "surprise": 2.142117e-10

}, {
  "firstName": "Kathleen",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412647.jpeg",
  "lastName": "Rice",
  "link": "https://www.govtrack.us/congress/members/kathleen_rice/412647",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepKathleenRice",
  "anger": 3.19010169e-8,
  "contempt": 2.4011685e-11,
  "disgust": 7.06443e-11,
  "fear": 4.18510726e-10,
  "happiness": 0.9999998,
  "neutral": 1.06137883e-10,
  "sadness": 6.88618433e-12,
  "surprise": 1.65571734e-7

}, {
  "firstName": "Elise",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412648.jpeg",
  "lastName": "Stefanik",
  "link": "https://www.govtrack.us/congress/members/elise_stefanik/412648",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepStefanik",
  "anger": 1.25612756e-10,
  "contempt": 5.080428e-10,
  "disgust": 3.86136e-10,
  "fear": 1.11828786e-12,
  "happiness": 1,
  "neutral": 2.14820552e-8,
  "sadness": 4.793107e-11,
  "surprise": 6.36179465e-9

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412649.jpeg",
  "lastName": "Katko",
  "link": "https://www.govtrack.us/congress/members/john_katko/412649",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepJohnKatko",
  "anger": 0.00166800478,
  "contempt": 0.00106867612,
  "disgust": 0.004591703,
  "fear": 0.0000032352,
  "happiness": 0.9602597,
  "neutral": 0.03225484,
  "sadness": 0.000116286079,
  "surprise": 0.0000375973468

}, {
  "firstName": "Steve",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412650.jpeg",
  "lastName": "Russell",
  "link": "https://www.govtrack.us/congress/members/steve_russell/412650",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OK",
  "twitter": "RepRussell",
  "anger": 1.94301251e-7,
  "contempt": 4.40160647e-7,
  "disgust": 0.00000268603458,
  "fear": 1.48943471e-8,
  "happiness": 0.9999709,
  "neutral": 0.000025008545,
  "sadness": 1.53241857e-7,
  "surprise": 6.182093e-7

}, {
  "firstName": "Ryan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412651.jpeg",
  "lastName": "Costello",
  "link": "https://www.govtrack.us/congress/members/ryan_costello/412651",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepRyanCostello",
  "anger": 7.118714e-14,
  "contempt": 4.454374e-12,
  "disgust": 2.73923089e-11,
  "fear": 1.01551521e-15,
  "happiness": 1,
  "neutral": 3.757821e-11,
  "sadness": 8.100082e-13,
  "surprise": 6.51079052e-11

}, {
  "firstName": "Brendan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412652.jpeg",
  "lastName": "Boyle",
  "link": "https://www.govtrack.us/congress/members/brendan_boyle/412652",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "PA",
  "twitter": "CongBoyle",
  "anger": 2.37199558e-7,
  "contempt": 0.0000208642487,
  "disgust": 0.00000384832447,
  "fear": 8.211222e-10,
  "happiness": 0.999557555,
  "neutral": 0.000416454481,
  "sadness": 2.01014636e-8,
  "surprise": 0.00000101631815

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412653.jpeg",
  "lastName": "Ratcliffe",
  "link": "https://www.govtrack.us/congress/members/john_ratcliffe/412653",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepRatcliffe",
  "anger": 0.000042837095,
  "contempt": 0.000108341213,
  "disgust": 0.0000256092189,
  "fear": 9.488727e-7,
  "happiness": 0.9954967,
  "neutral": 0.004305486,
  "sadness": 0.000005668867,
  "surprise": 0.0000144248861

}, {
  "firstName": "Will",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412654.jpeg",
  "lastName": "Hurd",
  "link": "https://www.govtrack.us/congress/members/will_hurd/412654",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "hurdonthehill",
  "anger": 1.33534142e-10,
  "contempt": 2.10873772e-8,
  "disgust": 9.745861e-10,
  "fear": 2.748596e-13,
  "happiness": 0.9999999,
  "neutral": 1.01914395e-7,
  "sadness": 5.811951e-11,
  "surprise": 1.17146057e-10

}, {
  "firstName": "Brian",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412655.jpeg",
  "lastName": "Babin",
  "link": "https://www.govtrack.us/congress/members/brian_babin/412655",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepBrianBabin",
  "anger": 0.00004960732,
  "contempt": 0.008964823,
  "disgust": 0.00007113908,
  "fear": 1.91362531e-7,
  "happiness": 0.5122593,
  "neutral": 0.4784888,
  "sadness": 0.00009422851,
  "surprise": 0.000071897106

}, {
  "firstName": "Mia",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412656.jpeg",
  "lastName": "Love",
  "link": "https://www.govtrack.us/congress/members/mia_love/412656",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "UT",
  "twitter": "repmialove",
  "anger": 2.11993516e-8,
  "contempt": 2.29772059e-8,
  "disgust": 8.101158e-9,
  "fear": 5.085671e-9,
  "happiness": 0.999997258,
  "neutral": 0.00000217573916,
  "sadness": 9.18089549e-10,
  "surprise": 5.18293632e-7

}, {
  "firstName": "Donald",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412657.jpeg",
  "lastName": "Beyer",
  "link": "https://www.govtrack.us/congress/members/donald_beyer/412657",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "VA",
  "twitter": "repdonbeyer",
  "anger": 0.00000645939326,
  "contempt": 0.000198025635,
  "disgust": 0.00003861653,
  "fear": 5.59447457e-8,
  "happiness": 0.9929438,
  "neutral": 0.006798899,
  "sadness": 0.00000354793815,
  "surprise": 0.0000105701274

}, {
  "firstName": "Barbara",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412658.jpeg",
  "lastName": "Comstock",
  "link": "https://www.govtrack.us/congress/members/barbara_comstock/412658",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "VA",
  "twitter": "RepComstock",
  "anger": 3.781952e-9,
  "contempt": 8.772902e-8,
  "disgust": 2.88583323e-7,
  "fear": 1.36722968e-12,
  "happiness": 0.9999989,
  "neutral": 6.747726e-7,
  "sadness": 8.354214e-10,
  "surprise": 3.31053962e-9

}, {
  "firstName": "Stacey",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412659.jpeg",
  "lastName": "Plaskett",
  "link": "https://www.govtrack.us/congress/members/stacey_plaskett/412659",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "VI",
  "twitter": "staceyplaskett",
  "anger": 8.709273e-7,
  "contempt": 9.480107e-9,
  "disgust": 2.32759348e-7,
  "fear": 4.37285159e-8,
  "happiness": 0.999967,
  "neutral": 4.47463862e-8,
  "sadness": 3.8658754e-10,
  "surprise": 0.0000318372877

}, {
  "firstName": "Dan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412660.jpeg",
  "lastName": "Newhouse",
  "link": "https://www.govtrack.us/congress/members/dan_newhouse/412660",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WA",
  "twitter": "RepNewhouse",
  "anger": 1.15670549e-8,
  "contempt": 1.58116848e-7,
  "disgust": 1.8652468e-8,
  "fear": 2.63898868e-11,
  "happiness": 0.9999844,
  "neutral": 0.0000154478967,
  "sadness": 2.494052e-9,
  "surprise": 5.378544e-9

}, {
  "firstName": "Glenn",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412661.jpeg",
  "lastName": "Grothman",
  "link": "https://www.govtrack.us/congress/members/glenn_grothman/412661",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WI",
  "twitter": "RepGrothman",
  "anger": 7.91767832e-7,
  "contempt": 5.28058663e-9,
  "disgust": 4.56814149e-7,
  "fear": 1.25770372e-9,
  "happiness": 0.9999984,
  "neutral": 2.5583148e-7,
  "sadness": 3.04299022e-8,
  "surprise": 9.29838961e-8

}, {
  "firstName": "Alex",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412662.jpeg",
  "lastName": "Mooney",
  "link": "https://www.govtrack.us/congress/members/alex_mooney/412662",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WV",
  "twitter": "RepAlexMooney",
  "anger": 1.33666632e-7,
  "contempt": 0.0000101423329,
  "disgust": 0.00000270424425,
  "fear": 6.336277e-10,
  "happiness": 0.9985117,
  "neutral": 0.00147495663,
  "sadness": 2.5857176e-7,
  "surprise": 1.56946612e-7

}, {
  "firstName": "Evan",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412663.jpeg",
  "lastName": "Jenkins",
  "link": "https://www.govtrack.us/congress/members/evan_jenkins/412663",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WV",
  "twitter": "RepEvanJenkins",
  "anger": 6.718218e-8,
  "contempt": 7.21785431e-9,
  "disgust": 1.14578373e-8,
  "fear": 1.8609099e-10,
  "happiness": 0.9999998,
  "neutral": 7.756107e-8,
  "sadness": 2.12425327e-10,
  "surprise": 1.23367636e-8

}, {
  "firstName": "Aumua",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412664.jpeg",
  "lastName": "Amata",
  "link": "https://www.govtrack.us/congress/members/aumua_amata/412664",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AS",
  "twitter": "RepAmata",
  "anger": 0.00000172557441,
  "contempt": 9.28558052e-7,
  "disgust": 0.0000228243443,
  "fear": 3.70033035e-8,
  "happiness": 0.999862969,
  "neutral": 0.00009245227,
  "sadness": 4.26998838e-7,
  "surprise": 0.00001865265

}, {
  "firstName": "Mark",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412670.jpeg",
  "lastName": "Walker",
  "link": "https://www.govtrack.us/congress/members/mark_walker/412670",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepMarkWalker",
  "anger": 0.0000126206724,
  "contempt": 0.0156494547,
  "disgust": 0.0000500765054,
  "fear": 0.00000188024069,
  "happiness": 0.808051765,
  "neutral": 0.175298437,
  "sadness": 0.000918212056,
  "surprise": 0.000017583905

}, {
  "firstName": "Daniel",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412672.jpeg",
  "lastName": "Donovan",
  "link": "https://www.govtrack.us/congress/members/daniel_donovan/412672",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepDanDonovan",
  "anger": 4.401961e-8,
  "contempt": 0.000008277618,
  "disgust": 5.57393e-7,
  "fear": 6.600839e-10,
  "happiness": 0.987587,
  "neutral": 0.0124031082,
  "sadness": 4.283765e-8,
  "surprise": 0.00000101891771

}, {
  "firstName": "Trent",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412673.jpeg",
  "lastName": "Kelly",
  "link": "https://www.govtrack.us/congress/members/trent_kelly/412673",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MS",
  "twitter": "reptrentkelly",
  "anger": 1.0931344e-7,
  "contempt": 0.000276991952,
  "disgust": 0.00000164148446,
  "fear": 1.11050436e-9,
  "happiness": 0.979421258,
  "neutral": 0.02028545,
  "sadness": 0.0000140301418,
  "surprise": 4.965316e-7

}, {
  "firstName": "Darin",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412674.jpeg",
  "lastName": "LaHood",
  "link": "https://www.govtrack.us/congress/members/darin_lahood/412674",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IL",
  "twitter": "RepLaHood",
  "anger": 3.11789336e-7,
  "contempt": 0.000003714036,
  "disgust": 0.000001568075,
  "fear": 2.86886515e-8,
  "happiness": 0.9997004,
  "neutral": 0.0002598858,
  "sadness": 4.96996222e-8,
  "surprise": 0.0000339896142

}, {
  "firstName": "Warren",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412675.jpeg",
  "lastName": "Davidson",
  "link": "https://www.govtrack.us/congress/members/warren_davidson/412675",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "OH",
  "twitter": "WarrenDavidson",
  "anger": 0.000017055092,
  "contempt": 0.0000750754043,
  "disgust": 0.0000337925048,
  "fear": 1.04018563e-8,
  "happiness": 0.9804182,
  "neutral": 0.0194509737,
  "sadness": 0.00000359568912,
  "surprise": 0.00000127704266

}, {
  "firstName": "James",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412676.jpeg",
  "lastName": "Comer",
  "link": "https://www.govtrack.us/congress/members/james_comer/412676",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "KY",
  "anger": 9.300169e-9,
  "contempt": 4.824057e-8,
  "disgust": 3.98101818e-8,
  "fear": 1.123251e-12,
  "happiness": 0.999999464,
  "neutral": 4.53100625e-7,
  "sadness": 2.7098197e-9,
  "surprise": 2.63971456e-10

}, {
  "firstName": "Dwight",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412677.jpeg",
  "lastName": "Evans",
  "link": "https://www.govtrack.us/congress/members/dwight_evans/412677",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepDwightEvans",
  "anger": 0.000004504887,
  "contempt": 0.0000125091483,
  "disgust": 0.0000100063544,
  "fear": 3.911773e-9,
  "happiness": 0.9997166,
  "neutral": 0.000255572028,
  "sadness": 1.9708105e-7,
  "surprise": 6.47867466e-7

}, {
  "firstName": "Kamala",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412678.jpeg",
  "lastName": "Harris",
  "link": "https://www.govtrack.us/congress/members/kamala_harris/412678",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "CA",
  "twitter": "SenKamalaHarris",
  "anger": 3.74080367e-9,
  "contempt": 1.32335964e-8,
  "disgust": 1.13347262e-7,
  "fear": 7.617464e-10,
  "happiness": 0.9999997,
  "neutral": 9.508782e-8,
  "sadness": 1.85934956e-9,
  "surprise": 9.386429e-8

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412679.jpeg",
  "lastName": "Kennedy",
  "link": "https://www.govtrack.us/congress/members/john_kennedy/412679",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "LA",
  "twitter": "SenJohnKennedy",
  "anger": 0.0000124461185,
  "contempt": 0.000721943,
  "disgust": 0.000057253892,
  "fear": 3.90809135e-10,
  "happiness": 0.724016666,
  "neutral": 0.275181264,
  "sadness": 0.0000102846552,
  "surprise": 1.300133e-7

}, {
  "firstName": "Margaret",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412680.jpeg",
  "lastName": "Hassan",
  "link": "https://www.govtrack.us/congress/members/margaret_hassan/412680",
  "nickname": "Maggie",
  "party": "Democrat",
  "role": "Senator",
  "state": "NH",
  "twitter": "Senatorhassan",
  "anger": 6.729597e-11,
  "contempt": 5.6706457e-13,
  "disgust": 3.65901372e-11,
  "fear": 1.522165e-11,
  "happiness": 1,
  "neutral": 2.82124866e-12,
  "sadness": 4.34850281e-11,
  "surprise": 6.644934e-10

}, {
  "firstName": "Catherine",
  "gender": "female",
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Catherine_Cortez_Masto_official_portrait.jpg/800px-Catherine_Cortez_Masto_official_portrait.jpg",
  "lastName": "Cortez Masto",
  "link": "https://www.govtrack.us/congress/members/catherine_cortez_masto/412681",
  "nickname": "",
  "party": "Democrat",
  "role": "Senator",
  "state": "NV",
  "twitter": "sencortezmasto",
  "anger": 1.64984684E-08,
  "contempt": 1.54730628E-08,
  "disgust": 3.12831645E-08,
  "fear": 1.82894325E-12,
  "happiness": 0.99999994,
  "neutral": 9.12206144E-10,
  "sadness": 1.07636677E-11,
  "surprise": 1.3471354E-09

}, {
  "firstName": "Tom",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412682.jpeg",
  "lastName": "O’Halleran",
  "link": "https://www.govtrack.us/congress/members/tom_ohalleran/412682",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "AZ",
  "twitter": "repohalleran",
  "anger": 3.58132354e-7,
  "contempt": 2.18640537e-8,
  "disgust": 7.506321e-7,
  "fear": 5.91385068e-13,
  "happiness": 0.9999982,
  "neutral": 6.65231255e-7,
  "sadness": 1.34947842e-9,
  "surprise": 5.07052755e-9

}, {
  "firstName": "Andy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412683.jpeg",
  "lastName": "Biggs",
  "link": "https://www.govtrack.us/congress/members/andy_biggs/412683",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "AZ",
  "twitter": "RepAndyBiggsAZ",
  "anger": 1.02539788e-9,
  "contempt": 2.16127454e-8,
  "disgust": 4.140614e-9,
  "fear": 1.18962972e-13,
  "happiness": 0.9999999,
  "neutral": 1.12193966e-7,
  "sadness": 3.49132181e-11,
  "surprise": 9.504567e-10

}, {
  "firstName": "Ro",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412684.jpeg",
  "lastName": "Khanna",
  "link": "https://www.govtrack.us/congress/members/ro_khanna/412684",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepRoKhanna",
  "anger": 0.0747668743,
  "contempt": 0.002024364,
  "disgust": 0.04592034,
  "fear": 0.000214741041,
  "happiness": 0.871265769,
  "neutral": 0.005251902,
  "sadness": 0.0004704469,
  "surprise": 0.00008557251

}, {
  "firstName": "Jimmy",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412685.jpeg",
  "lastName": "Panetta",
  "link": "https://www.govtrack.us/congress/members/jimmy_panetta/412685",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepJimmyPanetta",
  "anger": 6.57911158e-15,
  "contempt": 1.88909516e-13,
  "disgust": 3.952984e-13,
  "fear": 4.07429879e-20,
  "happiness": 1,
  "neutral": 8.639251e-13,
  "sadness": 2.93264379e-16,
  "surprise": 1.0184642e-14

}, {
  "firstName": "Salud",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412686.jpeg",
  "lastName": "Carbajal",
  "link": "https://www.govtrack.us/congress/members/salud_carbajal/412686",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepCarbajal",
  "youtube": "repcarbajal",
  "anger": 5.46591536e-8,
  "contempt": 0.00000752043843,
  "disgust": 8.787383e-7,
  "fear": 4.63104034e-11,
  "happiness": 0.9949808,
  "neutral": 0.00501055038,
  "sadness": 1.23698982e-7,
  "surprise": 3.49788536e-8

}, {
  "firstName": "Nanette",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412687.jpeg",
  "lastName": "Barragán",
  "link": "https://www.govtrack.us/congress/members/nanette_barragan/412687",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepBarragan",
  "anger": 1.98150288e-10,
  "contempt": 1.87064852e-8,
  "disgust": 6.87611568e-9,
  "fear": 5.39565823e-11,
  "happiness": 0.9999999,
  "neutral": 6.377786e-8,
  "sadness": 5.68916025e-9,
  "surprise": 1.61337521e-8

}, {
  "firstName": "J.",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412688.jpeg",
  "lastName": "Correa",
  "link": "https://www.govtrack.us/congress/members/luis_correa/412688",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "reploucorrea",
  "anger": 1.09914055e-7,
  "contempt": 0.000009864376,
  "disgust": 0.0000126965861,
  "fear": 1.25416955e-10,
  "happiness": 0.999226034,
  "neutral": 0.0007494473,
  "sadness": 0.00000181845826,
  "surprise": 2.1934353e-8

}, {
  "firstName": "Lisa",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412689.jpeg",
  "lastName": "Blunt Rochester",
  "link": "https://www.govtrack.us/congress/members/lisa_blunt_rochester/412689",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "DE",
  "twitter": "RepBRochester",
  "anger": 1.82030732e-7,
  "contempt": 1.094983e-7,
  "disgust": 0.0000023548273,
  "fear": 5.756148e-9,
  "happiness": 0.999986947,
  "neutral": 0.00000220637412,
  "sadness": 3.20019988e-9,
  "surprise": 0.000008167522

}, {
  "firstName": "Matt",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412690.jpeg",
  "lastName": "Gaetz",
  "link": "https://www.govtrack.us/congress/members/matt_gaetz/412690",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepMattGaetz",
  "anger": 3.696918e-8,
  "contempt": 1.50248489e-8,
  "disgust": 0.0000178725168,
  "fear": 4.16641055e-10,
  "happiness": 0.9999665,
  "neutral": 0.000005740207,
  "sadness": 7.504497e-10,
  "surprise": 0.000009860432

}, {
  "firstName": "Neal",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412691.jpeg",
  "lastName": "Dunn",
  "link": "https://www.govtrack.us/congress/members/neal_dunn/412691",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "drnealdunnfl2",
  "anger": 0.00000267911651,
  "contempt": 0.000003906919,
  "disgust": 0.00002585501,
  "fear": 3.285547e-10,
  "happiness": 0.9998753,
  "neutral": 0.00009207822,
  "sadness": 1.12651705e-7,
  "surprise": 3.903489e-8

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412692.jpeg",
  "lastName": "Rutherford",
  "link": "https://www.govtrack.us/congress/members/john_rutherford/412692",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepRutherfordFL",
  "anger": 0.00000310458245,
  "contempt": 0.000587214949,
  "disgust": 0.000003938966,
  "fear": 1.34904559e-8,
  "happiness": 0.9794368,
  "neutral": 0.019962091,
  "sadness": 0.00000669801739,
  "surprise": 1.39173153e-7

}, {
  "firstName": "Al",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412693.jpeg",
  "lastName": "Lawson",
  "link": "https://www.govtrack.us/congress/members/al_lawson/412693",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepAlLawsonJr",
  "anger": 2.33197861e-9,
  "contempt": 2.192017e-12,
  "disgust": 1.21486876e-10,
  "fear": 3.98173925e-13,
  "happiness": 1,
  "neutral": 1.9062826e-11,
  "sadness": 6.590673e-13,
  "surprise": 5.33424173e-11

}, {
  "firstName": "Stephanie",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412694.jpeg",
  "lastName": "Murphy",
  "link": "https://www.govtrack.us/congress/members/stephanie_murphy/412694",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepStephMurphy",
  "youtube": "RepStephMurphy",
  "anger": 4.44813821e-8,
  "contempt": 4.686142e-8,
  "disgust": 1.81511808e-7,
  "fear": 1.06392159e-10,
  "happiness": 0.999997,
  "neutral": 0.00000182936219,
  "sadness": 1.1346446e-10,
  "surprise": 8.64805543e-7

}, {
  "firstName": "Darren",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412695.jpeg",
  "lastName": "Soto",
  "link": "https://www.govtrack.us/congress/members/darren_soto/412695",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepDarrenSoto",
  "youtube": "repdarrensoto",
  "anger": 8.830416e-7,
  "contempt": 0.00000325878227,
  "disgust": 0.000005419902,
  "fear": 9.591163e-10,
  "happiness": 0.9981651,
  "neutral": 0.0018246941,
  "sadness": 4.64184922e-7,
  "surprise": 1.826644e-7

}, {
  "firstName": "Val",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412696.jpeg",
  "lastName": "Demings",
  "link": "https://www.govtrack.us/congress/members/val_demings/412696",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepValDemings",
  "anger": 2.0167052e-8,
  "contempt": 1.67888e-8,
  "disgust": 8.797469e-9,
  "fear": 1.2686624e-10,
  "happiness": 0.999999762,
  "neutral": 1.8748284e-7,
  "sadness": 5.05082254e-10,
  "surprise": 2.35369644e-8

}, {
  "firstName": "Charlie",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412697.jpeg",
  "lastName": "Crist",
  "link": "https://www.govtrack.us/congress/members/charlie_crist/412697",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "FL",
  "twitter": "repcharliecrist",
  "anger": 0.00000116493493,
  "contempt": 3.425827e-7,
  "disgust": 0.00000555428733,
  "fear": 4.697838e-11,
  "happiness": 0.999985039,
  "neutral": 0.000007764763,
  "sadness": 1.4759316e-9,
  "surprise": 1.40849565e-7

}, {
  "firstName": "Brian",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412698.jpeg",
  "lastName": "Mast",
  "link": "https://www.govtrack.us/congress/members/brian_mast/412698",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "repbrianmast",
  "youtube": "repbrianmast",
  "anger": 1.66013175e-10,
  "contempt": 0.0000130721282,
  "disgust": 1.74752646e-9,
  "fear": 2.53107734e-12,
  "happiness": 0.9997247,
  "neutral": 0.0002621424,
  "sadness": 7.427299e-8,
  "surprise": 1.88587568e-9

}, {
  "firstName": "Francis",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412699.jpeg",
  "lastName": "Rooney",
  "link": "https://www.govtrack.us/congress/members/francis_rooney/412699",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "FL",
  "twitter": "RepRooney",
  "anger": 0.00176566513,
  "contempt": 0.00528558856,
  "disgust": 0.00115608447,
  "fear": 0.000004529736,
  "happiness": 0.359514147,
  "neutral": 0.6294728,
  "sadness": 0.000118924836,
  "surprise": 0.00268226652

}, {
  "firstName": "A.",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412700.jpeg",
  "lastName": "Ferguson",
  "link": "https://www.govtrack.us/congress/members/drew_ferguson/412700",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "twitter": "RepDrewFerguson",
  "anger": 0.0000151570566,
  "contempt": 0.000003788639,
  "disgust": 0.000014583351,
  "fear": 2.75392864e-8,
  "happiness": 0.9998833,
  "neutral": 0.00007257917,
  "sadness": 0.0000104148585,
  "surprise": 1.48398556e-7

}, {
  "firstName": "Raja",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412701.jpeg",
  "lastName": "Krishnamoorthi",
  "link": "https://www.govtrack.us/congress/members/raja_krishnamoorthi/412701",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "IL",
  "twitter": "congressmanraja",
  "anger": 3.40260979e-11,
  "contempt": 1.44294326e-13,
  "disgust": 1.35607975e-11,
  "fear": 7.355516e-12,
  "happiness": 1,
  "neutral": 7.039598e-12,
  "sadness": 6.77629339e-13,
  "surprise": 4.46903536e-9

}, {
  "firstName": "Jim",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412702.jpeg",
  "lastName": "Banks",
  "link": "https://www.govtrack.us/congress/members/jim_banks/412702",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IN",
  "twitter": "RepJimBanks",
  "anger": 0.00000457568876,
  "contempt": 4.55238647e-9,
  "disgust": 5.821953e-7,
  "fear": 5.392728e-8,
  "happiness": 0.9999931,
  "neutral": 2.55852441e-8,
  "sadness": 1.6868805e-8,
  "surprise": 0.00000167358246

}, {
  "firstName": "Trey",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412703.jpeg",
  "lastName": "Hollingsworth",
  "link": "https://www.govtrack.us/congress/members/trey_hollingsworth/412703",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "IN",
  "twitter": "reptrey",
  "anger": 7.634224e-9,
  "contempt": 0.00005911673,
  "disgust": 2.27443451e-7,
  "fear": 3.29297e-10,
  "happiness": 0.9851911,
  "neutral": 0.0147489468,
  "sadness": 3.101333e-7,
  "surprise": 2.87331261e-7

}, {
  "firstName": "Roger",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412704.jpeg",
  "lastName": "Marshall",
  "link": "https://www.govtrack.us/congress/members/roger_marshall/412704",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "KS",
  "twitter": "RepMarshall",
  "anger": 0.000240479567,
  "contempt": 0.000181073614,
  "disgust": 0.0004689066,
  "fear": 0.00000222892845,
  "happiness": 0.99575454,
  "neutral": 0.00333372178,
  "sadness": 0.00000183442489,
  "surprise": 0.0000172433574

}, {
  "firstName": "Clay",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412705.jpeg",
  "lastName": "Higgins",
  "link": "https://www.govtrack.us/congress/members/clay_higgins/412705",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "LA",
  "twitter": "RepClayHiggins",
  "anger": 0.00117399334,
  "contempt": 0.00312658516,
  "disgust": 0.0000297223323,
  "fear": 6.27415147e-7,
  "happiness": 0.0000608240953,
  "neutral": 0.993982136,
  "sadness": 0.00160068471,
  "surprise": 0.0000254049228

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412706.jpeg",
  "lastName": "Johnson",
  "link": "https://www.govtrack.us/congress/members/mike_johnson/412706",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "LA",
  "twitter": "RepMikeJohnson",
  "anger": 0.00000173536421,
  "contempt": 0.00184740475,
  "disgust": 0.00000121039625,
  "fear": 7.582047e-9,
  "happiness": 0.609871864,
  "neutral": 0.388237149,
  "sadness": 0.00000261366563,
  "surprise": 0.0000379960766

}, {
  "firstName": "Anthony",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412707.jpeg",
  "lastName": "Brown",
  "link": "https://www.govtrack.us/congress/members/anthony_brown/412707",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MD",
  "twitter": "RepAnthonyBrown",
  "youtube": "RepAnthonyBrown",
  "anger": 8.229968e-8,
  "contempt": 4.65875416e-7,
  "disgust": 0.00000191329218,
  "fear": 1.31421665e-8,
  "happiness": 0.999988556,
  "neutral": 0.000007922001,
  "sadness": 7.906117e-7,
  "surprise": 2.40646955e-7

}, {
  "firstName": "Jamie",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412708.jpeg",
  "lastName": "Raskin",
  "link": "https://www.govtrack.us/congress/members/jamie_raskin/412708",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "MD",
  "twitter": "repraskin",
  "anger": 6.5186e-9,
  "contempt": 2.61003983e-8,
  "disgust": 5.895968e-8,
  "fear": 2.64086984e-13,
  "happiness": 0.9999999,
  "neutral": 2.85713551e-8,
  "sadness": 2.11067511e-10,
  "surprise": 3.2326683e-10

}, {
  "firstName": "Jack",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412709.jpeg",
  "lastName": "Bergman",
  "link": "https://www.govtrack.us/congress/members/jack_bergman/412709",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepJackBergman",
  "youtube": "RepJackBergman",
  "anger": 1.659558e-12,
  "contempt": 7.062491e-11,
  "disgust": 2.90373038e-11,
  "fear": 2.161537e-17,
  "happiness": 0.99999994,
  "neutral": 6.123031e-8,
  "sadness": 7.25964753e-13,
  "surprise": 7.144838e-12

}, {
  "firstName": "Paul",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412710.jpeg",
  "lastName": "Mitchell",
  "link": "https://www.govtrack.us/congress/members/paul_mitchell/412710",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MI",
  "twitter": "RepPaulMitchell",
  "anger": 0.00004120147,
  "contempt": 0.0000132461682,
  "disgust": 0.000505505945,
  "fear": 1.01380635e-7,
  "happiness": 0.9969926,
  "neutral": 0.00232886034,
  "sadness": 0.00000498507143,
  "surprise": 0.000113511873

}, {
  "firstName": "Jason",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412711.jpeg",
  "lastName": "Lewis",
  "link": "https://www.govtrack.us/congress/members/jason_lewis/412711",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MN",
  "twitter": "RepJasonLewis",
  "anger": 0.000147567276,
  "contempt": 0.00047147373,
  "disgust": 0.00653310772,
  "fear": 2.33777762e-8,
  "happiness": 0.944803655,
  "neutral": 0.0479914732,
  "sadness": 0.00004181886,
  "surprise": 0.00001089941

}, {
  "firstName": "Ted",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412712.jpeg",
  "lastName": "Budd",
  "link": "https://www.govtrack.us/congress/members/ted_budd/412712",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NC",
  "twitter": "RepTedBudd",
  "anger": 2.60421142e-8,
  "contempt": 2.82094015e-9,
  "disgust": 4.99893922e-8,
  "fear": 3.247105e-9,
  "happiness": 0.9999997,
  "neutral": 9.46961549e-8,
  "sadness": 2.00312655e-8,
  "surprise": 7.16013062e-8

}, {
  "firstName": "Don",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412713.jpeg",
  "lastName": "Bacon",
  "link": "https://www.govtrack.us/congress/members/don_bacon/412713",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NE",
  "twitter": "repdonbacon",
  "anger": 4.43233672e-10,
  "contempt": 8.79800439e-7,
  "disgust": 1.27711086e-8,
  "fear": 3.00886377e-12,
  "happiness": 0.999994636,
  "neutral": 0.000004443892,
  "sadness": 1.16100987e-8,
  "surprise": 1.35389255e-9

}, {
  "firstName": "Josh",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412714.jpeg",
  "lastName": "Gottheimer",
  "link": "https://www.govtrack.us/congress/members/josh_gottheimer/412714",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NJ",
  "twitter": "RepJoshG",
  "anger": 4.48221926e-15,
  "contempt": 6.55341175e-15,
  "disgust": 1.04712839e-14,
  "fear": 6.38522759e-18,
  "happiness": 1,
  "neutral": 2.859668e-14,
  "sadness": 1.5144588e-15,
  "surprise": 2.2105051e-14

}, {
  "firstName": "Jacky",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412715.jpeg",
  "lastName": "Rosen",
  "link": "https://www.govtrack.us/congress/members/jacky_rosen/412715",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NV",
  "twitter": "repjackyrosen",
  "anger": 2.19026988e-12,
  "contempt": 2.80275681e-11,
  "disgust": 1.30079029e-11,
  "fear": 1.07341292e-14,
  "happiness": 1,
  "neutral": 2.4965266e-10,
  "sadness": 3.99184859e-15,
  "surprise": 9.31231037e-10

}, {
  "firstName": "Ruben",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412716.jpeg",
  "lastName": "Kihuen",
  "link": "https://www.govtrack.us/congress/members/ruben_kihuen/412716",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NV",
  "twitter": "RepKihuen",
  "anger": 8.14132e-7,
  "contempt": 1.36200373e-9,
  "disgust": 2.39491929e-8,
  "fear": 1.6961156e-8,
  "happiness": 0.999997735,
  "neutral": 1.31539988e-8,
  "sadness": 1.59367453e-9,
  "surprise": 0.00000139783037

}, {
  "firstName": "Thomas",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412717.jpeg",
  "lastName": "Suozzi",
  "link": "https://www.govtrack.us/congress/members/thomas_suozzi/412717",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepTomSuozzi",
  "anger": 2.01782716e-10,
  "contempt": 2.23651514e-10,
  "disgust": 6.094784e-9,
  "fear": 8.658708e-15,
  "happiness": 1,
  "neutral": 3.238669e-9,
  "sadness": 2.26955e-12,
  "surprise": 9.4891664e-11

}, {
  "firstName": "Adriano",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412718.jpeg",
  "lastName": "Espaillat",
  "link": "https://www.govtrack.us/congress/members/adriano_espaillat/412718",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepEspaillat",
  "anger": 3.17216337e-10,
  "contempt": 6.356409e-9,
  "disgust": 5.695914e-9,
  "fear": 6.445885e-14,
  "happiness": 0.99999994,
  "neutral": 2.82210468e-8,
  "sadness": 4.27164221e-10,
  "surprise": 6.56293145e-11

}, {
  "firstName": "John",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412719.jpeg",
  "lastName": "Faso",
  "link": "https://www.govtrack.us/congress/members/john_faso/412719",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepJohnFaso",
  "anger": 8.307417e-8,
  "contempt": 1.62128426e-8,
  "disgust": 1.73933842e-7,
  "fear": 2.00906947e-11,
  "happiness": 0.999999642,
  "neutral": 4.77462656e-8,
  "sadness": 5.63539437e-10,
  "surprise": 1.83220052e-8

}, {
  "firstName": "Claudia",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412720.jpeg",
  "lastName": "Tenney",
  "link": "https://www.govtrack.us/congress/members/claudia_tenney/412720",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "NY",
  "twitter": "RepTenney",
  "anger": 1.69690722e-7,
  "contempt": 1.42429712e-7,
  "disgust": 3.56460077e-7,
  "fear": 6.483793e-10,
  "happiness": 0.9999985,
  "neutral": 6.956636e-7,
  "sadness": 3.39061e-9,
  "surprise": 1.4401904e-7

}, {
  "firstName": "Brian",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412721.jpeg",
  "lastName": "Fitzpatrick",
  "link": "https://www.govtrack.us/congress/members/brian_fitzpatrick/412721",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "repbrianfitz",
  "anger": 2.195045e-8,
  "contempt": 1.07482776e-7,
  "disgust": 2.0604892e-8,
  "fear": 2.63024358e-8,
  "happiness": 0.999997556,
  "neutral": 5.10164966e-7,
  "sadness": 0.00000165393431,
  "surprise": 1.22915523e-7

}, {
  "firstName": "Lloyd",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412722.jpeg",
  "lastName": "Smucker",
  "link": "https://www.govtrack.us/congress/members/lloyd_smucker/412722",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PA",
  "twitter": "RepSmucker",
  "anger": 1.13361544e-7,
  "contempt": 5.00607378e-9,
  "disgust": 3.578896e-8,
  "fear": 7.658043e-12,
  "happiness": 0.999999762,
  "neutral": 7.485627e-8,
  "sadness": 2.01205519e-9,
  "surprise": 4.2866124e-9

}, {
  "firstName": "Jenniffer",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412723.jpeg",
  "lastName": "González-Colón",
  "link": "https://www.govtrack.us/congress/members/jenniffer_gonzalez_colon/412723",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "PR",
  "twitter": "repjenniffer",
  "anger": 0.0000373745133,
  "contempt": 0.00007726879,
  "disgust": 0.00005870412,
  "fear": 3.96095423e-8,
  "happiness": 0.996661365,
  "neutral": 0.00310700457,
  "sadness": 0.0000577504725,
  "surprise": 4.74335735e-7

}, {
  "firstName": "David",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412724.jpeg",
  "lastName": "Kustoff",
  "link": "https://www.govtrack.us/congress/members/david_kustoff/412724",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TN",
  "twitter": "repdavidkustoff",
  "anger": 0.000211226987,
  "contempt": 0.0000178231185,
  "disgust": 0.000516726752,
  "fear": 0.0001511787,
  "happiness": 0.9983293,
  "neutral": 0.0006012433,
  "sadness": 0.0000427287,
  "surprise": 0.000129808177

}, {
  "firstName": "Vicente",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412725.jpeg",
  "lastName": "Gonzalez",
  "link": "https://www.govtrack.us/congress/members/vicente_gonzalez/412725",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepGonzalez",
  "anger": 0.00168320176,
  "contempt": 0.0368156433,
  "disgust": 0.00485178549,
  "fear": 0.0000581579661,
  "happiness": 0.444102,
  "neutral": 0.5092589,
  "sadness": 0.0017389392,
  "surprise": 0.00149136491

}, {
  "firstName": "Jodey",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412726.jpeg",
  "lastName": "Arrington",
  "link": "https://www.govtrack.us/congress/members/jodey_arrington/412726",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "TX",
  "twitter": "RepArrington",
  "anger": 9.214062e-13,
  "contempt": 2.030537e-10,
  "disgust": 1.65873065e-10,
  "fear": 4.35391479e-18,
  "happiness": 1,
  "neutral": 1.55471991e-8,
  "sadness": 1.12872758e-13,
  "surprise": 2.940347e-11

}, {
  "firstName": "Scott",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412727.jpeg",
  "lastName": "Taylor",
  "link": "https://www.govtrack.us/congress/members/scott_taylor/412727",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "VA",
  "twitter": "RepScottTaylor",
  "anger": 9.636467e-11,
  "contempt": 7.15026432e-12,
  "disgust": 4.8914664e-11,
  "fear": 4.34421642e-15,
  "happiness": 1,
  "neutral": 1.83233914e-10,
  "sadness": 6.49646234e-15,
  "surprise": 7.5596536e-11

}, {
  "firstName": "A.",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412728.jpeg",
  "lastName": "McEachin",
  "link": "https://www.govtrack.us/congress/members/donald_mceachin/412728",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "VA",
  "twitter": "RepMcEachin",
  "anger": 0.000006768665,
  "contempt": 0.000008377977,
  "disgust": 0.0000746248261,
  "fear": 2.04903108e-10,
  "happiness": 0.9987354,
  "neutral": 0.0011740207,
  "sadness": 3.30847172e-8,
  "surprise": 7.397203e-7

}, {
  "firstName": "Thomas",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412729.jpeg",
  "lastName": "Garrett",
  "link": "https://www.govtrack.us/congress/members/thomas_garrett/412729",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "VA",
  "twitter": "RepTomGarrett",
  "anger": 9.796633e-9,
  "contempt": 1.79481745e-8,
  "disgust": 3.498246e-8,
  "fear": 7.547633e-12,
  "happiness": 0.9999998,
  "neutral": 9.612616e-8,
  "sadness": 4.90275376e-9,
  "surprise": 1.2726572e-9

}, {
  "firstName": "Pramila",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412730.jpeg",
  "lastName": "Jayapal",
  "link": "https://www.govtrack.us/congress/members/pramila_jayapal/412730",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "WA",
  "twitter": "RepJayapal",
  "anger": 0.00003221054,
  "contempt": 7.59466559e-7,
  "disgust": 0.000148385967,
  "fear": 0.00000624503627,
  "happiness": 0.9997531,
  "neutral": 0.00000193529377,
  "sadness": 0.0000360485064,
  "surprise": 0.000021322785

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412731.jpeg",
  "lastName": "Gallagher",
  "link": "https://www.govtrack.us/congress/members/mike_gallagher/412731",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WI",
  "twitter": "RepGallagher",
  "anger": 1.897369e-8,
  "contempt": 3.35393913e-9,
  "disgust": 5.945495e-9,
  "fear": 4.54018628e-11,
  "happiness": 0.9999999,
  "neutral": 7.74505e-8,
  "sadness": 5.714276e-11,
  "surprise": 4.86409935e-9

}, {
  "firstName": "Liz",
  "gender": "female",
  "image": "https://www.govtrack.us/data/photos/412732.jpeg",
  "lastName": "Cheney",
  "link": "https://www.govtrack.us/congress/members/liz_cheney/412732",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "WY",
  "twitter": "RepLizCheney",
  "anger": 4.22183035e-7,
  "contempt": 0.0005621999,
  "disgust": 9.15549947e-7,
  "fear": 1.5760383e-9,
  "happiness": 0.833703,
  "neutral": 0.165729463,
  "sadness": 0.00000325329461,
  "surprise": 7.913381e-7

}, {
  "firstName": "Mike",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/400315.jpeg",
  "lastName": "Pence",
  "link": "https://www.govtrack.us/congress/members/mike_pence/400315",
  "nickname": "",
  "party": "Republican",
  "role": "Vice President",
  "state": "",
  "anger": 0.00000148330969,
  "contempt": 0.0000381634527,
  "disgust": 0.0000114604081,
  "fear": 0.0000010783582,
  "happiness": 0.981981,
  "neutral": 0.01771731,
  "sadness": 0.000033286502,
  "surprise": 0.00021621192


}, {
  "firstName": "Donald",
  "gender": "male",
  "image": "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/PE%20Color.jpg",
  "lastName": "Trump",
  "link": "https://www.govtrack.us/congress/members/donald_trump/412733",
  "nickname": "",
  "party": "Republican",
  "role": "President",
  "state": "",
  "anger": 0.548668563,
  "contempt": 0.008053738,
  "disgust": 0.0047251475,
  "fear": 3.907697E-06,
  "happiness": 1.1274858E-06,
  "neutral": 0.433020443,
  "sadness": 0.00549628,
  "surprise": 3.078312E-05

}, {
  "firstName": "Luther",
  "gender": "male",
  "image": "https://www.govtrack.us/data/photos/412734.jpeg",
  "lastName": "Strange",
  "link": "https://www.govtrack.us/congress/members/luther_strange/412734",
  "nickname": "",
  "party": "Republican",
  "role": "Senator",
  "state": "AL",
  "twitter": "SenatorStrange",
  "anger": 2.85004242e-10,
  "contempt": 1.08108743e-7,
  "disgust": 1.5718804e-8,
  "fear": 6.23517343e-15,
  "happiness": 0.999998569,
  "neutral": 0.00000128189561,
  "sadness": 1.207797e-10,
  "surprise": 3.25914962e-10

}, {
  "firstName": "Ron",
  "gender": "male",
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ron_Estes%2C_115th_official_photo.jpg/800px-Ron_Estes%2C_115th_official_photo.jpg",
  "lastName": "Estes",
  "link": "https://www.govtrack.us/congress/members/ron_estes/412735",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "KS",
  "twitter": "RepRonEstes",
  "anger": 3.91270927E-09,
  "contempt": 1.35809378E-10,
  "disgust": 5.924826E-08,
  "fear": 3.99547718E-13,
  "happiness": 0.999999642,
  "neutral": 1.00769642E-08,
  "sadness": 2.704484E-07,
  "surprise": 3.15755269E-11
}, {
  "firstName": "Greg",
  "gender": "male",
  "image": "https://upload.wikimedia.org/wikipedia/commons/6/61/Greg_Gianforte_115th_congress.jpg",
  "lastName": "Gianforte",
  "link": "https://www.govtrack.us/congress/members/greg_gianforte/412736",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "MT",
  "anger": 1.06217874E-06,
  "contempt": 6.537488E-05,
  "disgust": 7.891339E-06,
  "fear": 2.20252216E-09,
  "happiness": 0.995140135,
  "neutral": 0.0047760047,
  "sadness": 9.352234E-06,
  "surprise": 1.61106314E-07
}, {
  "firstName": "Karen",
  "gender": "female",
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/United_States_Representative_Karen_C._Handel.jpg/800px-United_States_Representative_Karen_C._Handel.jpg",
  "lastName": "Handel",
  "link": "https://www.govtrack.us/congress/members/karen_handel/412737",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "GA",
  "anger": 3.6397767E-05,
  "contempt": 8.11586942E-05,
  "disgust": 0.0002832841,
  "fear": 4.05357135E-08,
  "happiness": 0.9888941,
  "neutral": 0.0106260022,
  "sadness": 7.674137E-05,
  "surprise": 2.28521071E-06
}, {
  "firstName": "Ralph",
  "gender": "male",
  "image": "https://norman.house.gov/sites/norman.house.gov/files/styles/congress_featured_image/public/featured_image/Congress-Ralph-Norman.jpg?itok=G6Js3RSd",
  "lastName": "Norman",
  "link": "https://www.govtrack.us/congress/members/ralph_norman/412738",
  "nickname": "",
  "party": "Republican",
  "role": "Representative",
  "state": "SC",
  "twitter": "RepRalphNorman",
  "anger": 1.27822375E-07,
  "contempt": 4.03636159E-06,
  "disgust": 2.81822025E-07,
  "fear": 1.1565973E-11,
  "happiness": 0.9999077,
  "neutral": 8.788728E-05,
  "sadness": 3.22862559E-09,
  "surprise": 1.51815911E-08

}, {
  "firstName": "Jimmy",
  "gender": "male",
  "image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Jimmy_Gomez_official_portrait.jpg",
  "lastName": "Gomez",
  "link": "https://www.govtrack.us/congress/members/jimmy_gomez/412739",
  "nickname": "",
  "party": "Democrat",
  "role": "Representative",
  "state": "CA",
  "twitter": "RepJimmyGomez",
  "anger": 1.57580227E-09,
  "contempt": 5.55961353E-11,
  "disgust": 3.4742933E-09,
  "fear": 1.98555668E-12,
  "happiness": 1.0,
  "neutral": 6.108677E-10,
  "sadness": 1.41521989E-10,
  "surprise": 2.87176422E-10
}]


//------------------------------------------------------------------
//Functions for maximum data points
//------------------------------------------------------------------


function aveAnger() {
  for (let i = 0; i < congressman.length; i++) {
    let result = ((math.sum(congressman[i].anger)) / congressman.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function aveContempt() {
  for (let i = 0; i < congressman.length; i++) {
    let result = ((math.sum(congressman[i].contempt)) / congressman.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function aveDisgust() {
  for (let i = 0; i < congressman.length; i++) {
    let result = ((math.sum(congressman[i].disgust)) / congressman.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function aveFear() {
  for (let i = 0; i < congressman.length; i++) {
    let result = (math.sum(congressman[i].fear)) / congressman.length;
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function aveHappiness() {
  for (let i = 0; i < congressman.length; i++) {
    let result = (math.sum(congressman[i].happiness)) / congressman.length;
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}
``

function aveNeutral() {
  for (let i = 0; i < congressman.length; i++) {
    let result = (math.sum(congressman[i].neutral)) / congressman.length;
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function aveSadness() {
  for (let i = 0; i < congressman.length; i++) {
    let result = (math.sum(congressman[i].sadness)) / congressman.length;
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function aveSurprise() {
  for (let i = 0; i < congressman.length; i++) {
    let result = (math.sum(congressman[i].surprise)) / congressman.length;
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}


//BY GENDER

function femaleAveAnger() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "female") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function femaleAveContempt() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "female") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].contempt)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function femaleAveDisgust() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "female") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].disgust)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function femaleAveFear() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "female") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].fear)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function femaleAveHappiness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "female") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].happiness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function femaleAveNeutral() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "female") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].neutral)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function femaleAveSadness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "female") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].sadness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function femaleAveSurprise() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "female") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].surprise)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function maleAveAnger() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender === "male") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function maleAveContempt() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "male") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].contempt)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function maleAveDisgust() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "male") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].disgust)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function maleAveFear() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "male") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].fear)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function maleAveHappiness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "male") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].happiness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function maleAveNeutral() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "male") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].neutral)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function maleAveSadness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "male") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].sadness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function maleAveSurprise() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].gender == "male") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].surprise)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}


// BY POLITICAL PARTY

function democratAnger() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Democrat") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function democratContempt() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Democrat") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].contempt)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function democratDisgust() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Democrat") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].disgust)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function democratFear() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Democrat") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].fear)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function democratHappiness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Democrat") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].happiness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function democratNeutral() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Democrat") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].neutral)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function democratSadness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Democrat") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].sadness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function democratSurprise() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Democrat") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].surprise)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function republicanAnger() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Republican") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function republicanContempt() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Republican") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].contempt)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function republicanDisgust() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Republican") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].disgust)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function republicanFear() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Republican") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].fear)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function republicanHappiness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Republican") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].happiness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function republicanNeutral() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Republican") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].neutral)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function republicanSadness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Republican") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].sadness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function republicanSurprise() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Republican") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].surprise)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function independentAnger() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Independent") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function independentContempt() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Independent") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].contempt)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function independentDisgust() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Independent") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].disgust)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function independentFear() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Independent") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].fear)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function independentHappiness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Independent") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].happiness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function independentNeutral() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Independent") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].neutral)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function independentSadness() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Independent") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].sadness)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function independentSurprise() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].party == "Independent") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].surprise)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}






//STATES, FOR HEATMAP

function AL() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "AL") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function AK() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "AK") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function AZ() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "AZ") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function AR() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "AR") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function CA() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "CA") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function CO() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "CO") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function CT() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "CT") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function DE() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "DE") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function FL() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "FL") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function GA() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "GA") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function HI() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "HI") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function ID() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "ID") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function IL() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "IL") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function IN() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "IN") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function IA() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "IA") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function KS() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "KS") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function KY() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "KY") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function LA() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "LA") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function ME() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "ME") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function MD() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "MD") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function MA() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "MA") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function MI() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "MI") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function MN() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "MN") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function MS() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "MS") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function MO() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "MO") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function MT() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "MT") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function NE() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "NE") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function NV() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "NV") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function NH() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "NH") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function NJ() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "NJ") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function NM() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "NM") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function NY() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "NY") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function NC() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "NC") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function ND() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "ND") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function OH() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "OH") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function OK() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "OK") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function OR() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "OR") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function PA() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "PA") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function RI() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "RI") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function SC() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "SC") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function SD() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "SD") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function TN() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "TN") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function TX() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "TX") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function UT() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "UT") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function VT() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "VT") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function VA() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "VA") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function WA() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "WA") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function WV() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "WV") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function WI() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "WI") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

function WY() {
  var arr = [];
  for (let i = 0; i < congressman.length; i++) {
    if (congressman[i].state == "WY") {
      arr.push(congressman[i])
    }
  }
  for (let j = 0; j < arr.length; j++) {
    let result = ((math.sum(arr[j].anger)) / arr.length);
    let num = parseFloat(result).toFixed(20);
    return (num);
  }
}

//------------------------------------------------------------------
//OVERALL RANKINGS FOR EACH EMOTION IN ORDER - SORT ALGORITHM
//------------------------------------------------------------------
var angerHighest = [];
var contemptHighest = [];
var disgustHighest = [];
var fearHighest = [];
var happinessHighest = [];
var neutralHighest = [];
var sadnessHighest = [];
var surpriseHighest = [];
Array.prototype.sortBy = function(emotionA) {
  return this.slice(0).sort(function(a, b) {
    return (a[emotionA] > b[emotionA]) ? 1 : (a[emotionA] < b[emotionA]) ? -1 : 0;
  });
}
// Push to Arrays
angerHighest.push(congressman.sortBy('anger').reverse());
contemptHighest.push(congressman.sortBy('contempt').reverse());
disgustHighest.push(congressman.sortBy('disgust').reverse());
fearHighest.push(congressman.sortBy('fear').reverse());
happinessHighest.push(congressman.sortBy('happiness').reverse());
neutralHighest.push(congressman.sortBy('neutral').reverse());
sadnessHighest.push(congressman.sortBy('sadness').reverse());
surpriseHighest.push(congressman.sortBy('surprise').reverse());
console.log(angerHighest[0][10]);
console.log(angerHighest);
console.log(congressman.sortBy('anger').reverse()[10])
