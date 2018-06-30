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
    console.log(item.items.forEach(function (i){
        walmartArr.push(i.name)
        
        })
    )
    console.log(walmartArr);
  })
};

console.log(walmartSearch('harrypotter'));

function yelpSearch(searchTerm) {
    yelpClient.search({
    term: searchTerm,
    location: 'toronto, on'
  }).then(response => {
    var yelpArr = []
    console.log(response.jsonBody.businesses.forEach(function (i){
        yelpArr.push(i.name)
    }));
    console.log(yelpArr)
  }).catch(e => {
    console.log(e);
  });

}

console.log(yelpSearch('lighthouse'))

function query(searchTerm){
    var searchURL = 'http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=DEMO&mode=Default&i='+ searchTerm +'&output=json'
    request(searchURL, function(err, result, body){
        var info = JSON.parse(body);
        console.log(info.query[0].domain);
        console.log(info.query[0].resultsignificance);
    })
    
}

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
   
console.log(bookSearch("harry potter"));

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

console.log(movieSearch('test'));
