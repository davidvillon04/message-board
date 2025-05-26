import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function MessageInput({
  username,
  message,
  onUsernameChange,
  onMessageChange,
  onSend,
}) {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      display="flex"
      alignItems="center"
      p={2}
      gap={2}
    >
      <TextField label="Username" value={username} onChange={onUsernameChange} variant="filled" />
      <TextField
        label="Message"
        value={message}
        onChange={onMessageChange}
        variant="filled"
        fullWidth
      />
      <Button type="submit" variant="contained">
        <SendIcon />
      </Button>
    </Box>
  );
}
