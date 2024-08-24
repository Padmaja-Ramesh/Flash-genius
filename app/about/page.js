"use client";

import { Container, Typography, Box, Grid } from "@mui/material";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h2" gutterBottom textAlign="center">
          Achieve Certification Faster
        </Typography>
        <Typography variant="body1" paragraph textAlign="center">
          At FlashGenius, we understand the unique challenges faced by software
          developers aiming to attain certification quickly. Our platform is
          designed to streamline your learning process, providing targeted tools
          and resources to help you master key concepts efficiently. With our
          support, you can reduce study time and confidently achieve your
          certification goals in a shorter timeframe.
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Impact Report
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" color="primary">
                  1 million
                </Typography>
                <Typography variant="body2">monthly learners</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" color="primary">
                  100+
                </Typography>
                <Typography variant="body2">study sets</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" color="primary">
                  7 in 10
                </Typography>
                <Typography variant="body2">
                  US software developers use FlashGenius
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h4" gutterBottom textAlign="center">
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph textAlign="center">
          A study tool to ace your software certification.
        </Typography>

        <Typography variant="h4" gutterBottom textAlign="center">
          Our Story
        </Typography>
        <Typography variant="body1" paragraph textAlign="center">
          FlashGenius was developed as part of Headstarter - Project for Track -
          B, focusing on delivering innovative learning solutions that cater to
          diverse developers needs.
        </Typography>
      </Container>
      <Footer />
    </>
  );
}
