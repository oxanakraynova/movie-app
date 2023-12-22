import { IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function NavHeading() {
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
      </Typography>
    </>
  );
}

export default NavHeading;
