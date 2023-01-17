class MovieService {
  apiBase = "https://api.themoviedb.org";

  apiKey = "d025367c0e84bf28c034734306c8afc4";

  // eslint-disable-next-line class-methods-use-this
  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    const data = await res.json();

    return data;
  };

  getAllMovies = async (value, page) => {
    const res = await this.getResource(
      `${this.apiBase}/3/search/movie?api_key=${this.apiKey}&language=ru-RU&page=${page}&query='${value}'`
    );

    const movies = res.results.map(this.transformMovie);
    const totalPages = res.total_pages;
    const totalMovies = res.total_results;

    return { movies, totalPages, totalMovies };
  };

  // eslint-disable-next-line class-methods-use-this
  transformMovie = (movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    date: movie.release_date,
    img: movie.poster_path,
  });
}

export default MovieService;

// getAllMovies = async (value) => {
//   const res = await this.getResource(
//     `${this._apiBase}/3/search/movie?api_key=${this._apiKey}&language=ru-RU&query='${value}'`
//   );

//   console.log(res);

//   return res.results.map(this._transformMovie);
// };

// // eslint-disable-next-line class-methods-use-this
// _transformMovie = (movie) => ({
//   id: movie.id,
//   title: movie.title,
//   description: movie.overview,
//   date: movie.release_date,
//   img: movie.poster_path,
// });
