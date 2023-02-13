import MovieCard from "../MovieCard";
import MoviePagination from "../MoviePagination";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

import "./MoviesList.scss";

export default function MoviesList({
  movies,
  savedMovies,
  error,
  loading,
  currentPage,
  currentValue,
  totalMovies,
  onPageChange,
  onRateChange,
}) {
  const rendreCards = (data) =>
    data.map((movie) => {
      const { id, title, description, date, img, rate, genres, rating } = movie;

      let curRating = rating;

      if (savedMovies.has(id)) {
        curRating = savedMovies.get(id).rating;
      }

      return (
        <MovieCard
          key={id}
          genres={genres}
          title={title}
          rate={rate}
          rating={curRating}
          description={description}
          date={date}
          img={img}
          onRateChange={() => onRateChange(movie)}
        />
      );
    });

  const errorMessage = error ? <ErrorMessage text="Error" /> : null;
  const spinner = loading ? <Spinner /> : null;
  const noContent =
    currentValue && movies?.length === 0 && !(loading || error) ? (
      <ErrorMessage text="No films" />
    ) : null;

  const content = !(loading || error) ? rendreCards(movies) : null;

  const pagination = totalMovies ? (
    <MoviePagination
      currentPage={currentPage}
      totalMovies={totalMovies}
      onPageChange={onPageChange}
    />
  ) : null;

  return (
    <div className="cards">
      <div className="cards__wrapper">
        {errorMessage}
        {spinner}
        {noContent}
        {content}
      </div>
      {pagination}
    </div>
  );
}
