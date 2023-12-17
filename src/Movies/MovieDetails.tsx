import { CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import Loading from "../UI/Loading";

interface CustomRowProps {
  label: string;
  value: string;
}

interface MovieDetails {
  Rated: string;
  Released: string;
  Country: string;
  Director: string;
  Plot: string;
  Actors: string;
  Title: string;
  Poster: string;
}

function MovieDetails() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "33a57862";
  const API_BASE_URL = "http://www.omdbapi.com";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/?i=${movieId}&apikey=${API_KEY}`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const CustomRow: React.FC<CustomRowProps> = ({ label, value }) => (
    <Grid container spacing={2}>
      <Grid item xs={1.5}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {label}:
        </Typography>
      </Grid>

      <Grid item xs={10.5}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Layout>
        {loading ? (
          <Loading />
        ) : (
          movieDetails && (
            <Grid container display="flex" alignItems="flex-start" spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CardMedia
                  component="img"
                  sx={{
                    height: 400,
                    objectFit: "contain",
                  }}
                  image={movieDetails!.Poster}
                  alt={movieDetails!.Title}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={8} lg={9}>
                <Typography variant="h4" gutterBottom>
                  {movieDetails!.Title}
                </Typography>
                <CustomRow label="Rated" value={movieDetails!.Rated} />
                <CustomRow label="Released" value={movieDetails!.Released} />
                <CustomRow label="Country" value={movieDetails!.Country} />
                <CustomRow label="Director" value={movieDetails!.Director} />
                <CustomRow label="Actors" value={movieDetails!.Actors} />
                <CustomRow label="About" value={movieDetails!.Plot} />
              </Grid>
            </Grid>
          )
        )}
      </Layout>
    </>
  );
}

export default MovieDetails;
