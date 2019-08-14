'use strict';

const url = 'https://www.themealdb.com/api/json/v1/1/search.php';



function queryParams(params) {
    const queryItems = Object.keys(params).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function displayResults(responseJson, maxResults){
  console.log(responseJson);
  $('#results-list').empty();
  $('.js-error').empty();
  for(let i = 0; i < responseJson.meals.length && i < maxResults; i++){
        $('#results-list').append(
          `<li><h3><a href="${responseJson.meals[i].strSource}">${responseJson.meals[i].strMeal}</a></h3>
          <img src='${responseJson.meals[i].strMealThumb}' height="300" width="400"> <iframe width="420" height="315"
          src="${responseJson.meals[i].strYoutube}">
          </iframe>
         <ul>${responseJson.meals[i].strCategory}</ul>
        </li> <p>${responseJson.meals[i].strInstructions}</p>
        <div class="ingredients"></div>
      `)
      var div = document.createElement('div');
      div.setAttribute('class', 'ingredients');
      div.setAttribute('id', `ingredients${i}`);
        for(let j = 1; j < 21; j++){
            div.appendChild(`<span>${ingredientString}</span>`)
            $('#result-list').append(div)
           };
      };


   $('#results').removeClass('hidden');
};


function getRecipe(tacos, maxResults){
  const params ={
    s: tacos,
    value: maxResults
  };


  const queryString = queryParams(params)
  const searchUrl = url+'?'+queryString;

  console.log(searchUrl);


  fetch(searchUrl)
  .then(response => response.json())
   .then(responseJson => 
      displayResults(responseJson,maxResults))
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









   
