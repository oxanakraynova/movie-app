import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./Movies/MovieDetails";
import MovieList from "./Movies/MovieList";

const router = createHashRouter([
  {
    path: "/film/:movieId",
    element: <MovieDetails />,
  },
  {
    path: "/",
    element: <MovieList />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
