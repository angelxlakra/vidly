import React, { Component } from "react";

class Genres extends Component {
  render() {
    const { genres, onGenreSelect, currentGenre } = this.props;
    return (
      <ul className="list-group">
        <li
          key="All Genres"
          onClick={() => onGenreSelect("All Genres")}
          className={
            currentGenre === "All Genres"
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          All Genres
        </li>
        {genres.map(genre => (
          <li
            key={genre.name}
            onClick={() => onGenreSelect(genre.name)}
            className={
              currentGenre === genre.name
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Genres;
