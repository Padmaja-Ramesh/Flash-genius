import { SignUp } from "@clerk/nextjs";
import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
  } from "@mui/material";

export default function SignUpPage() {
  return (
    <Container maxWidth={false}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Flash Genius</Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" href="/signin" passHref>
              Login
            </Button>
            <Button color="inherit" href="/signup" passHref>
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" gutterBottom> Sign Up </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
