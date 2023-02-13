import { Tag, Rate } from "antd";
import { format, parseISO } from "date-fns";

import { MovieServiceConsumer } from "../MovieServiceContext";
import "./MovieCard.scss";
import noImage from "../../resources/img/noImage.jpeg";

export default function MovieCard({
  title,
  rate,
  rating,
  description,
  date,
  img,
  genres,
  onRateChange,
}) {
  const poster = img ? `https://image.tmdb.org/t/p/original${img}` : noImage;
  const formatDate = (movieDate) => format(parseISO(movieDate), "MMMM d, y");
  const formatedDate = date ? formatDate(date) : null;

  const reductionText = (text) =>
    `${text.split(" ").slice(0, 10).join(" ")} ...`;

  const formatRate = (movieRate) => Number(movieRate.toFixed(1));
  const colorRate = (numRate) => {
    let color;

    if (numRate > 7) {
      color = "#66E900";
    } else if (numRate > 5) {
      color = "#E9D100";
    } else if (numRate > 3) {
      color = "#E97E00";
    } else {
      color = "#E90000";
    }

    return {
      borderColor: color,
    };
  };

  return (
    <MovieServiceConsumer>
      {(genresId) => {
        const genreTags = genres.map((genre) => {
          if (genresId.has(genre)) {
            return (
              <Tag key={genre} className="card__tag">
                {genresId.get(genre)}
              </Tag>
            );
          }

          return genre;
        });

        return (
          <div className="card">
            <img className="card__img" src={poster} alt="Poster" />
            <div className="card__content">
              <div className="card__header">
                <h2 className="card__title">{title}</h2>
                <p className="card__rate" style={colorRate(rate)}>
                  {formatRate(rate)}
                </p>
              </div>
              <p className="card__date">{formatedDate}</p>
              <div className="card__wrapper">{genreTags}</div>
              <p className="card__description">{reductionText(description)}</p>
              <Rate
                className="card__pagination"
                allowHalf
                value={rating}
                count={10}
                onChange={onRateChange()}
              />
            </div>
          </div>
        );
      }}
    </MovieServiceConsumer>
  );
}
