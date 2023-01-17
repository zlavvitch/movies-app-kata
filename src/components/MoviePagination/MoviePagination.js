import { Pagination } from "antd";

// import "./MoviePagination.scss";

export default function MoviePagination({
  totalMovies,
  currentPage,
  onPageChange,
}) {
  const onChange = (e) => {
    onPageChange(e);
  };

  return (
    <Pagination
      className="movie-list__pagination"
      defaultCurrent={currentPage}
      defaultPageSize={20}
      total={totalMovies}
      showSizeChanger={false}
      onChange={onChange}
    />
  );
}
