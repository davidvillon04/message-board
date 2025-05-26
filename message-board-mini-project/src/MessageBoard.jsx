import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box } from "@mui/material";

// Import components
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import ScrollToBottom from "./components/ScrollToBottom";

const API = "http://localhost:5000";
const SCROLL_THRESHOLD = 20; // pixels from bottom to trigger auto-scroll

export default function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  const listRef = useRef(null);
  const bottomRef = useRef(null);

  // fetch all posts and show newest at bottom
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      setMessages(res.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  const updateMessage = async (id, newText) => {
    try {
      await axios.put(`${API}/posts/${id}`, { message: newText });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${API}/posts/${id}`);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch messages on mount and set up polling
  useEffect(() => {
    fetchMessages();
    const iv = setInterval(fetchMessages, 1000);
    return () => clearInterval(iv);
  }, []);

  // Only auto-scroll when enabled
  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [messages, autoScroll]);

  // Watch manual scrolling to toggle auto-scroll
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = listEl;
      const isAtBottom = scrollHeight - (scrollTop + clientHeight) < SCROLL_THRESHOLD;
      setAutoScroll(isAtBottom);
    };

    listEl.addEventListener("scroll", onScroll);
    return () => listEl.removeEventListener("scroll", onScroll);
  }, []);

  // Handle sending a new message
  const handleSend = async () => {
    if (!username.trim() || !message.trim()) return;

    try {
      await axios.post(`${API}/posts`, { username, message });
      setMessage("");
      if (autoScroll) bottomRef.current.scrollIntoView();
    } catch (err) {
      console.error(err);
    }
  };

  // Parse Firestore timestamp
  const formatDate = (ts) => {
    if (!ts) return "";
    const secs = ts.seconds ?? ts._seconds;
    return new Date(secs * 1000).toLocaleString();
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* Message list */}
      <MessageList
        messages={messages}
        listRef={listRef}
        bottomRef={bottomRef}
        formatDate={formatDate}
        onUpdate={updateMessage}
        onDelete={deleteMessage}
      />

      {/* “Scroll to bottom” button */}
      {!autoScroll && (
        <ScrollToBottom
          onClick={() => {
            bottomRef.current?.scrollIntoView();
            setAutoScroll(true);
          }}
        />
      )}

      {/* Input form */}
      <MessageInput
        username={username}
        message={message}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onMessageChange={(e) => setMessage(e.target.value)}
        onSend={handleSend}
      />
    </Box>
  );
}
