import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, TextField, IconButton } from "@mui/material";
import { Props } from "../Movies/MovieList";

const SearchField = (props: Props) => {
  return (
    <>
      <form noValidate autoComplete="off">
        <FormControl sx={{ width: "25ch" }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={props.searchTerm}
            onChange={props.onChange}
            sx={{
              "& .MuiInputLabel-root, & .MuiOutlinedInput-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": { border: "1px solid white" },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "&:hover:not($focused):not(:active) fieldset": {
                borderColor: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
              },
              endAdornment: (
                <IconButton size="small" sx={{ color: "white" }}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </FormControl>
      </form>
    </>
  );
};

export default SearchField;
