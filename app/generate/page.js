"use client";

import { useUser } from "@clerk/nextjs";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation"; // Changed to next/navigation
import { useState } from "react";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore"; // Firebase Firestore imports
import { db } from "@/utils/firebase"; // Import your Firebase configuration

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcard] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('Google API Key:', process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Send JSON payload
      });

      if (!res.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await res.json();
      setFlashcard(data.flashcards || []);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashCards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with the same name already exists");
        return;
      } else {
        collections.push(name);
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Generate Flashcards</Typography>
        <Paper
          sx={{ p: 4, width: "100%" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Generate
            </Button>
          </Box>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Flashcard Preview</Typography>
          <Box>
            {flashcards.map((card, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">Front: {card.front}</Typography>
                <Typography variant="body1">Back: {card.back}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}
