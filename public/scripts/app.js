
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
      $('.contentBuy').empty();
      $('.contentWatch').empty();
      $('.contentEat').empty();
      $('.contentRead').empty();
      renderActivities(jsonActivities);
    })
  };

function newActivity () {
  $('#addButton').on('submit', function (e){
    let activity = $('inputActivity').val();
    cosole.log("activity",activity)
    event.preventDefault();
    if (activity === '') {
      alert('alert');
      return;
    }else{
      console.log("post")
      $.ajax({
        url: "/activity",
        type: 'POST',
      }).then (function (jsonActivities) {
          $('inputActivity').val('');
          loadActivities();
          // $('.contentBuy').prepend(createBuy([{activity}]));          
        })
    };
  })
}

    // $('#tweetButton').on('submit', function (event) {
      //   let text = $("textarea").val();
      //   event.preventDefault();
      //   if (text === '') {
      //     $('.noInputChar').fadeIn(300).delay(500).fadeOut();
      //     return;
      //   } else if (text.length > lengthMax) {
      //     $('.tooManyChar').fadeIn(300).delay(500).fadeOut();
      //     return;
      //   } else {
      //        $.ajax({
      //         url: '/tweets',
      //         type: 'POST',
      //         data: $(this).serialize(),
      //       }).then(function (obj){
      //           $('.noInputChar').hide();
      //           $('.tooManyChar').hide();
      //           $("textarea").val('');
      //           $('#counter').html('140');
      //           loadTweets();
      //     })
      //   }
      // })
      // loadTweets();
      // });
      



/* Renders the activities and places them to specified columns
 */
function renderActivities (activities){
  console.log(activities);
  activities.forEach(function (activity){
    if(activity.category === "Buy"){
      $('.contentBuy').prepend(createBuy(activity))
    }else if (activity.category === "Watch"){
        $('.contentWatch').prepend(createWatch(activity))
    }else if (activity.category === "Eat"){
        $('.contentEat').prepend(createEat(activity))
    }else if (activity.category === "Read"){
        $('.contentRead').prepend(createRead(activity))
    }
  })
}

$(document).ready(function() {
  console.log("did it get here?")
  newActivity();
  console.log("test")
  loadActivities();
})


