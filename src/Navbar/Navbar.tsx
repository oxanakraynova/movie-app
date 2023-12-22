import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import NavHeading from "./NavHeading";

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <NavHeading />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
