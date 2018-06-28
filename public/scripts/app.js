
// function createList() {
//   $( "#activity-container .eat").append($("<p>").text("hello there"));
// }

/* Appends a buy activity to index file.
  * this function creates this:
            <p class="contentEat">Content
              <span>
                <i class="fas fa-clipboard-check"></i>
                <i class="fas fa-trash-alt"></i>
              </span>
            </p>
 */


function createBuy (input) {
  console.log("a");
  var $contentBuy = $('<p>').addClass('contentBuy').text(input.activity);
  $('<span>')
  .appendTo($contentBuy);

  $('<i>').addClass('fas fa-clipboard-check')
  .appendTo($contentBuy);

  $('<i>').addClass('fas fa-trash-alt')
  .appendTo($contentBuy);

  return $contentBuy;
}

function createWatch (input) {
  console.log("a")
  var $contentWatch = $('<p>').addClass('contentWatch').text(input.activity);
  $('<span>')
  .appendTo($contentWatch);

  $('<i>').addClass('fas fa-clipboard-check')
  .appendTo($contentWatch);

  $('<i>').addClass('fas fa-trash-alt')
  .appendTo($contentWatch);
  
  return $contentWatch;
}

function createRead (input) {
  console.log("a")
  var $contentRead = $('<p>').addClass('contentRead').text(input.activity);
  $('<span>')
  .appendTo($contentRead);

  $('<i>').addClass('fas fa-clipboard-check')
  .appendTo($contentRead);

  $('<i>').addClass('fas fa-trash-alt')
  .appendTo($contentRead);
  
  return $contentRead;
}


function createEat (input) {
  console.log("a")
  var $contentEat = $('<p>').addClass('contentEat').text(input.activity);
  $('<span>')
  .appendTo($contentEat);

  $('<i>').addClass('fas fa-clipboard-check')
  .appendTo($contentEat);

  $('<i>').addClass('fas fa-trash-alt')
  .appendTo($contentEat);
  
  return $contentEat;
}


function loadActivities () {
  $.ajax({
    url: "/activity",
    type: 'GET',
    success: function (jsonActivities) {
      console.log("here?")
      renderActivities(jsonActivities);
    }
  });
};

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
  // createList();
  // $('#addButton').on('submit', function (e){
  //   event.preventDefault();
  //   if (text === '') {
  //     $('.noInputChar').fadeIn(300).delay(500).fadeOut();
  //     return;
  //  }else {
  console.log("test")
  loadActivities();
})
