// /public/js/app.js

$(document).ready(function() {

  // Create a list of players from our database
  $.get("/api/alldata", function(data) {
    for(var i = 0; i < data.length; i++) {
      var playerBtn = "";
      playerBtn += '<button class="btn btn-default">';
      playerBtn += data[i].name;
      playerBtn += '</button>';
      $("div#playerlist").append(playerBtn);
    }
  })

});
