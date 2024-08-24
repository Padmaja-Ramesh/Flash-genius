import { useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {/* Remove <a> tag and let Link handle it */}
          <Button color="inherit" component={Link} href="/">
          FlashGenius
          </Button>
        </Box>
        <Box>
          <Button color="inherit" component={Link} href="/about">
            About Us
          </Button>
          <Button color="inherit" component={Link} href="/flashcards">
            Flashcards
          </Button>
          {mounted && (
            <>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button color="inherit" component={Link} href="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} href="/signup">
                  Signup
                </Button>
              </SignedOut>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
