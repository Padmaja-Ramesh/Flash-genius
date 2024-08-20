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

export default function Home() {
  return (
    <Container maxWidth={false}>
      <Head>
        <title >Flash Genius: Battle Your Knowledge</title>
        <meta name="description" content="create flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" style={{ flexFlow: 1 }} gutterBottom>
            Flash Genius
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SignedOut>
              <Button color="inherit" href="/signin">
                Login
              </Button>
              <Button color="inherit" href="/signup">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Toolbar>
      </AppBar>
      {/* Hero Section */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h2" gutterBottom>Welcome to Flash Genius</Typography>
        <Typography variant="h5">
          {" "}
          The Easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" href="/generate">
          Get Started
        </Button>
      </Box>

      {/* feature Section */}
      <Box>
        <Typography variant="h4" components="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom>smart flashcard</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom>accessible anywhere</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom>Easy text Input</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing section */}
      <Box>
        <Typography variant="h4" textAlign="center" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                display:"flex",
                 flexDirection:"column" ,
                 alignItems:"center"
              }}
            >
              <Typography variant="h5" gutterBottom >Basic</Typography>
              <Typography variant="h6" gutterBottom>Free</Typography>
              <Typography>{' '} Access to basic flashcard features and limited storage.</Typography>
              <Button variant="contained" color="primary">choose basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
          <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                display:"flex",
                 flexDirection:"column" ,
                 alignItems:"center"
              }}
            >
              <Typography variant="h5" gutterBottom textAlign="center">Pro</Typography>
              <Typography variant="h6" gutterBottom textAlign="center">$10 / month</Typography>
              <Typography>{' '} unlimited flashcard features and storage, with priority support.</Typography>
              <Button variant="contained" color="primary"  >choose pro</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>Easy text Input</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
