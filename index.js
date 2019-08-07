'use strict';

const apikey = '65fce80e490c4cb58c8fdd77edc4677d';
const searchUrl = 'https://api.spoonacular.com/recipes/complexSearch';


function queryParams(params) {
    const queryItems = Object.keys(params).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function displayResults(responseJson){
  $('#results-list').empty();
  $('.js-error').empty();
  for(let i = 0; i < responseJson.results.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson.results[i].id}">${responseJson.results[i].title}</a></h3>
      <img src='${responseJson.results[i].image}'>
      </li>`
    )};

   $('#results').removeClass('hidden');

};

function getRecipe(tacos,maxResults,){
  const params ={
    query: tacos,
    number: maxResults,
  };


  const queryString = queryParams(params)
  const url = searchUrl+'?'+queryString +'&apiKey='+ apikey;

  console.log(url);


  fetch(url)
  .then(response =>{
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err =>{
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchRecipe = $('.js-search-recipe').val();
    const maxResults = $('.js-max-results').val();
    getRecipe(searchRecipe, maxResults);
  });
}

$(watchForm);









   
