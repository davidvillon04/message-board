import { Box, Stack } from "@mui/material";
import MessageItem from "./MessageItem";

export default function MessageList({
  messages,
  listRef,
  bottomRef,
  formatDate,
  onUpdate,
  onDelete,
}) {
  return (
    <Box
      ref={listRef}
      flex={1}
      overflow="auto"
      p={2}
      sx={{ position: "relative" }}
      className="message-list"
    >
      <Stack spacing={2}>
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            msg={msg}
            formatDate={formatDate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
        <div ref={bottomRef} />
      </Stack>
    </Box>
  );
}
