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
  let lastUser = null;

  return (
    <Box ref={listRef} className="message-list">
      <Stack spacing={1}>
        {messages.map((msg) => {
          const showHeader = msg.username !== lastUser;
          lastUser = msg.username;

          return (
            <MessageItem
              key={msg.id}
              msg={msg}
              formatDate={formatDate}
              onUpdate={onUpdate}
              onDelete={onDelete}
              showHeader={showHeader}
            />
          );
        })}
        <div ref={bottomRef} />
      </Stack>
    </Box>
  );
}
