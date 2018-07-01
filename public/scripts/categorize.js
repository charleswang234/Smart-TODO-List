
const request = require('request');

// array of key words:
var shopArr = ['buy', 'shop', 'acquire', 'purchase', 'obtain', 'stock up']
var readArr = ['study', 'scan', 'read', 'perusal', 'browse']
var movieArr = ['watch', 'see', 'movie', 'theater', 'cinema']
var eatArr = ['dine', 'lunch', 'eat', 'dinner', 'brunch', 'breakfast', 'snack','teatime', 'cafe']

function filterShop(query) {
  return shopArr.filter( function(el){
    return query.toLowerCase().includes(el)
  })
}

function filterRead(query) {
  return readArr.filter( function(el){
    return query.toLowerCase().includes(el)
  })
}

function filterMovie(query) {
  return movieArr.filter( function(el){
    return query.toLowerCase().includes(el)
  })
}

function filterEat(query) {
  return eatArr.filter( function(el){
    return query.toLowerCase().includes(el)
  })
}

// Check for keywords
let checkQuery = function (string){

  if (filterMovie(string).length !== 0 ){
    console.log('is it movie?', "category_id: 3");
    return 3;
  } else if (filterRead(string).length !== 0){
    console.log('is it reading?', "category_id: 2");
    return 2;
  } else if (filterEat(string).length !== 0){
    console.log('is it eating?', "category_id: 4");
    return 4;
  } else if (filterShop(string).length !== 0){
    console.log('is it shopping?', "category_id: 1");
    return 1;
  } else {
      return null;
    }
  }


// so empty array = this is not the category, if keyword found, array of key word will be logged


// //WITH WOLFRAM API
// let checkDomain = new Promise ((resolve, reject, search) => {
//   const test2 = "";
//   var url = 'http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=DEMO&mode=Default&i='+ search +'&output=json'
//   request(url, function (err, result, body){
//     var data = JSON.parse(body);
//     var test = data.query[0].domain
//     console.log(test)
//     test2 = test
//   })
//   setTimeout(function() {
//     resolve(test2);
//   }, 2500);

// });
  //   console.log("in check domain", test)//should give the domain
  //   if (test == 'movies') {
  //     console.log("is the movie?")
  //     knex("tasks")
  //     .insert({'activity': req.body.inputActivity,
  //       'completed': false,
  //       'user_id': req.session.user_id,
  //       'category_id': 3
  //     })
  //     .then(function(){
  //       console.log("insert done")
  //       res.status(201).send();
  //       // res.redirect("/home")
  //     })
  //     return;
  //   }
  //   else if (test == 'food'){
  //     console.log("is this a food?")
  //     knex("tasks")
  //     .insert({'activity': req.body.inputActivity,
  //       'completed': false,
  //       'user_id': req.session.user_id,
  //       'category_id': 4
  //     })
  //     .then(function(){
  //       console.log("insert done")
  //       res.status(201).send();
  //       // res.redirect("/home")
  //     })
  //     return
  //   }
  //   else if (test == 'books'){
  //     console.log("is this a book?")
  //     knex("tasks")
  //     .insert({'activity': req.body.inputActivity,
  //       'completed': false,
  //       'user_id': req.session.user_id,
  //       'category_id': 4
  //     })
  //     .then(function(){
  //       console.log("insert done")
  //       res.status(201).send();
  //       // res.redirect("/home")
  //     })
  //     return;
  //   }
  //   else {
  //     console.log('trigger event')
  //     return null;
  //   }

  // })
//}

module.exports = {
  checkQuery: checkQuery,
 //  checkDomain: checkDomain
}




