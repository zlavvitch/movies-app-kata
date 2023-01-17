// import { Component } from "react";

import { Card, Tag } from "antd";
import { format, parseISO } from "date-fns";

import "./MovieCard.scss";

export default function MovieCard({ title, description, date, img }) {
  const formatDate = (movieDate) => {
    format(parseISO(movieDate), "MMMM d, y");
  };

  const reductionText = (text) =>
    `${text.split(" ").slice(0, 10).join(" ")} ...`;

  return (
    <Card
      style={{
        borderRadius: 0,
        filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15))",
      }}
      bodyStyle={{ display: "flex", padding: 0, borderRadius: 0 }}
    >
      <img
        className="card__img"
        src={`https://image.tmdb.org/t/p/original${img}`}
        alt="Poster"
      />
      <div className="card__content">
        <h2 className="card__title">{title}</h2>
        <p className="card__date">{formatDate(date)}</p>
        <div className="card__wrapper">
          <Tag className="card__tag">Drama</Tag>
          <Tag className="card__tag">Drama</Tag>
        </div>
        <p className="card__description">{reductionText(description)}</p>
      </div>
    </Card>
  );
}
