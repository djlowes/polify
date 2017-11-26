import congressman from './congressman.js';
import search from './search.js';

//--------------------------------------
//Search.js will work when this is fixed
//NEED TO USE WEBPACK HERE!
//NEED TO USE WEBPACK HERE!
//require() does not exist in the browser/client-side JavaScript
//--------------------------------------

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
}``

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






//OVERALL RANKINGS FOR EACH EMOTION IN ORDER - SORT ALGORITHM
// Each array will be used to rank congressman on attributes from highest (most) to lowest.
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
console.log(congressman.sortBy('anger').reverse()[10])

// function angerSort(a, b) {
//   if (a.anger < b.anger)
//     return -1;
//   if (a.anger > b.anger)
//     return 1;
//   return 0;
// }

// console.log(congressman.sortBy(angerSort).reverse());
// console.log(congressman.sortBy(angerSort));





// INSERT CHARTS BELOW
// 1. Bar chart - Males vs Females
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Surprise", "Sadness", "Fear", "Anger", "Disgust", "Contempt", "Happiness"],
    datasets: [{
      label: 'Males',
      backgroundColor: 'rgba(54, 162, 235, 1)',
      data: [maleAveSurprise(), maleAveSadness(), maleAveFear(), maleAveAnger(), maleAveDisgust(), maleAveContempt(), maleAveHappiness()],
    }, {
      label: 'Females',
      backgroundColor: 'rgba(255,99,132,1)',
      data: [femaleAveSurprise(), femaleAveSadness(), femaleAveFear(), femaleAveAnger(), femaleAveDisgust(), femaleAveContempt(), femaleAveHappiness()],
    }]
  }
});
var labels = {
  "Males": true,
  "Females": true
};




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
var labels = {
  "Republicans": true,
  "Democrats": true,
  "Independents": true
};




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




//4. Heatmap of Angriest State
// var map = AmCharts.makeChart( "myChartFour", {
//   "type": "map",
//   "theme": "none",
//   "colorSteps": 10,
//
//   "dataProvider": {
//     "map": "usaLow",
//     "areas": [ {
//       "id": "US-AL",
//       "value": AL()
//     }, {
//       "id": "US-AK",
//       "value": AK()
//     }, {
//       "id": "US-AZ",
//       "value": AZ()
//     }, {
//       "id": "US-AR",
//       "value": AR()
//     }, {
//       "id": "US-CA",
//       "value": CA()
//     }, {
//       "id": "US-CO",
//       "value": CO()
//     }, {
//       "id": "US-CT",
//       "value": CT()
//     }, {
//       "id": "US-DE",
//       "value": DE()
//     }, {
//       "id": "US-FL",
//       "value": FL()
//     }, {
//       "id": "US-GA",
//       "value": GA()
//     }, {
//       "id": "US-HI",
//       "value": HI()
//     }, {
//       "id": "US-ID",
//       "value": ID()
//     }, {
//       "id": "US-IL",
//       "value": IL()
//     }, {
//       "id": "US-IN",
//       "value": IN()
//     }, {
//       "id": "US-IA",
//       "value": IA()
//     }, {
//       "id": "US-KS",
//       "value": KS()
//     }, {
//       "id": "US-KY",
//       "value": KY()
//     }, {
//       "id": "US-LA",
//       "value": LA()
//     }, {
//       "id": "US-ME",
//       "value": ME()
//     }, {
//       "id": "US-MD",
//       "value": MD()
//     }, {
//       "id": "US-MA",
//       "value": MA()
//     }, {
//       "id": "US-MI",
//       "value": MI()
//     }, {
//       "id": "US-MN",
//       "value": MN()
//     }, {
//       "id": "US-MS",
//       "value": MS()
//     }, {
//       "id": "US-MO",
//       "value": MO()
//     }, {
//       "id": "US-MT",
//       "value": MT()
//     }, {
//       "id": "US-NE",
//       "value": NE()
//     }, {
//       "id": "US-NV",
//       "value": NV()
//     }, {
//       "id": "US-NH",
//       "value": NH()
//     }, {
//       "id": "US-NJ",
//       "value": NJ()
//     }, {
//       "id": "US-NM",
//       "value": NM()
//     }, {
//       "id": "US-NY",
//       "value": NY()
//     }, {
//       "id": "US-NC",
//       "value": NC()
//     }, {
//       "id": "US-ND",
//       "value": ND()
//     }, {
//       "id": "US-OH",
//       "value": OH()
//     }, {
//       "id": "US-OK",
//       "value": OK()
//     }, {
//       "id": "US-OR",
//       "value": OR()
//     }, {
//       "id": "US-PA",
//       "value": PA()
//     }, {
//       "id": "US-RI",
//       "value": RI()
//     }, {
//       "id": "US-SC",
//       "value": SC()
//     }, {
//       "id": "US-SD",
//       "value": SD()
//     }, {
//       "id": "US-TN",
//       "value": TN()
//     }, {
//       "id": "US-TX",
//       "value": TX()
//     }, {
//       "id": "US-UT",
//       "value": UT()
//     }, {
//       "id": "US-VT",
//       "value": VT()
//     }, {
//       "id": "US-VA",
//       "value": VA()
//     }, {
//       "id": "US-WA",
//       "value": WA()
//     }, {
//       "id": "US-WV",
//       "value": WV()
//     }, {
//       "id": "US-WI",
//       "value": WI()
//     }, {
//       "id": "US-WY",
//       "value": WY()
//     } ]
//   },
//
//   "areasSettings": {
//     "autoZoom": true
//   },
//
//   "valueLegend": {
//     "right": 10,
//     "minValue": 0,
//     "maxValue": 1
//   },
//
//   "export": {
//     "enabled": true
//   }
//
// } );


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
