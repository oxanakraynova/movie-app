import { Container, Grid, Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarWithSearch from "../Navbar/NavbarWithSearch";
import Loading from "../UI/Loading";
import MovieCard from "./MovieCard";
import { API_BASE_URL, API_KEY } from "./MovieDetails";

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
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

  const fetchSearchMovies = async (page: number, searchTerm?: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/?page=${page}&apikey=${API_KEY}&s=${searchTerm}`
      );
      const movieData: Movie[] = response.data.Search || [];
      setMovies(movieData);
      setTotalPages(Math.ceil(response.data.totalResults / 25));
    } catch (error) {
      console.error("Error fetching movie information", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchSearchMovies(currentPage, searchTerm);
    } else {
      fetchMovies(currentPage);
    }
  }, [currentPage, searchTerm]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavbarWithSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
            <Grid container spacing={4}>
              {movies.map((movie) => (
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
              ))}
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
      )}
    </>
  );
};

export default MovieList;
