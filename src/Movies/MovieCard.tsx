import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Movie } from "./MovieList";

const MovieCard: React.FC<Movie> = ({ Poster, Title, imdbID, Year }) => {
  return (
    <Card
      sx={{
        width: "15rem",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: "20rem",
          width: "15rem",
          objectFit: "fill",
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
          <Typography variant="body1" noWrap>
            {Title}
          </Typography>
        </NavLink>
        <Typography variant="body2" sx={{ pt: 1 }}>
          {Year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
