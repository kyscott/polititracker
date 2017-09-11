let id = 0;
let id2 = 50;

$(document).ready(function() {
   democracy.getReps();
   democracy.getPollingInfo();
   democracy.getNumberOfUpcomingElections();
   // democracy.getCandidates();
});

let democracy = {

   getReps: function() {
      $.ajax({
         type: 'GET',
         url: "/api/reps",
         dataType: "json",
         contentType: "application/json;charset=utf-8"

      }).done(function(data) {

         for (let i = 2; i < 6; i++) {
            let repPhoto = data.officials[i].photoUrl;
            let repParty = data.officials[i].party;
            let repName = data.officials[i].name;
            let repWebsite = data.officials[i].urls[0];
            let socialMedia = data.officials[i].channels;

            $(".card-deck").append("<div class='profile-rep-card card' id='" + id + "'></id");

            // If rep photo does not exist then use a placeholder image
            if (!repPhoto) {
               $('#' + id).append("<div class='img-frame'><img class='card-img-top' alt='Card image cap' src='img/person-icon.png' height='250'></div>");

            } else {
               $('#' + id).append("<div class='img-frame'><img class='card-img-top' alt='Card image cap' src='" + repPhoto + "' height='250'></div>");
            }

            // If rep party is democratic, change the string to democrat
            if (repParty === "Democratic") {
               $('#' + id).append("<div class='card-block text-center'><h4 class='card-title' style='margin-top: 10px;'>" + repName + "</h4><p>" + repParty.substring(0, 8) + "</p>");

            } else {
               $('#' + id).append("<div class='card-block text-center'><h4 class='card-title' style='margin-top: 10px;'>" + repName + "</h4><p>" + repParty + "</p>");
            }

            $('#' + id).append("<div class='card-footer text-center' id='" + id2 + "'>" + "<a href='" + repWebsite + "' target='_blank'><i class='profile-reps-social profile-reps-web fa fa-address-book fa-2x' aria-hidden='true'></i></a>");

            // If rep social media channels exist, list them
            if (!socialMedia) {
               $('#' + id2).append("Social Media N/A");

            } else {
               for (let j = 0; j < data.officials[i].channels.length; j++) {
                  let socialChannel = data.officials[i].channels[j].id;

                  // Switch statement to correspond the correct icon with the corect channel type
                  switch (data.officials[i].channels[j].type) {

                     case "Facebook":
                        $('#' + id2).append("<a href='http://www.facebook.com/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-fb fa fa-facebook-square fa-2x' aria-hidden='true'></i></a>");
                        break;

                     case "Twitter":
                        $('#' + id2).append("<a href='http://www.twitter.com/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-tw fa fa-twitter-square fa-2x' aria-hidden='true'></i></a>");
                        break;

                     case "YouTube":
                        $('#' + id2).append("<a href='http://www.youtube.com/user/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-yt fa fa-youtube-play fa-2x' aria-hidden='true'></i></a>");
                        break;
                  }
               }
            }
            id2++
            id++
         }
      })
   },


   getNumberOfUpcomingElections: function() {
      $.ajax({
         type: 'GET',
         url: "/api/elections",
         dataType: "json",
         contentType: "application/json;charset=utf-8"
      }).done(function(data) {

         $(".profile-upcoming-elects").append("<span style='color: red;'>" + " " + data.polititracker_elections.length + "</span>");
      })
   },


   getPollingInfo: function() {
      $.ajax({
         type: 'GET',
         url: "/api/elections",
         dataType: "json",
         contentType: "application/json;charset=utf-8"
      }).done(function(data) {

         if (data.polititracker_elections.length === 0) {
            $(".main").html("NO UPCOMING ELECTIONS");

         } else {
            for (var i = 0; i < data.polititracker_elections.length; i++) {
               let pollingLocation = data.polititracker_elections[i].pollingLocations;

               let pollingHours = data.polititracker_elections[i].pollingLocations[0].pollingHours;

               let locationName = data.polititracker_elections[i].pollingLocations[0].address.locationName;

               let street = data.polititracker_elections[i].pollingLocations[0].address.line1;

               let city = data.polititracker_elections[i].pollingLocations[0].address.city;

               let state = data.polititracker_elections[i].pollingLocations[0].address.state;

               let zip = data.polititracker_elections[i].pollingLocations[0].address.zip;

               if (pollingLocation) {
                  $("#polling-location").append(locationName);

                  $("#polling-address").append(street + "<br>" + city + ", " + state + " " + zip);

                  $("#polling-hours").append(pollingHours);

                  $("#polling-times").append("Polling Hours:");

               } else {
                  $("#polling-location").append("Location Unavailable");

               }
            }
         }
      })
   }
}
