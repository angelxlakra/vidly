import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    currentGenre: "All Genres",
    searchQuery: "",
    genres: [],
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has Already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
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
    this.setState({ currentGenre: genre, currentPage: 1, searchQuery: null });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      currentGenre: "All Genres",
      searchQuery: query,
      currentPage: 1
    });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      currentGenre,
      sortColumn,
      searchQuery
    } = this.state;
    let movies = [...allMovies];

    if (searchQuery) {
      movies = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (currentGenre !== "All Genres") {
      movies = allMovies.filter(movie => currentGenre === movie.genre.name);
    }
    const flength = movies.length;

    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

    movies = paginate(sorted, currentPage, pageSize);
    return { allcount: flength, data: movies, flength };
  };

  render() {
    let { length: count } = this.state.movies;
    const { genres, currentGenre, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
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
            {user && (
              <Link
                className="btn btn-primary"
                to="/movies/new"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}
            <p>Showing {allcount} movies in the database!</p>
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
            ></SearchBox>
            <MoviesTable
              user={user}
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
