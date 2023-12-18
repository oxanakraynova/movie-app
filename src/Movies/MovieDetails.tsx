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

interface Details {
  Rated: string;
  Released: string;
  Country: string;
  Director: string;
  Plot: string;
  Actors: string;
  Title: string;
  Poster: string;
}

export const API_KEY = "33a57862";
export const API_BASE_URL = "https://www.omdbapi.com";

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

function MovieDetails() {
  const { movieId } = useParams<{ movieId: string }>();
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/?i=${movieId}&apikey=${API_KEY}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <>
      <Layout>
        {loading ? (
          <Loading />
        ) : (
          details && (
            <Grid container display="flex" alignItems="flex-start" spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CardMedia
                  component="img"
                  sx={{
                    height: 400,
                    objectFit: "contain",
                  }}
                  image={details!.Poster}
                  alt={details!.Title}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={8} lg={9}>
                <Typography variant="h4" gutterBottom>
                  {details!.Title}
                </Typography>
                <CustomRow label="Rated" value={details!.Rated} />
                <CustomRow label="Released" value={details!.Released} />
                <CustomRow label="Country" value={details!.Country} />
                <CustomRow label="Director" value={details!.Director} />
                <CustomRow label="Actors" value={details!.Actors} />
                <CustomRow label="About" value={details!.Plot} />
              </Grid>
            </Grid>
          )
        )}
      </Layout>
    </>
  );
}

export default MovieDetails;
