'use strict';
require('dotenv').config();
const request = require('request')

// const stringSimilarity = require('string-similarity');
// const knexConfig       = require("./knexfile");
// const knex             = require("knex")(knexConfig.development);


const walmart = require('walmart')('nxezyf3pndkz4xpxehn8f9uz');
const yelp = require('yelp-fusion');
 
const yelpClient = yelp.client('YDnLSKeLk6hYczLeiEitHhFxMYDdIFDpVb7X9luYqSlwId0k-PK8B1HuZytndgdYiPNDS6KVGh-z_jt3hsHQ8YpvpfMsvz-ncoezyc1bk-R1A8TOPVnmCyhata82W3Yx');


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

// console.log(walmartSearch('harrypotter'));

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

// console.log(yelpSearch('lighthouse'))

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
    var key = "AIzaSyCwWA24Ex48X20lZvX9oh3LoL0LnnCHOJ8"
    var booksURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&orderBy=relevance&maxResults=10&key=" + key
    request(booksURL, function(err, result, body){
        var info = JSON.parse(body);
        var booksArr = []
        for( var i=0; i < info.items.length; i++){
            booksArr.push(info.items[i].volumeInfo.title);
        }
        console.log(booksArr);
    })
}
   
// console.log(bookSearch("harry potter"));

function movieSearch(searchTerm){
    
    var moviekey = "068fe8e6d2f836a0b62b57ba9778ad25"
    var moviesURL = 'https://api.themoviedb.org/3/search/movie?query='+ searchTerm +'&api_key='+ moviekey + '&language=en-US&page=1&include_adult=false'
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
