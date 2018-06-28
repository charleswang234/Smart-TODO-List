
function createList() {
  $( "#activity-container .eat").append($("<p>").text("hello there"));
}

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

$(document).ready(function() {
   createList();
});
