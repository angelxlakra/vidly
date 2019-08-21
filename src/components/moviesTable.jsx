import React, { Component } from "react";
import Like from "./common/like";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  state = {};

  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;

    const columns = [
      { path: "title", label: "Title" },
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
      <table className="table table-striped">
        <TableHead columns={columns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody data={movies} columns={columns} />
      </table>
    );
  }
}

export default MoviesTable;
