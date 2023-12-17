import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./Movies/MovieDetails";
import MovieList from "./Movies/MovieList";

const router = createBrowserRouter([
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
