const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
const db = require("./firebase");

// GET /posts - Fetch all posts
router.get("/", async (req, res) => {
  try {
    const postsRef = await db.collection("posts").orderBy("createdAt", "desc").get();
    const posts = postsRef.docs.map((d) => ({ id: d.id, ...d.data() }));

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
    const docRef = await db.collection("posts").add({
      username,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
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
    await db.collection("posts").doc(req.params.id).update({ message: req.body.message });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update post" });
  }
});

// DELETE /posts/:id - Delete a post
router.delete("/:id", async (req, res) => {
  try {
    await db.collection("posts").doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete post" });
  }
});

module.exports = router;
