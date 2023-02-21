class MovieService {
  apiBase = "https://api.themoviedb.org/3";

  apiKey = "d025367c0e84bf28c034734306c8afc4";

  // eslint-disable-next-line class-methods-use-this
  getResource = async (url) => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }
      const data = await res.json();

      return data;
    } catch (err) {
      return err.message;
    }
  };

  getGuestSession = async () => {
    const guestSession = await this.getResource(
      `${this.apiBase}/authentication/guest_session/new?api_key=${this.apiKey}`
    );

    const { guest_session_id: guestId } = guestSession;

    localStorage.setItem("guest", guestId);
  };

  getAllMovies = async (value, page) => {
    const res = await this.getResource(
      `${this.apiBase}/search/movie?api_key=${this.apiKey}&language=ru-RU&page=${page}&query='${value}'`
    );

    const movies = res.results.map(this.transformMovie);
    const totalMovies = res.total_results;

    return { movies, totalMovies };
  };

  getRatedMovies = async (page) => {
    const guestId = localStorage.getItem("guest");

    const res = await this.getResource(
      `${this.apiBase}/guest_session/${guestId}/rated/movies?api_key=${this.apiKey}&page=${page}`
    );

    const ratedMovies = res.results.map(this.transformMovie);
    const totalratedMovies = res.total_results;
    const currPage = res.page;

    return { ratedMovies, totalratedMovies, currPage };
  };

  postRatedMovie = async (movieId, rating) => {
    const guestId = localStorage.getItem("guest");

    const body = {
      value: rating,
    };

    await fetch(
      `${this.apiBase}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      }
    ).catch((err) => err.message);
  };

  deleteRatedMovie = async (movieId) => {
    const guestId = localStorage.getItem("guest");

    await fetch(
      `${this.apiBase}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );
  };

  getGenres = async () => {
    const res = await this.getResource(
      `${this.apiBase}/genre/movie/list?api_key=${this.apiKey}&language=ru-RU`
    );

    const genresId = res.genres.map((genre) => [genre.id, genre.name]);

    return genresId;
  };

  // eslint-disable-next-line class-methods-use-this
  transformMovie = (movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    date: movie.release_date,
    img: movie.poster_path,
    rate: movie.vote_average,
    genres: movie.genre_ids,
    rating: movie.rating || 0,
  });
}

export default MovieService;
