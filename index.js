'use strict';

const url = 'https://www.themealdb.com/api/json/v1/1/search.php';

function queryParams(params) {
    const queryItems = Object.keys(params).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults){
  
  $('#results').removeClass('hidden');
  $('#results-list').empty();
  $('.js-error').empty();
  
  for(let i = 0; i < maxResults; i++){
    console.log( maxResults);
    let video = responseJson.meals[i].strYoutube;
    let videoCode = video.split('=')[1];
    let youtube_url = `https://www.youtube.com/embed/${videoCode}`;
    
    $('#results-list').append( 
      `<li>
        <h3>
          <a href="${responseJson.meals[i].strSource}">${responseJson.meals[i].strMeal}</a>
        </h3> 
        <img src='${responseJson.meals[i].strMealThumb}' height="300" width="400">
        <iframe
        class="youtubeDemonstration"
        width="490"
        height="304"
        src=${youtube_url}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe> 
        <h3>${responseJson.meals[i].strCategory}</h3> 
        <p>${responseJson.meals[i].strInstructions}</p> 
        <ul class="ingredient-list" id="test${i}"></ul>
      </li>`
    )

    for (let j = 1; j < 21; j++){
      var $li = document.createElement("li");
      $li.setAttribute('class', 'ingredients');
      $li.setAttribute('id', `ingredients${j}`);

      if(responseJson.meals[i][`strIngredient${j}`]){
        $li.innerHTML = responseJson.meals[i][`strIngredient${j}`];
        $(`#test${i}.ingredient-list`).append($li);
      }
    }
  };

} 

function getRecipe(tacos, maxResults){
  const params = {
    s: tacos,
    value: maxResults
  };

  const queryString = queryParams(params);
  const searchUrl = url + '?' + queryString;
  // console.log(searchUrl);

  fetch(searchUrl)
  .then(response => response.json())
  .then(responseJson => 
    displayResults(responseJson,maxResults))
  .catch(err => {
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








   
