import { Container, Grid, Pagination, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavbarWithSearch from "../Navbar/NavbarWithSearch";
import Loading from "../UI/Loading";
import MovieCard from "./MovieCard";
import { API_BASE_URL, API_KEY } from "./MovieDetails";
import { debounce } from "lodash";

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

export interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/?s=movie&type=movie&page=${page}&r=10&apikey=${API_KEY}`
      );
      const movieData: Movie[] = response.data.Search || [];
      setMovies(movieData);
      setTotalPages(Math.ceil(response.data.totalResults / 10));
    } catch (error) {
      console.error("Error fetching movie information", error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = useRef(
    debounce(async (searchTerm: string, page?: number) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/?page=${page}&apikey=${API_KEY}&s=${searchTerm}`
        );
        const movieData: Movie[] = response.data.Search || [];
        setMovies(movieData);
        setTotalPages(Math.ceil(response.data.totalResults / 10));
      } catch (error) {
        console.error("Error searching movie information", error);
      } finally {
        setLoading(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    if (searchTerm.length >= 3) {
      searchMovies(searchTerm, currentPage);
    } else if (searchTerm.length === 0) {
      fetchMovies(currentPage);
    }
  }, [currentPage, searchTerm]);

  const currentMoviesList = movies.map((movie) => (
    <Grid
      item
      key={movie.imdbID}
      xs={12}
      sm={5}
      md={4}
      lg={3}
      sx={{ marginRight: 10 }}
    >
      <MovieCard
        imdbID={movie.imdbID}
        Title={movie.Title}
        Poster={movie.Poster}
        Year={movie.Year}
      />
    </Grid>
  ));

  let content;

  if (searchTerm.length >= 1 && searchTerm.length < 3) {
    content = (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: "10rem" }}
      >
        <Typography variant="h6" gutterBottom>
          Enter at least 3 characters for searching.
        </Typography>
      </Grid>
    );
  } else if (!loading && searchTerm.length > 0 && movies.length === 0) {
    content = (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: "10rem" }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >{`No matches for "${searchTerm}".`}</Typography>
      </Grid>
    );
  } else if (!loading && movies.length > 0) {
    content = currentMoviesList;
  } else if (loading) {
    content = <Loading />;
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <NavbarWithSearch searchTerm={searchTerm} onChange={handleSearchChange} />
      <Container maxWidth="lg" style={{ marginTop: "6rem" }}>
        <Grid container spacing={4}>
          {content}
        </Grid>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="secondary"
          sx={{
            mt: "3rem",
            mb: "3rem",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Container>
    </>
  );
};

export default MovieList;
