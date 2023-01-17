import { Component } from "react";

import MovieService from "../../services/MovieService";
import MovieList from "../MovieList";
import Search from "../Search";
import NetworkDetector from "../NetworkDetector";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

import "./App.css";

export default class App extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      totalMovies: null,
      currentPage: 1,
      currentValue: "",
      network: false,
      loading: false,
      error: false,
    };
  }

  // componentDidMount() {

  // }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, currentValue } = this.state;
    if (prevState.currentPage !== currentPage) {
      this.searchMovies(currentValue, currentPage);
    }
  }

  onNetworkState = () => {
    this.setState(({ network }) => ({ network: !network }));
  };

  searchMovies = (value) => {
    if (!value) {
      this.setState({ movies: null, currentValue: null, currentPage: 1 });
      return;
    }

    this.onMoviesLoading();
    this.onCurrentValue(value);
    const { currentPage } = this.state;

    this.movieService
      .getAllMovies(value, currentPage)
      .then(this.onMoviesLoaded)
      .catch(this.onError);
  };

  onMoviesLoaded = ({ movies, totalMovies }) => {
    // console.log(movies, totalPages, totalMovies);
    this.setState({
      movies,
      // totalPages,
      totalMovies,
      loading: false,
    });
  };

  onMoviesLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  onCurrentValue = (value) => {
    this.setState({ currentValue: value });
  };

  render() {
    const { movies, currentPage, totalMovies, network, error, loading } =
      this.state;

    const offline = network ? <ErrorMessage text="No connection" /> : null;

    const movieList = (
      <MovieList
        movies={movies}
        currentPage={currentPage}
        totalMovies={totalMovies}
        onPageChange={this.onPageChange}
      />
    );
    const errorMessage = error ? <ErrorMessage text="Error" /> : null;
    const spinner = loading ? <Spinner /> : null;
    const noResult =
      !loading && movies && !movies.length ? (
        <ErrorMessage text="No films" />
      ) : null;

    const content = !(loading || error || noResult || !movies)
      ? movieList
      : null;

    return (
      <main className="page">
        {offline}
        <Search searchMovies={this.searchMovies} />
        {errorMessage}
        {spinner}
        {noResult}
        {content}
        <NetworkDetector onNetworkState={this.onNetworkState} />
      </main>
    );
  }
}
