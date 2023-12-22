import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Movie } from "./MovieList";

const MovieCard: React.FC<Movie> = ({ Poster, Title, imdbID, Year }) => {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardMedia
        component="img"
        sx={{
          height: "80%",
          objectFit: "cover",
        }}
        image={Poster}
        alt={Title}
      />
      <CardContent>
        <NavLink
          to={`/film/${imdbID}`}
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          <Typography variant="body1" gutterBottom noWrap>
            {Title}
          </Typography>
        </NavLink>
        <Typography variant="body2" gutterBottom>
          {Year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
