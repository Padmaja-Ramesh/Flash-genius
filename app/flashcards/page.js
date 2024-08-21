"use client";

import { db } from "@/utils/firebase";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter(); // Import and initialize the router

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
        } else {
          console.log("No user document found.");
          setFlashcards([]);
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
  
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (name) => {
    router.push(`/flashcard?id=${name}`);
  };

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea
                onClick={() => handleCardClick(flashcard.name)} // Pass the correct id
              >
                <CardContent>
                  <Typography variant="h6">{flashcard.name}</Typography> {/* Access name from flashcard */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
