$(function() {
       var params = {
           // Request parameters
       };

       $.ajax({
           // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
           //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the
           //   URL below with "westcentralus".
           url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
           beforeSend: function(xhrObj){
               // Request headers
               xhrObj.setRequestHeader("Content-Type","application/json");

               // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
               xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","204fe6eb9a20402b9b0c6f997910b2ac");
           },
           type: "POST",
           // Request body
           data: '{"url": "https://www.govtrack.us/data/photos/400013.jpeg"}',
       })
       .done(function(data) {
           alert("success");
           console.log(data)
       })
       .fail(function() {
           alert("error");
       });
   });
