const moviePic = document.getElementById('moviePic');
const searchEl = document.getElementById('searchEl');
const searchBtn = document.getElementById('searchBtn');
const main = document.getElementById('main');

main
let imgPath = "https://image.tmdb.org/t/p/w1280"


function popularMovie(){
    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      
      data.results.forEach(movie => {
         const div = document.createElement('div');
         div.id = "movieContainer"
         div.innerHTML = `
         
            <img id="moviePic" src="${imgPath + movie.poster_path}">
            <div id="movieBottom">
                <h2 id="movieTitle">${movie.title}</h2>
                <span id="vote_average">${movie.vote_average}</span>
            </div>
            <div id="overviewContainer">
                <h3 id="overviewTitle">Overview :</h3>
                <p id="overviewContent">${movie.overview}</p>
            </div>
         `
        main.appendChild(div);
        searchEl.value = "";
         //console.log(movie.overview); 
        //  console.log(movie.poster_path);
      });
    });
}

function getMovie(){
    main.innerHTML = "";
    fetch(`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${searchEl.value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      
      data.results.forEach(movie => {
         const div = document.createElement('div');
         div.id = "movieContainer"

         div.innerHTML = `
         
            <img id="moviePic" src="${imgPath + movie.poster_path}" alt="${movie.title}img">
            <div id="movieBottom">
                <h2 id="movieTitle">${movie.title}</h2>
                <span id="vote_average">${movie.vote_average}</span>
            </div>
            <div id="overviewContainer">
                <h3 id="overviewTitle">Overview :</h3>
                <p id="overviewContent">${movie.overview}</p>
            </div>
         `
        main.appendChild(div);
        searchEl.value = "";
         //console.log(movie.overview); 
        //  console.log(movie.poster_path);
      });
    });
}
window.addEventListener('load',popularMovie)
searchBtn.addEventListener('click', getMovie)