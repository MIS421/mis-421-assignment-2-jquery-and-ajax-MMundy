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
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "52016bcb31284612aee824446dc9bd4b");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}

$("#Search").click(function() {
    apiSearch();

}); 

$("#searchEngineName").click(function() {
    /*Change the background image*/
    function() {
        if ($("body").css("background-color") == "lightgreen") { //Background image is the default image (green)
            $("this").css("background-image", "url(https://unsplash.com/photos/pJadQetzTkI)"); //Sets background to blue gradient image
            $("this").css("background-color", "lightgrey") //Couldn't figure out how to access the image url for comparison, so I just set a background color with each image to use for comparison
        }
        else if ($("body").css("background-color") == "lightgrey") { //Background image is the blue gradient
            $("this").css("background-image", "url(https://unsplash.com/photos/tgrBcf7S_dY)"); //Sets the background image to orange gradient
            //$("this").css("background-color", "lightskyblue")
        }
        else { //Background is blue gradient
            $("body").css("background-image", "url(https://unsplash.com/photos/UWdTDa1Z9DM)")
            $("this").css("background-color", "lightgreen")
        }
    }
});

/*$("#currentTime").click(function() {
    var date = new Date();
    time = date.getHours() + ":" + date.getMinutes();
    $("#time").innerHTML = time;
    $("#time").dialog("open");
})*/

$(function() { //Gets the current time and loads it into the 'time' div, which is displayed as a jQuery dialog window
    $("#time").dialog({
        autoOpen: false,
    });
    $("#currentTime").click(function () {
        var date = new Date();
        time = date.getHours() + ":" + date.getMinutes();
        $("#time").html = time;
        $("#time").dialog("open");
    });
});