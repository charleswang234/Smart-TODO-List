'use strict';
require('dotenv').config();
const request = require('request')

// const stringSimilarity = require('string-similarity');
// const knexConfig       = require("./knexfile");
// const knex             = require("knex")(knexConfig.development);
const yelpKey = process.env.yelpKey;
const movieKey = process.env.movieKey;
const bookKey = process.env.bookKey;
const walmartKey = process.env.walmartKey;

const walmart = require('walmart')(walmartKey);
const yelp = require('yelp-fusion');
 
const yelpClient = yelp.client(yelpKey);


function walmartSearch(searchTerm) {
    walmart.search(searchTerm)
    .then(function(item) {
    var walmartArr = []
    item.items.forEach(function (i){
        walmartArr.push(i.name)
        
        })
    console.log(walmartArr);
  })
};

// console.log(walmartSearch('harrypotter'));

function yelpSearch(searchTerm) {
    yelpClient.search({
    term: searchTerm,
    location: 'toronto, on'
  }).then(response => {
    var yelpArr = []
    response.jsonBody.businesses.forEach(function (i){
        yelpArr.push(i.name)
    });
    console.log(yelpArr)
  }).catch(e => {
    console.log(e);
  });

}

// console.log(yelpSearch('lighthouse'))

// function query(searchTerm){
//     var searchURL = 'http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=DEMO&mode=Default&i='+ searchTerm +'&output=json'
//     request(searchURL, function(err, result, body){
//         var info = JSON.parse(body);
//         console.log(info.query[0].domain);
//         console.log(info.query[0].resultsignificance);
//     })
    
// }

// console.log(query("books"));

function bookSearch(searchTerm){
    var booksURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&orderBy=relevance&maxResults=10&key=" + bookKey;
    request(booksURL, function(err, result, body){
        var info = JSON.parse(body);
        // console.log(body);
        var booksArr = [];
        // console.log(r)
        for( var i=0; i < info.items.length; i++){
            booksArr.push(info.items[i].volumeInfo.title);
        }
        console.log(booksArr);
    })
}
   
// console.log(bookSearch("harry potter"));

function movieSearch(searchTerm){
    var moviesURL = 'https://api.themoviedb.org/3/search/movie?query='+ searchTerm +'&api_key='+ movieKey + '&language=en-US&page=1&include_adult=false'
    request(moviesURL, function(err, result, body){
        var info = JSON.parse(body);
        var moviesArr = []
        info.results.forEach(function (i){
            moviesArr.push(i.title)
        })
        console.log(moviesArr);
    })
}

// console.log(movieSearch('test'));

function getWeather() {
    var temp2 ='';
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=toronto&APPID=' +'33880363f19f1dfe20b7149702d5b9d4';
      request(url, function (err, result, body){
        var data = JSON.parse(body);
        var temp = data.weather.main;
        temp2 = temp;
        console.log(temp2);
      })
    }

    console.log(getWeather());



// weather.then((success)=>{
//     console.log(success, 'temp');
// })

// function returnRelevant (searchTerm){
//     return new Promise((resolve, reject) => {
//     walmartSearch(searchTerm)
//     .then(function(response){
//         var result = [];
//         response.forEach(function (i){
//             result.push(i)
//         })
//     });
// })


//     console.log(results);
// }


// function searchResults(searchTerm){
//     console.log(searchTerm," is the query")
//     var resultsArr = []
//     return searchTerm
// }

// var promise1 = walmartSearch("test");
// var promise2 = 42;
// var promise3 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then(function(values) {
//   console.log(values);
// });
// expected output: Array [3, 42, "foo"]
