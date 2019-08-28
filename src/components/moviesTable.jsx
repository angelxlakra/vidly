import React from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

const MoviesTable = ({ movies, onLike, onDelete, onSort, sortColumn }) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onLike={() => onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={movies}
    />
  );
};

export default MoviesTable;
