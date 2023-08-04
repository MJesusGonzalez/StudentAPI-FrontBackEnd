import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";

import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVyWQktwmpApwSvuvVpgCxbQExzroNFQo",
  authDomain: "studentproject-ce40e.firebaseapp.com",
  projectId: "studentproject-ce40e",
  storageBucket: "studentproject-ce40e.appspot.com",
  messagingSenderId: "814254780934",
  appId: "1:814254780934:web:af9da1f4f7efe47d95c987",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(appFirebase);

// First Basic Message
app.get("/", (req, res) => {
  res.send("epn FIS!");
});

// READ all student
app.get("/api/read", (req, res) => {
  (async () => {
    try {
      let response = [];
      const querySnapshot = await getDocs(collection(db, "students"));
      querySnapshot.forEach((doc) => {
        const selectedItem = {
          id: doc.id,
          student: doc.data(),
        };
        response.push(selectedItem);
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// READ by ID
app.get("/api/read/:item_id", (req, res) => {
  (async () => {
    try {
      let response = [];
      const q = query(
        collection(db, "students"),
        where("ID", "==", parseInt(req.params.item_id))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const selectedItem = {
          id: doc.id,
          student: doc.data(),
        };
        response.push(selectedItem);
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// create student
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      const docRef = await addDoc(collection(db, "students"), req.body.student);
      return res.status(200).send(`Document written with ID:  ${docRef.id}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// update
app.put("/api/update/:item_id", (req, res) => {
  (async () => {
    try {
      const studentDocumentId = doc(db, "students", req.params.item_id);
      await updateDoc(studentDocumentId, req.body.student);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// delete
app.delete("/api/delete/:item_id", (req, res) => {
  (async () => {
    try {
      await deleteDoc(doc(db, "students", req.params.item_id));
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log("Server running on http://localhost:3000");
  console.log(`WebAPI listening on port ${port}`);
});
