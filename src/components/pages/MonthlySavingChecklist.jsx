import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import { Button, Checkbox, Typography, Box } from "@mui/material";

const membersList = [
  "Alice", "Bob", "Charlie", "David", "Eva", "Frank",
  "Grace", "Helen", "Ian", "Jane", "Kyle", "Lara"
];

const currentMonthId = () => {
  const d = new Date();
  return `${d.getFullYear()}_${(d.getMonth() + 1).toString().padStart(2, "0")}`;
};

const getCurrentMonthName = () => {
  const d = new Date();
  return d.toLocaleString('default', { month: 'long', year: 'numeric' });
};

export default function MonthlySavingChecklist() {
  const [members, setMembers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load month data from Firestore
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(firestore, "savings", currentMonthId());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const storedMembers = data.members || {};

        const populated = membersList.map((name, idx) => {
          const savedEntry = storedMembers[idx];
          return {
            id: idx,
            name,
            saved: savedEntry?.saved || false,
          };
        });

        setMembers(populated);
        setCompleted(data.completed || false);
      } else {
        const initialMembers = membersList.map((name, idx) => ({
          id: idx,
          name,
          saved: false,
        }));

        const membersObj = {};
        initialMembers.forEach((m) => {
          membersObj[m.id] = { name: m.name, saved: false };
        });

        await setDoc(docRef, { members: membersObj, completed: false });
        setMembers(initialMembers);
        setCompleted(false);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  // Toggle member saved state and update Firestore
  const toggleSaved = async (id) => {
    const updatedMembers = members.map((m) =>
      m.id === id ? { ...m, saved: !m.saved } : m
    );
    setMembers(updatedMembers);

    const docRef = doc(firestore, "savings", currentMonthId());
    const membersData = {};
    updatedMembers.forEach((m) => {
      membersData[m.id] = { name: m.name, saved: m.saved };
    });

    await updateDoc(docRef, { members: membersData });
  };

  // Mark month complete
  const completeMonth = async () => {
    const docRef = doc(firestore, "savings", currentMonthId());
    await updateDoc(docRef, { completed: true });
    setCompleted(true);
  };

  const totalSaved = members.filter((m) => m.saved).length;
  const totalAmount = totalSaved * 600; // Assuming 600 PLN per saved member

  if (loading) return <Typography sx={{ color: "#222" }}>Loading...</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
        color: "#222", // default text color
      }}
    >
      {/* Current Month */}
      <Typography variant="h6" align="center" sx={{ mb: 1, color: "#222" }}>
        {getCurrentMonthName()}
      </Typography>

      {/* Total Amount */}
      <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#000" }}>
        Total Amount: {totalAmount.toLocaleString()} PLN
      </Typography>

      {/* Members Checklist */}
      <Box>
        {members.map(({ id, name, saved }) => (
          <Box
            key={id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingY: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
              color: "#222",
            }}
          >
            <Typography color="#222">{name}</Typography>
            <Checkbox
              checked={saved}
              onChange={() => toggleSaved(id)}
              disabled={completed}
              color="primary"
              inputProps={{ "aria-label": `${name} saved checkbox` }}
            />
          </Box>
        ))}
      </Box>

      {/* Total saved count */}
      <Typography sx={{ mt: 2, color: "#222" }} align="center">
        Total Saved: {totalSaved} / {members.length}
      </Typography>

      {/* Complete Month Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={completeMonth}
        disabled={completed || totalSaved !== members.length}
      >
        {completed ? "Month Completed" : "Mark Month Completed"}
      </Button>
    </Box>
  );
}
