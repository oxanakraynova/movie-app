import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import NavHeading from "../Layout/NavHeading";

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavHeading />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
