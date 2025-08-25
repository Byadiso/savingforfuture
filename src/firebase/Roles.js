
import { initializeApp } from "firebase/app";
import { app, auth, firestore as db } from "./Firebase";
import { ADMIN_KEY } from "./CONSTANTS";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


export const updateUserRole = async (uid, role) => {
  // Allowed roles
  const allowedRoles = ["admin", "normal", "finance"];

  if (!allowedRoles.includes(role)) {
    throw new Error(`Invalid role: ${role}. Allowed roles are ${allowedRoles.join(", ")}`);
  }

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // Update if user already exists in Firestore
    await updateDoc(userRef, { role });
  } else {
    // Create doc if not yet present
    await setDoc(userRef, { role }, { merge: true });
  }

  return `Role for user ${uid} updated to ${role}`;
};

// Get user role from Firestore
export const getUserRole = async (userUID) => {
  const userRef = doc(db, "users", userUID);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    return data.role || "normal"; // default to normal
  }
  return "normal"; // fallback if no doc
};

export const checkIfAdminUser = async (userUID) => {
  if (!userUID) return false; // <-- safeguard
  const role = await getUserRole(userUID);
  return role === "admin";
};

// Check if finance
export const checkIfFinanceUser = async (userUID) => {
  if (!userUID) return false; // <-- safeguard
  const role = await getUserRole(userUID);
  return role === "finance";
};


// Check if normal
export const checkIfNormalUser = async (userUID) => {
  const role = await getUserRole(userUID);
  return role === "normal";
};
