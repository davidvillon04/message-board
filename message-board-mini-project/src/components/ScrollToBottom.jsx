import { Box, Button } from "@mui/material";

export default function ScrollToBottom({ onClick }) {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Button variant="contained" size="small" onClick={onClick}>
        Scroll to bottom
      </Button>
    </Box>
  );
}
