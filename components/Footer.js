import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        p: 2,
        mt: 6,
        textAlign: "center",
      }}
    >
      <Typography variant="body1">© 2024 FlashGenius</Typography>
      <Typography variant="body2">All rights reserved.</Typography>
    </Box>
  );
}
