import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../Layout/Layout";
import Loading from "../UI/Loading";

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const API_KEY = "33a57862";
  const API_BASE_URL = "http://www.omdbapi.com";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/?apikey=${API_KEY}&s=${searchTerm}`
        );
        const movieData: Movie[] = response.data.Search || [];
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    if (searchTerm) {
      const timeoutId = setTimeout(() => {
        fetchMovies();
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Layout>
        <Typography variant="h4" gutterBottom>
          Movie App
        </Typography>
        <TextField
          label="Enter 3 characters or more for searching."
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
          value={searchTerm}
          sx={{ mb: 3, mt: 3 }}
        />
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid
                item
                key={movie.imdbID}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ marginRight: 4 }}
              >
                <Card sx={{ height: "30rem", width: "19rem" }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: "25rem",
                      objectFit: "contain",
                    }}
                    image={movie.Poster}
                    alt={movie.Title}
                  />
                  <CardContent>
                    <NavLink
                      to={`/film/${movie.imdbID}`}
                      color="inherit"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        variant="h6"
                        display="flex"
                        justifyContent="center"
                      >
                        {movie.Title}
                      </Typography>
                    </NavLink>
                    <Typography
                      variant="body1"
                      display="flex"
                      justifyContent="center"
                    >
                      {movie.Year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Layout>
    </>
  );
};

export default MovieList;
