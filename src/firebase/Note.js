import { firestore } from "./Firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Create a new note
export const createNote = async (userId, note) => {
  const notesRef = collection(firestore, "notes");
  await addDoc(notesRef, {
    ...note,
    userId,
    createdAt: new Date(),
  });
};

// Read all notes for a user
export const readNotes = async (userId) => {
  const notesRef = collection(firestore, "notes");
  const snapshot = await getDocs(notesRef);
  const notes = {};

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.userId === userId) {
      notes[docSnap.id] = data;
    }
  });

  return notes;
};

// Edit a note
export const editNote = async (userId, noteId, updatedNote) => {
  const noteRef = doc(firestore, "notes", noteId);
  await updateDoc(noteRef, {
    ...updatedNote,
    updatedAt: new Date(),
  });
};

// Delete a note
export const deleteNote = async (userId, noteId) => {
  const noteRef = doc(firestore, "notes", noteId);
  await deleteDoc(noteRef);
};
