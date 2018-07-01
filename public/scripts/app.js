
// function createList() {
//   $( "#activity-container .eat").append($("<p>").text("hello there"));
// }

/* Appends a buy activity to index file.
*/
function createBuy (input) {
  var $contentBuy = $('<p>').addClass('contentBuy').text(input.activity);
  $('<span>')
  .appendTo($contentBuy);

  $('<i>').addClass('fas fa-clipboard-check')
  .appendTo($contentBuy);

  $('<i>').addClass('fas fa-trash-alt')
  .appendTo($contentBuy);

  return $contentBuy;
}

/* Appends a watch activity to index file.
*/
function createWatch (input) {
  var $contentWatch = $('<p>').addClass('contentWatch').text(input.activity);
  $('<span>')
  .appendTo($contentWatch);

  $('<i>').addClass('fas fa-clipboard-check')
  .appendTo($contentWatch);

  $('<i>').addClass('fas fa-trash-alt')
  .appendTo($contentWatch);

  return $contentWatch;
}

/* Appends a read activity to index file.
*/
function createRead (input) {
  var $contentRead = $('<p>').addClass('contentRead').text(input.activity);
  $('<span>')
  .appendTo($contentRead);

  $('<i>').addClass('fas fa-clipboard-check')
  .appendTo($contentRead);

  $('<i>').addClass('fas fa-trash-alt')
  .appendTo($contentRead);

  return $contentRead;
}

/* Appends a eat activity to index file.
*/
function createEat (input) {
  var $contentEat = $('<p>').addClass('contentEat').text(input.activity);
  $('<span>')
  .appendTo($contentEat);

  $('<i>').addClass('fas fa-clipboard-check')
  .appendTo($contentEat);

  $('<i>').addClass('fas fa-trash-alt')
  .appendTo($contentEat);

  return $contentEat;
}

/* Load all activities to the columns
*/
function loadActivities () {
  $.ajax({
    url: "/activity",
    type: 'GET',
  }).then (function (jsonActivities) {

    renderActivities(jsonActivities);
  })
};

function newActivity () {
  $('#addButton').on('submit', function (e){
    event.preventDefault();
    let activity = $('.form-control').val();
    // cosole.log("activity",activity)

    if (activity === '') {
      alert('alert');
      return;
    }else{
      console.log("post")
      $.ajax({
        url: "/activity",
        type: 'POST',
        data: $(this).serialize()
      }).then (function (jsonActivities) {
        $('.form-control').val('');
        loadActivities();
          // $('.contentBuy').prepend(createBuy([{activity}]));
        })
    };
  })
}


/* Renders the activities and places them to specified columns
*/
function renderActivities (activities){
  console.log(activities);
  $('#eatSection').empty();
  $('#readSection').empty();
  $('#buySection').empty();
  $('#watchSection').empty();
  console.log('*****************************************************');
  activities.forEach(function (activity){
    if(activity.category === "Buy"){
      $('#buySection').prepend(createBuy(activity))
    }else if (activity.category === "Watch"){
      $('#watchSection').prepend(createWatch(activity))
    }else if (activity.category === "Eat"){
      $('#eatSection').prepend(createEat(activity))
    }else if (activity.category === "Read"){
      $('#readSection').prepend(createRead(activity))
    }
  })
}

$(document).ready(function() {
  loadActivities();
  console.log("did it get here?")
  newActivity();
  console.log("test")

})


$(function() {
  var body = $('#body');
  var backgrounds = new Array(
  'url("images/lupoing.jpg")',
  'url("images/barrika.jpg")',
  'url("images/Itanki.jpg")',
  );
  var current = 0;
  
  function nextBackground() {
    body.css('background', backgrounds[current = ++current % backgrounds.length]);
    setTimeout(nextBackground, 30000);
  }
  setTimeout(nextBackground, 30000);
  body.css('background', backgrounds[0]);
});

