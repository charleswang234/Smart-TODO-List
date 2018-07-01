
// function createList() {
//   $( "#activity-container .eat").append($("<p>").text("hello there"));
// }


function dropDown () {
  theDropDown = `<a class="far fa-caret-square-down" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <button hidden class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
   </button>
  </a>
  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
  <a class="dropdown-item eatChange" href="#">
  <p>Eat</p>
  </a>
  <!-- these will have to be forms to have POST methods -->
  <a class="dropdown-item readChange href="#">
  <p>Read</p>
  </a>
  <a class="dropdown-item buyChange" href="#">
  <p>Buy</p>
  </a>
  <a class="dropdown-item watchChange" href="#">
  <p>Watch</p>
  </a>
  </div>`;
  return theDropDown;
}


/* Appends a buy activity to index file.
*/
function createBuy (input) {
  // creates a paragraph
  var $contentBuy = $('<p>').addClass('contentBuy');
  $('<i>').addClass('far fa-check-circle toggleFinished')
  .appendTo($contentBuy);
  const $realText = $('<span>');
  $('<div>').addClass('buyactivity').appendTo($contentBuy)
  $realText.addClass('decorateTask').text(input.activity).appendTo($contentBuy);
  if (input.completed) {
    $realText.css("text-decoration", "line-through");
  }

  // creates an extra section and append to the paragraph
  const $span = $('<span>');
  $span.addClass('barTrash').appendTo($contentBuy);

  // all the symbols and drop down menu
  $('<div>').appendTo($span)
  $(dropDown()).appendTo($span);


  $('<i>').addClass('far fa-trash-alt deleteTask')
  .appendTo($span);

  return $contentBuy;
}

/* Appends a watch activity to index file.
*/
function createWatch (input) {
  // creates a paragraph
  var $contentWatch = $('<p>').addClass('contentWatch');
  $('<i>').addClass('far fa-check-circle toggleFinished')
  .appendTo($contentWatch);
  const $realText = $('<span>');

  $realText.addClass('decorateTask').text(input.activity).appendTo($contentWatch);
  if (input.completed) {
    $realText.css("text-decoration", "line-through");
  }

  // creates an extra section and append to the paragraph
  const $span = $('<span>');
  $span.addClass('barTrash').appendTo($contentWatch);

  // all the symbols and drop down menu
  $('<div>').appendTo($span)
  $(dropDown()).appendTo($span);


  $('<i>').addClass('far fa-trash-alt deleteTask')
  .appendTo($span);

  return $contentWatch;
}

/* Appends a read activity to index file.
*/
function createRead (input) {
  // creates a paragraph
  var $contentRead = $('<p>').addClass('contentRead');
  $('<i>').addClass('far fa-check-circle toggleFinished')
  .appendTo($contentRead);
  const $realText = $('<span>');

  $realText.addClass('decorateTask').text(input.activity).appendTo($contentRead);
  if (input.completed) {
    $realText.css("text-decoration", "line-through");
  }

  // creates an extra section and append to the paragraph
  const $span = $('<span>');
  $span.addClass('barTrash').appendTo($contentRead);

  // all the symbols and drop down menu
  $('<div>').appendTo($span)
  $(dropDown()).appendTo($span);


  $('<i>').addClass('far fa-trash-alt deleteTask')
  .appendTo($span);

  return $contentRead;
}

/* Appends a eat activity to index file.
*/
function createEat (input) {
  // creates a paragraph
  var $contentEat = $('<p>').addClass('contentEat');
  $('<i>').addClass('far fa-check-circle toggleFinished')
  .appendTo($contentEat);
  const $realText = $('<span>');

  $realText.addClass('decorateTask').text(input.activity).appendTo($contentEat);
  if (input.completed) {
    $realText.css("text-decoration", "line-through");
  }

  // creates an extra section and append to the paragraph
  const $span = $('<span>');
  $span.addClass('barTrash').appendTo($contentEat);

  // all the symbols and drop down menu
  $('<div>').appendTo($span)
  $(dropDown()).appendTo($span);


  $('<i>').addClass('far fa-trash-alt deleteTask')
  .appendTo($span);

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
     data: $.param({task: $(this).parent().parent().children(":nth-child(2)").text()})
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
      data: $.param({task: $(this).parent().children(":nth-child(2)").text()})
    }).then(function (jsonActivities) {
      console.log("hi");
      loadActivities();
    })
  })
}





function changeCategory(categoryClass, theUrl) {
  $(document).on('click', categoryClass, function() {
    $.ajax({
      url: theUrl,
      type: 'POST',
      // contentType: "application/json",
      data: $.param({task: $(this).parent().parent().parent().children(":nth-child(2)").text()})
    }).then(function (jsonActivities) {
      loadActivities();
    })
  })
}

// function changeToEat() {
//   $(document).on('click', '.eatChange', function() {
//     $.ajax({
//       url: "/activity/toeat",
//       type: 'POST',
//       // contentType: "application/json",
//       data: $.param({task: $(this).parent().parent().parent().children(":first").text()})
//     }).then(function (jsonActivities) {
//       loadActivities();
//     })
//   })
// }


// // read buy watch
// function changeToRead() {
//   $(document).on('click', '.readChange', function() {
//     $.ajax({
//       url: "/activity/toread",
//       type: 'POST',
//       // contentType: "application/json",
//       data: $.param({task: $(this).parent().parent().parent().children(":first").text()})
//     }).then(function (jsonActivities) {
//       loadActivities();
//     })
//   })
// }

// function changeToBuy() {
//   $(document).on('click', '.buyChange', function() {
//     $.ajax({
//       url: "/activity/tobuy",
//       type: 'POST',
//       // contentType: "application/json",
//       data: $.param({task: $(this).parent().parent().parent().children(":first").text()})
//     }).then(function (jsonActivities) {
//       loadActivities();
//     })
//   })
// }

// function changeToWatch() {
//   $(document).on('click', '.watchChange', function() {
//     $.ajax({
//       url: "/activity/towatch",
//       type: 'POST',
//       // contentType: "application/json",
//       data: $.param({task: $(this).parent().parent().parent().children(":first").text()})
//     }).then(function (jsonActivities) {
//       loadActivities();
//     })
//   })
// }



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

function popupAction (){
  $(document).on('click', '#chooseMovie', function(){
    alert("this is movie time");
    randomInt = 3;
  })
  $(document).on('click', '#chooseBuy', function(){
    alert("this shopping");
    randomInt = 1;
  })
  $(document).on('click', '#chooseRead', function(){
    alert("this reading books");
    randomInt = 2;
  })
  $(document).on('click', '#chooseEat', function(){
    alert("this food time");
    randomInt = 4;
  })
}




$(document).ready(function() {
  loadActivities();
  console.log("did it get here?");

  newActivity();
  deleteActivity();
  toggleFinishedActivity();
  changeCategory('.eatChange', '/activity/toeat');
  changeCategory('.readChange', '/activity/toread');
  changeCategory('.buyChange', '/activity/tobuy');
  changeCategory('.watchChange', '/activity/towatch');
  console.log("test");


})


$(function() {
  var body = $('#body');
  var backgrounds = new Array(
  'url("images/lupoing.jpg")',
  'url("images/barrika.jpg")',
  'url("images/bardenas.jpg")',
  'url("images/canyon.jpg")',
  'url("images/catalina.jpg")',
  'url("images/dutch.jpg")',
  'url("images/gulf.jpg")',
  'url("images/medven.jpg")',
  'url("images/namib.jpg")',
  'url("images/norway.jpg")',
  'url("images/stelvio.jpg")',
  );
  var current = 0;

  function nextBackground() {
    body.css('background', backgrounds[current = ++current % backgrounds.length]);
    setTimeout(nextBackground, 10000);
  }
  setTimeout(nextBackground, 10000);
  body.css('background', backgrounds[0]);
});

