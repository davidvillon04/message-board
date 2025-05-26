// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require("firebase/firestore");

// const serviceAccount = require("./permissions.json");

// const app = initializeApp(serviceAccount);
// const db = getFirestore(app);

// module.exports = db;

const admin = require("firebase-admin");

const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
