var len;
var results = '';
var time;

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "6c02ef8bc93044148fee838af4b553bb");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
        $('#searchResults').dialog({
            width: 500,
            });
    })
    .fail(function () {
      alert("error");
    });
}

$("#Search").click(function() {
    apiSearch();

}); 

var backgroundImage = 0;
$("#AskAthenaHeader").click(function() {
    /*Change the background image*/
        if (backgroundImage == 0) { //Background image is the default image (green)
            backgroundImage++;
            $("body").css("background-image", "url(https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=829&q=80)"); //Sets background to blue gradient image 
            $("body").css("background-color", "lightgrey") //Couldn't figure out how to access the image url for comparison, so I just set a background color with each image to use for comparison
        }
        else if (backgroundImage == 1) { //Background image is the blue gradient
            backgroundImage++;
            $("body").css("background-image", "url(https://images.unsplash.com/photo-1557682260-96773eb01377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=829&q=80)"); //Sets the background image to orange gradient
            $("body").css("background-color", "lightskyblue")
        }
        else { //Background is blue gradient
            backgroundImage = 0;
            $("body").css("background-image", "url(https://images.unsplash.com/photo-1617957772097-93dc166cd335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80)") //Sets background to the original (green gradient) image
            $("body").css("background-color", "lightgreen")
        }
});

$(function displayTime() { //Gets the current time and loads it into the 'time' div, which is displayed as a jQuery dialog window
    $("#time").dialog({
        autoOpen: false,

    });
    $("#currentTime").click(function () {
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); // time minutes < 10, minutes var = first digit of '0' + second digit of time minutes, else = time minutes value;
        var amPM = date.getHours() >= 12 ? "PM" : "AM";
        time = hours + ":" + minutes + " " + amPM;

        $("#time").html(time);
        $("#time").dialog("open");
    });
});

$('#feelingLuckyButton').click(function () {
    feelingLuckySearch();
})

function feelingLuckySearch() { //Modified version of the api search function
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "6c02ef8bc93044148fee838af4b553bb");
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;
            window.location.href = data.webPages.value[0].url; //simulates a mouse click and opens the set url. User maintains ability to click the back arrow to go back to the search engine page
        })
        .fail(function () {
            alert("error");
        });
}