import { createApp, ref, onMounted } from "vue";

createApp({
  setup() {
    let imgPath = "https://image.tmdb.org/t/p/w1280";
    const movies = ref([]);
    const inputText = ref("");
    function popularMovie() {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          data.results.forEach((movie) => {
            movies.value.push({
              movieTitle: movie.original_title,
              movieVoteAverage: movie.vote_average,
              movieOverview: movie.overview,
              movieImage: imgPath + movie.poster_path,
            });
          });
        });
    }
    function getMovie() {
      movies.value = [];
      //把搜尋欄的字刪除，會再次跳出熱門電影
      if (!movies.value.length && !inputText.value.length) {
        popularMovie();
      } else {
        fetch(
          `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${inputText.value}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            data.results.forEach((movie) => {
              movies.value.push({
                movieTitle: movie.original_title,
                movieVoteAverage: movie.vote_average.toFixed(1),
                movieOverview: movie.overview,
                movieImage: imgPath + movie.poster_path,
              });
            });
          });
      }
    }
    onMounted(() => {
      popularMovie();
    });

    return {
      popularMovie,
      getMovie,
      movies,
      inputText,
    };
  },
}).mount("#app");