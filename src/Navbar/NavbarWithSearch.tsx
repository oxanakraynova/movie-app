import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import { Props } from "../Movies/MovieList";
import NavHeading from "./NavHeading";
import SearchField from "./SearchField";

function NavbarWithSearch(props: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <NavHeading />
          <SearchField
            searchTerm={props.searchTerm}
            onChange={props.onChange}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarWithSearch;
