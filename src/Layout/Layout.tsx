import { Container, CssBaseline } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
