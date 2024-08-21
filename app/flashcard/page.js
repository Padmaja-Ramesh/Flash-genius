"use client";

import { db } from "@/utils/firebase";
import { useUser } from "@clerk/nextjs";
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import { collection, doc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [ flashcards, setFlashcards ] = useState([]);
  const [flipped, setFlipped] = useState([]);
  //catch params to use for the search
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  console.log("search ", search)
  console.log(user)

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const falshcards = [];

      docs.forEach((doc) => {
        falshcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(falshcards);
    }
    getFlashcard();
  }, [user, search]);


  const handleCardClick = (id) =>{
    setFlipped((prev) =>({
        ...prev,
        [id]: !prev[id],
    }))
  }

  if(!isLoaded || !isSignedIn){
    return <></>
  }

  return (
    <Container maxWidth="false">
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
    </Container>
  )
}
