"use client";

import { db } from "@/utils/firebase";
import { useUser } from "@clerk/nextjs";
import { Container, Grid } from "@mui/material";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards()
  }, [user]);

  if(!isLoaded || !isSignedIn){
    return <></>
  }

  const handleCardClick =(id) =>{
    router.push(`/flashcard?id=${id}`)
  }

  return( <Container maxWidth="false">
  <Grid>

  </Grid>

  </Container>)
}
