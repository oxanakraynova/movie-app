import { Grid, Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
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
  // const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         `${API_BASE_URL}/?s=movie&type=movie&page=1&r=25&apikey=${API_KEY}`
  //       );
  //       const movieData: Movie[] = response.data.Search || [];
  //       setMovies(movieData);
  //     } catch (error) {
  //       console.error("Error fetching movie information", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  const fetchMovies = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/?s=movie&type=movie&page=${page}&r=25&apikey=${API_KEY}`
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
    fetchMovies(currentPage);
  }, [currentPage]);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         // `${API_BASE_URL}/?apikey=${API_KEY}&s=${searchTerm}`
  //         `${API_BASE_URL}/?s=&type=movie&page=1&apikey=${API_KEY}`
  //       );
  //       const movieData: Movie[] = response.data.Search || [];
  //       setMovies(movieData);
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMovies();

  //   if (searchTerm) {
  //     const timeoutId = setTimeout(() => {
  //       fetchMovies();
  //     }, 500);

  //     return () => clearTimeout(timeoutId);
  //   } else {
  //     setMovies([]);
  //   }
  // }, [searchTerm]);
  // });

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  return (
    <>
      <Layout>
        {/* <TextField
          label="Enter 3 characters or more for searching."
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
          value={searchTerm}
          sx={{ mb: 3, mt: 3 }}
        /> */}
        {loading ? (
          <Loading />
        ) : (
          <>
            <Grid container spacing={4}>
              {movies.map((movie) => (
                <Grid
                  item
                  key={movie.imdbID}
                  xs={12}
                  sm={5}
                  md={4}
                  lg={2}
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
          </>
        )}
      </Layout>
    </>
  );
};

export default MovieList;
