import { Box, Paper, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}>
      <Paper
        sx={{
          width: "300px",
          height: "200px",
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography>Home</Typography>
      </Paper>
    </Box>
  );
}
