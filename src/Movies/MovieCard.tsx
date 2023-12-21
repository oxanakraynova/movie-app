import React, { Fragment } from "react";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Movie } from "./MovieList";

const MovieCard: React.FC<Movie> = ({ Poster, Title, imdbID, Year }) => {
  return (
    <Fragment>
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
          <Typography variant="body1" gutterBottom>
            {Title}
          </Typography>
        </NavLink>
        <Typography variant="body2" gutterBottom>
          {Year}
        </Typography>
      </CardContent>
    </Fragment>
  );
};

export default MovieCard;
