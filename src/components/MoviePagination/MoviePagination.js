import { Pagination } from "antd";

export default function MoviePagination({
  totalMovies,
  currentPage,
  onPageChange,
}) {
  return (
    <Pagination
      className="movie-list__pagination"
      defaultCurrent={currentPage}
      defaultPageSize={20}
      total={totalMovies}
      size="small"
      showSizeChanger={false}
      onChange={(e) => onPageChange(e)}
      hideOnSinglePage
    />
  );
}
