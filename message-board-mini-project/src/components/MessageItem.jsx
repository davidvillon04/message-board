import { useState } from "react";
import { Paper, Typography, IconButton, TextField, Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MessageItem({ msg, formatDate, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(msg.message);

  return (
    <Paper className="message-card">
      {!isEditing ? (
        <>
          <Typography variant="subtitle2" gutterBottom>
            {msg.username} • {formatDate(msg.createdAt)}
          </Typography>
          <Typography variant="body1">{msg.message}</Typography>

          {/* Edit/Delete buttons, show on hover */}
          <Box className="actionButtons">
            <IconButton size="small" onClick={() => setIsEditing(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(msg.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />

          <Box mt={1} display="flex" gap={1}>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                onUpdate(msg.id, draft);
                setIsEditing(false);
              }}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setDraft(msg.message);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
}
