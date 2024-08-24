"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { db } from "@/utils/firebase";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.id);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const flashcards = userDocSnap.data().flashcards || [];
          console.log("User's flashcards:", flashcards);
          setFlashcards(flashcards);
          setFilteredFlashcards(flashcards); // Set initial filtered list
        } else {
          console.log("No user document found.");
          setFlashcards([]);
          setFilteredFlashcards([]);
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }

    getFlashcards();
  }, [user]);

  useEffect(() => {
    const result = flashcards.filter(flashcard =>
      flashcard.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFlashcards(result);
  }, [searchTerm, flashcards]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (name) => {
    router.push(`/flashcard?id=${name}`);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <Box sx={{ mb: 4, mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TextField
            label="Search Flashcards"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 2, flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSearchTerm(searchTerm)} // Just update the searchTerm
            sx={{ height: '56px' }}
          >
            Search
          </Button>
        </Box>
        <Grid container spacing={3}>
          {filteredFlashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea
                  onClick={() => handleCardClick(flashcard.name)}
                >
                  <CardContent>
                    <Typography variant="h6">{flashcard.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
