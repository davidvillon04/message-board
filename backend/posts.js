const express = require("express");
const router = express.Router();

const db = require("./firebase");
const {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} = require("firebase/firestore");

// GET /posts - Fetch all posts
router.get("/", async (req, res) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch posts" });
  }
});

// POST /posts - Create a new post
router.post("/", async (req, res) => {
  const { username, message } = req.body;
  if (!username || !message) return res.status(400).json({ error: "username & message required" });

  try {
    const postsRef = collection(db, "posts");
    const docRef = await addDoc(postsRef, {
      username,
      message,
      createdAt: serverTimestamp(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create post" });
  }
});

// PUT /posts/:id - Update a post
router.put("/:id", async (req, res) => {
  try {
    const postRef = doc(db, "posts", req.params.id);
    await updateDoc(postRef, { message: req.body.message });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update post" });
  }
});

// DELETE /posts/:id - Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const postRef = doc(db, "posts", req.params.id);
    await deleteDoc(postRef);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete post" });
  }
});

module.exports = router;
