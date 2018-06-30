//pseudo code:
var request = require ('request');



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



function checkQuery(string) {
  if (filterMovie(string).length !== 0 ){
    console.log('is it movie?', filterMovie(string));
  } else if (filterRead(string).length !== 0){
    console.log('is it reading?', filterRead(string));
  } else if (filterEat(string).length !== 0){
    console.log('is it eating?', filterEat(string));
  } else if (filterShop(string).length !== 0){
    console.log('is it shopping?', filterShop(string));
  }
}

var keywordtest = "i wanna read harry potter"
//checkQuery(keywordtest)


// so empty array = this is not the category, if keyword found, array of key word will be logged


//WITH WOLFRAM API



function checkDomain (search) {
  var url = 'http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=DEMO&mode=Default&i='+ search +'&output=json'

  request(url, function (err, result, body){
    var data = JSON.parse(body);
    var test = data.query[0].domain

      //console.log(typeof test)
      //console.log("inSynch", test == 'movies')
      if (test == 'movies') {
        console.log('this is a movie')
      }
      else if (test == 'food'){
        console.log('this is food, so eating?')
      }
      else if (test == 'books'){
        console.log('this is a book!')
      }
      else {
        console.log(' i dont know what u mean?' )
      }

  })

}

var domaintest = "twilight"
checkDomain(domaintest)


//filterDomain(domaintest)

// function checkDomain(query) {
//   if ()
// }


// it's kind slow... should i be concern?




