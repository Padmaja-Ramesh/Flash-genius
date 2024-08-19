import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth={false}>
      <Head>
        <title>Flash Genius: Battle Your Knowledge</title>
        <meta name="description" content="create flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar style={{display:'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" style={{ flexFlow: 1 }}>Flash Genius</Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <SignedOut>
            <Button color="inherit" href="/signin">Login</Button>
            <Button color="inherit" href="/signup">Sign Up</Button>
          </SignedOut>
          <SignedIn><UserButton /></SignedIn>
          </div> 
        </Toolbar>
      </AppBar>
{/* Hero Section */}
      <Box display="flex" flexDirection="column" alignItems="center" >
      <Typography variant="h2">Welcome to Flash Genius</Typography>
      <Typography variant="h5"> The Easiest way to make flashcards from your text</Typography>
      <Button variant="contained" color="primary">Get Started</Button>
      </Box>

{/* feature Section */}
      <Box >
      <Typography variant="h4" components="h2">Features</Typography>
      <Grid contained spacing={4}>
        <Grid items xs={12} ms={4}>

        </Grid>
      </Grid>
        
      </Box>
    </Container>
  );
}
