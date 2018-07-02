
const request = require('request');

// array of key words:
var shopArr = ['buy', 'shop', 'acquire', 'purchase', 'obtain', 'stock up']
var readArr = ['study', 'scan', 'read', 'perusal', 'browse']
var movieArr = ['watch', 'see', 'movie', 'theater', 'cinema', 'drama', 'opera']
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

module.exports = {
  checkQuery: checkQuery,
}




