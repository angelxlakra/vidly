import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    currentGenre: "All Genres",
    genres: []
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies, genres });
  }

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
    this.setState({ currentGenre: genre, currentPage: 1 });
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
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreChange}
              currentItem={currentGenre}
            />
          </div>
          <div className="col">
            <p>Showing {count} movies in the database!</p>
            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
            />
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
