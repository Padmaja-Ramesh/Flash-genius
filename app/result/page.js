"use client";

import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Result() {
  const router = useRouter();
  //catch params to use for the search
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occured");
      } finally {
        setLoading(false);
      }
    };

    fetCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="false" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6">loading....</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="false" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">{error}</Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="false" sx={{ textAlign: "center", mt: 4 }}>
      <h1>Result page</h1>
      {session.payment_status === "paid" ? (
        <>
          <Typography variant="h4">Thank you purchasing..</Typography>
          <Box>
            <Typography variant="h6">SessionId: {session_id}</Typography>
            <Typography variant="body1">
              we have received your payment. you will receive an email with the
              order details shortly.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">Payment failed..</Typography>
          <Box>
            <Typography variant="h6">SessionId: {session_id}</Typography>
            <Typography variant="body1">
              Try again later
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
}
