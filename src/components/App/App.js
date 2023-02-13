import { Component } from "react";
import { Tabs } from "antd";

import MovieService from "../../services/MovieService";
import NetworkDetector from "../NetworkDetector";
import { MovieServiceProvider } from "../MovieServiceContext";
import ErrorMessage from "../ErrorMessage";
import MoviesList from "../MoviesList";
import Search from "../Search";

import "./App.scss";

export default class App extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      savedMovies: new Map(),
      genresId: new Map(),
      currentValue: "",
      totalMovies: 0,
      currentPage: 1,
      currentTab: 1,
      network: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.movieService.getGuestSession();
    this.movieService.getGenres().then(this.genresLoaded);
  }

  componentDidUpdate(_, prevState) {
    const { currentPage, currentValue, currentTab } = this.state;

    if (currentTab === 2 && prevState.currentPage !== currentPage) {
      this.getRatedMovies(currentPage);
    }

    if (currentTab === 1 && prevState.currentPage !== currentPage) {
      this.searchMovies(currentValue, currentPage);
    }
  }

  onNetworkState = () => {
    this.setState(({ network }) => ({ network: !network }));
  };

  genresLoaded = (genres) => {
    this.setState({ genresId: new Map(genres) });
  };

  onTabsChange = (key) => {
    const { savedMovies } = this.state;
    const tabsKey = key === "1" ? 1 : 2;

    this.setState({
      movies: [],
      currentValue: "",
      currentPage: 1,
      totalMovies: 0,
      currentTab: tabsKey,
    });

    if (key === "1") {
      savedMovies.forEach((value) => {
        if (value.rating === 0) {
          savedMovies.delete(value.id);
        }
      });
    }

    if (key === "2") {
      this.getRatedMovies();
    }
  };

  searchMovies = (value) => {
    if (!value) {
      this.setState({
        movies: [],
        currentValue: "",
        currentPage: 1,
        totalMovies: 0,
      });

      return;
    }

    const { currentPage } = this.state;

    this.onMoviesLoading();
    this.onCurrentValue(value);

    this.movieService
      .getAllMovies(value, currentPage)
      .then(this.onMoviesLoaded)
      .catch(this.onError);
  };

  getRatedMovies = () => {
    const { currentPage } = this.state;

    this.onMoviesLoading();

    this.movieService
      .getRatedMovies(currentPage)
      .then(this.onRatedMoviesLoaded)
      .catch(this.onError);
  };

  onRatedMoviesLoaded = ({ ratedMovies, totalratedMovies }) => {
    this.setState({
      movies: ratedMovies,
      totalMovies: totalratedMovies,
      loading: false,
    });
  };

  onMoviesLoaded = ({ movies, totalMovies }) => {
    this.setState({
      movies,
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

  onRateChange = (movie) => (newRating) => {
    const { currentTab } = this.state;

    // eslint-disable-next-line no-unused-expressions
    currentTab === 1
      ? this.rateChangeMovies(movie, newRating)
      : this.rateChangeRatedMovies(movie, newRating);
  };

  rateChangeMovies = (movie, rate) => {
    const { id } = movie;
    const { savedMovies } = this.state;

    if (!savedMovies.has(id)) {
      this.setState({
        savedMovies: savedMovies.set(id, { ...movie, rating: rate }),
      });
    }

    if (rate === 0) {
      savedMovies.delete(id);

      this.setState({
        savedMovies,
      });

      this.movieService.deleteRatedMovie(id);
    } else {
      const newMovieRate = { ...movie, rating: rate };

      this.setState({
        savedMovies: savedMovies.set(id, newMovieRate),
      });

      this.movieService.postRatedMovie(id, rate);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  rateChangeRatedMovies = (movie, rate) => {
    const { id } = movie;
    const { savedMovies } = this.state;

    if (rate === 0) {
      const newMovieRate = { ...movie, rating: rate };
      this.setState({
        savedMovies: savedMovies.set(id, newMovieRate),
      });

      this.movieService.deleteRatedMovie(id);
    } else {
      const newMovieRate = { ...movie, rating: rate };

      this.setState({
        savedMovies: savedMovies.set(id, newMovieRate),
      });

      this.movieService.postRatedMovie(id, rate);
    }
  };

  render() {
    const {
      movies,
      savedMovies,
      genresId,
      currentPage,
      currentValue,
      totalMovies,
      network,
      error,
      loading,
    } = this.state;

    const offline = network ? <ErrorMessage text="No connection" /> : null;

    return (
      <div className="container">
        {offline}
        <Tabs
          defaultActiveKey="1"
          destroyInactiveTabPane={false}
          centered
          onChange={(key) => this.onTabsChange(key)}
          items={[
            {
              key: "1",
              label: "Search",
              children: (
                <div className="movies-list">
                  <Search searchMovies={this.searchMovies} />
                  <MovieServiceProvider value={genresId}>
                    <MoviesList
                      movies={movies}
                      savedMovies={savedMovies}
                      error={error}
                      loading={loading}
                      currentPage={currentPage}
                      totalMovies={totalMovies}
                      onPageChange={this.onPageChange}
                      currentValue={currentValue}
                      onRateChange={this.onRateChange}
                    />
                  </MovieServiceProvider>
                </div>
              ),
            },
            {
              key: "2",
              label: "Rated",
              children: (
                <div className="movies-list">
                  <MovieServiceProvider value={genresId}>
                    <MoviesList
                      movies={movies}
                      savedMovies={savedMovies}
                      totalMovies={totalMovies}
                      onRateChange={this.onRateChange}
                      onPageChange={this.onPageChange}
                    />
                  </MovieServiceProvider>
                </div>
              ),
            },
          ]}
        />
        <NetworkDetector onNetworkState={this.onNetworkState} />
      </div>
    );
  }
}
