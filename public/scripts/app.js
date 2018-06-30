
// function createList() {
//   $( "#activity-container .eat").append($("<p>").text("hello there"));
// }

/* Appends a buy activity to index file.
*/
function createBuy (input) {
  var $contentBuy = $('<p>').addClass('contentBuy').text(input.activity);
  // $('<span>')
  // .appendTo($contentBuy);
  if (input.completed) {
    $contentBuy.css("text-decoration", "line-through");
  }
  $('<i>').addClass('fas fa-clipboard-check toggleFinished')
  .appendTo($contentBuy);

  $('<i>').addClass('fas fa-trash-alt deleteTask')
  .appendTo($contentBuy);

  return $contentBuy;
}

/* Appends a watch activity to index file.
*/
function createWatch (input) {
  var $contentWatch = $('<p>').addClass('contentWatch').text(input.activity);
  // $('<span>')
  // .appendTo($contentWatch);
  if (input.completed) {
    $contentWatch.css("text-decoration", "line-through");
  }
  $('<i>').addClass('fas fa-clipboard-check toggleFinished')
  .appendTo($contentWatch);

  $('<i>').addClass('fas fa-trash-alt deleteTask')
  .appendTo($contentWatch);

  return $contentWatch;
}

/* Appends a read activity to index file.
*/
function createRead (input) {
  var $contentRead = $('<p>').addClass('contentRead').text(input.activity);
  // $('<span>')
  // .appendTo($contentRead);

  if (input.completed) {
    $contentRead.css("text-decoration", "line-through");
  }
  $('<i>').addClass('fas fa-clipboard-check toggleFinished')
  .appendTo($contentRead);

  $('<i>').addClass('fas fa-trash-alt deleteTask')
  .appendTo($contentRead);

  return $contentRead;
}

/* Appends a eat activity to index file.
*/
function createEat (input) {
  var $contentEat = $('<p>').addClass('contentEat').text(input.activity);
  // $('<span>')
  // .appendTo($contentEat);

  if (input.completed) {
    $contentEat.css("text-decoration", "line-through");
  }
  $('<i>').addClass('fas fa-clipboard-check toggleFinished')
  .appendTo($contentEat);

  $('<i>').addClass('fas fa-trash-alt deleteTask')
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

function deleteActivity() {
  $(document).on('click', '.deleteTask', function() {
    $( this ).parent().fadeOut();
    $.ajax({
     url: "/activity/delete",
     type: 'POST',
     data: $.param({task: $(this).parent().text()})
   }).then(function (jsonActivities) {
    loadActivities();
  })
 })
  // $('.contentRead').on('click', function(event) {
  //   console.log(this);

  // });
}


//, style: $(this).parent().css()

function toggleFinishedActivity() {
  $(document).on('click', '.toggleFinished', function() {
    $.ajax({
      url: "/activity/completed",
      type: 'POST',
      data: $.param({task: $(this).parent().text()})
    }).then(function (jsonActivities) {
      console.log("hi");
      loadActivities();
    })
  })
}



/* Renders the activities and places them to specified columns
*/
function renderActivities (activities){
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
  console.log("did it get here?");

  newActivity();
  deleteActivity();
  toggleFinishedActivity();
  console.log("test");

})
















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
