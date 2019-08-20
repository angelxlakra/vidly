import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import Genres from "./genres";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
    currentGenre: "All Genres",
    genres: getGenres()
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ currentGenre: genre });
  };

  render() {
    let { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genres,
      currentGenre
    } = this.state;
    if (count === 0) return <p>No Movies in the database!</p>;
    let movies = [...allMovies];
    if (currentGenre !== "All Genres") {
      movies = allMovies.filter(movie => currentGenre === movie.genre.name);
      count = movies.length;
    }
    movies = paginate(movies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <Genres
              genres={genres}
              onGenreSelect={this.handleGenreChange}
              currentGenre={currentGenre}
            />
          </div>
          <div className="col">
            <p>Showing {count} movies in the database!</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onLike={() => this.handleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={count}
              onPageChange={this.handlePageChange}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
