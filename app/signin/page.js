import { SignIn } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function SignInPage() {
  return (
    <Container maxWidth={false}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" >Flash Genius</Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" href="/signin" passhref="true">
                Login
            </Button>
            <Button color="inherit" href="/signup" passhref="true">
                Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" gutterBottom> Sign In </Typography>
        <SignIn routing="path" path="/signin" />
      </Box>
    </Container>
  );
}
