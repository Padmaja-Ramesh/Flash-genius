"use client";

import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { getStripe } from "@/utils/get-stripe";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const handleSubmit = async (plan) => {
    try {
      console.log("button clicked", plan);
      const response = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "origin":"https://flash-genius-flashcard.vercel.app/"
        },
        body: JSON.stringify({ plan }), // Ensure correct body format
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const checkoutSessionJson = await response.json();

      if (checkoutSessionJson.error) {
        console.error(checkoutSessionJson.error);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error); // Added for debugging
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <Head>
          <title>Flash Genius: Battle Your Knowledge</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>

        {/* Hero Section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 5, mb: 5 }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Text Section */}
            <Grid item xs={12} md={6}>
              <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h2" gutterBottom>
                  Welcome to Flash Genius
                </Typography>
                <Typography variant="h5" gutterBottom>
                  The Easiest Way to Make Flashcards from Your Text
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="/generate"
                  sx={{ mt: 3 }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>

            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "100%" }}
              >
                <Image
                  src="/images/hero.png" // Replace with your image path
                  alt="Flash Genius Hero Image"
                  layout="responsive" // or "fill" based on your needs
                  width={600} // Adjust as needed
                  height={400} // Adjust as needed
                  style={{ objectFit: "cover" }} // Ensures the image covers the area
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            gutterBottom
          >
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography textAlign="center" gutterBottom>
                  Smart Flashcards
                </Typography>
                <Typography>
                  A better way to study with flashcards is here. Flash Genius
                  makes it simple to create your own flashcards, study those of
                  a classmate, or search our archive of millions of flashcard
                  decks from other students.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography textAlign="center" gutterBottom>
                  Accessible Anywhere
                </Typography>
                <Typography>
                  Take your flashcards anywhere with FlashGenius’s free app. Use
                  swipe mode to review flashcards quickly and make learning more
                  engaging. Swipe right if you know it, swipe left if you don’t
                  — and learn what you need to focus on.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography textAlign="center" gutterBottom>
                  Easy Text Input
                </Typography>
                <Typography>
                  Creating your own set of flashcards is simple with our free
                  flashcard maker — just add a term and definition.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Certification Prep Section */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }} // Responsive layout
          alignItems="center"
          justifyContent="center"
          textAlign={"center"}
          m={"5px"}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: { xs: 4, md: 0 }, // Margin bottom for small screens
            }}
          >
            <Image
              src="/images/certification-images.png" // Path to your image
              alt="Certification Prep"
              layout="responsive" // Makes the image responsive
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" }, // Text alignment
              px: 3, // Padding for better spacing
             
            }}

            display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          >
            <Typography variant="h4" gutterBottom>
              Accelerate Your Certification
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }} gutterBottom>
              At FlashGenius, we know that software developers need to pass
              their certification exams quickly and efficiently. Our platform
              provides tailored resources and study tools designed to streamline
              your preparation. With our smart flashcards and focused content,
              you can minimize your study time and maximize your performance,
              helping you achieve your certification goals faster.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/generate"
              sx={{ display: "block", mx: "auto" }}
            >
              Start Preparing
            </Button>
          </Box>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Basic Plan */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Basic
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Free
                </Typography>
                <Typography>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit("basic")}
                  sx={{ mt: 2 }}
                >
                  Choose Basic
                </Button>
              </Box>
            </Grid>

            {/* Pro Plan */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Pro
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginRight: "8px",
                    }}
                  >
                    $15
                  </span>
                  $12 / month
                </Typography>
                <Typography>
                  Unlimited flashcard features and storage, with priority
                  support.
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  <strong>Special Offer:</strong> 20% off when you subscribe for
                  3 months.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit("pro")}
                  sx={{ mt: 2 }}
                >
                  Choose Pro
                </Button>
              </Box>
            </Grid>

            {/* Premium Plan */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Premium
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $20 / month
                </Typography>
                <Typography>
                  All Pro features plus additional premium benefits like
                  personalized coaching and advanced analytics.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit("premium")}
                  sx={{ mt: 2 }}
                >
                  Choose Premium
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
