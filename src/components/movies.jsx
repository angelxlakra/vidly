import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    currentGenre: "All Genres",
    genres: [],
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      currentGenre,
      sortColumn
    } = this.state;
    let movies = [...allMovies];
    if (currentGenre !== "All Genres") {
      movies = allMovies.filter(movie => currentGenre === movie.genre.name);
    }
    const flength = movies.length;

    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

    movies = paginate(sorted, currentPage, pageSize);
    return { allcount: flength, data: movies, flength };
  };

  render() {
    let { length: count } = this.state.movies;
    const { genres, currentGenre, sortColumn } = this.state;
    if (count === 0) return <p>No Movies in the database!</p>;

    const { allcount, data: movies } = this.getPagedData();

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
            <p>Showing {allcount} movies in the database!</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={allcount}
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
