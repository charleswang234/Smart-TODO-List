module.exports = {
  checkQuery: checkQuery
}

// array of key words:
var shopArr = ['buy', 'shop', 'acquire', 'purchase', 'obtain', 'stock up']
var readArr = ['study', 'scan', 'read', 'perusal', 'browse']
var movieArr = ['watch', 'see', 'movie', 'theater', 'cinema']
var eatArr = ['dine', 'lunch', 'eat', 'dinner', 'brunch', 'breakfast', 'snack','teatime', 'cafe',
              ,'']

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

// router.post("/", function(req, res) {

//   if (!req.body.inputActivity) {
//     res.status(400).json({ error: 'invalid request: no data in POST body'});
//     return;
//   }
//   else{

//     const notrandomInt = checkQuery(req.body.inputActivity)
//     console.log("inserting?")
//     knex("tasks")
//     .insert({'activity': req.body.inputActivity,
//             'completed': false,
//             'user_id': req.session.user_id,
//             'category_id': notrandomInt
//       })
//     .then(function(){
//       console.log("insert done")
//       res.status(201).send();
//       // res.redirect("/home")
//     })
//     }

//   })

function checkQuery(string) {
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
  }
}

var keywordtest = "i wanna read harry potter"
checkQuery(keywordtest)


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


// var domaintest = "twilight"
// checkDomain(domaintest)

