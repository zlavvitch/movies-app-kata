import { Col, Row } from "antd";

import MovieCard from "../MovieCard";
import MoviePagination from "../MoviePagination";

import "./MovieList.scss";

export default function MovieList({
  movies,
  currentPage,
  totalMovies,
  onPageChange,
}) {
  const renderItems = (arr) => {
    const items = arr.map((movie, index) => {
      const { id, ...itemProps } = movie;

      return (
        // eslint-disable-next-line react/no-array-index-key
        <Col key={index} span={12}>
          <MovieCard
            key={id}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...itemProps}
          />
        </Col>
      );
    });

    return (
      <>
        <Row gutter={[36, 37]} className="movie-list__content">
          {items}
        </Row>
        <MoviePagination
          currentPage={currentPage}
          totalMovies={totalMovies}
          onPageChange={onPageChange}
        />
      </>
    );
  };

  return <section className="movie-list">{renderItems(movies)}</section>;
}
