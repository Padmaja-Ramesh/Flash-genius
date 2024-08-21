"use client";

import { useUser } from "@clerk/nextjs";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation"; // Changed to next/navigation
import { useEffect, useState } from "react";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore"; // Firebase Firestore imports
import { db } from "@/utils/firebase"; // Import your Firebase configuration

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }), // Send JSON payload
    });

    const data = await res.json();
    setFlashcards(data.flashcards); // Assuming the API response contains a "flashcards" key
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
  
    let collections = [];
  
    if (docSnap.exists()) {
      collections = docSnap.data().flashcards || [];
      const normalizedInputName = name.trim().toLowerCase();
  console.log(collections.some(f => (f.name || '').trim().toLowerCase() === normalizedInputName))
      if (collections.some(f => (f.name || '').trim().toLowerCase() === normalizedInputName)) {
        alert("Flashcard collection with the same name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }
  
    if (flashcards.length === 0) {
      alert("No flashcards to save");
      return;
    }
  
    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
  
    try {
      await batch.commit();
      handleClose();
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };
  
  

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexdirection: "column",
          alignitems: "center",
        }}
      >
        <Typography variant="h4">Generate Flashcards</Typography>
        <Paper
          sx={{ p: 4, width: "100%" }}
          display="flex"
          flexdirection="column"
          alignitems="center"
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
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },
                          "& > div > div": {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },
                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              {" "}
              save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> save flashcard</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="collection name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> cancel</Button>
          <Button onClick={saveFlashCards}>save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
