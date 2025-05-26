import { Box, Paper, Stack, Typography } from "@mui/material";

export default function MessageList({ messages, listRef, bottomRef, formatDate }) {
  return (
    <Box ref={listRef} flex={1} overflow="auto" p={2} sx={{ position: "relative" }}>
      <Stack spacing={2}>
        {messages.map((msg) => (
          <Paper key={msg.id} sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              {msg.username} • {formatDate(msg.createdAt)}
            </Typography>
            <Typography variant="body1">{msg.message}</Typography>
          </Paper>
        ))}
        <div ref={bottomRef} />
      </Stack>
    </Box>
  );
}
