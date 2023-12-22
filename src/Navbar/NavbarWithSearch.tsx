import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import NavHeading from "./NavHeading";

import SearchField, { Props } from "./SearchField";

function NavbarWithSearch(props: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <NavHeading />
          <SearchField
            searchTerm={props.searchTerm}
            setSearchTerm={props.setSearchTerm}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarWithSearch;
