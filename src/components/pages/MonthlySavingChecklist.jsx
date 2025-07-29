import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import { Button, Checkbox, Typography, Box } from "@mui/material";

const membersList = [
  "Eric Uwoyiremeye", "Desire Byamungu", "Raymond Umazekabiri", "Olivier Ndayishimiye", "Celine Niyirora", "Clement  Manirumva Ishimwe",
  "Fabrice Ntihinyuzwa", "Dr. Aime Pascaline Uwineza", "Francois D’Assise Munyamahoro", "Marie Assumpta Umugwaneza", "Elyseus Munezero", "Patrick Shimirwa"
];

const MEMBER_VALUE = 600;

const getCurrentDate = () => new Date();

const formatMonthId = (date) => {
  return `${date.getFullYear()}_${(date.getMonth() + 1).toString().padStart(2, "0")}`;
};

// ✅ NEW FUNCTION: Next month based on current document ID
const getNextMonthIdFrom = (currentMonthId) => {
  const [yearStr, monthStr] = currentMonthId.split("_");
  let year = parseInt(yearStr, 10);
  let month = parseInt(monthStr, 10);

  month += 1;
  if (month > 12) {
    month = 1;
    year += 1;
  }

  return `${year}_${month.toString().padStart(2, "0")}`;
};

const getCurrentMonthName = () => {
  const d = getCurrentDate();
  return d.toLocaleString("default", { month: "long", year: "numeric" });
};

export default function MonthlySavingChecklist() {
  const [members, setMembers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [monthId, setMonthId] = useState(null);

  useEffect(() => {
    async function fetchIncompleteOrCurrentMonth() {
      setLoading(true);

      const savingsCol = collection(firestore, "savings");
      const q = query(
        savingsCol,
        where("completed", "==", false),
        orderBy("__name__", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      let monthDocId;
      if (!querySnapshot.empty) {
        monthDocId = querySnapshot.docs[0].id;
      } else {
        monthDocId = formatMonthId(getCurrentDate());
      }
      setMonthId(monthDocId);

      const docRef = doc(firestore, "savings", monthDocId);
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

        await setDoc(docRef, { members: membersObj, completed: false, totalAmount: 0 });
        setMembers(initialMembers);
        setCompleted(false);
      }

      setLoading(false);
    }

    fetchIncompleteOrCurrentMonth();
  }, []);

  const toggleSaved = async (id) => {
    const updatedMembers = members.map((m) =>
      m.id === id ? { ...m, saved: !m.saved } : m
    );
    setMembers(updatedMembers);

    const docRef = doc(firestore, "savings", monthId);
    const membersData = {};
    updatedMembers.forEach((m) => {
      membersData[m.id] = { name: m.name, saved: m.saved };
    });

    await updateDoc(docRef, { members: membersData });
  };

  const completeMonth = async () => {
    const totalSaved = members.filter((m) => m.saved).length;
    const totalAmount = totalSaved * MEMBER_VALUE;

    await addDoc(collection(firestore, "archives"), {
      month: getCurrentMonthName(),
      amount: totalAmount,
      timestamp: new Date(),
    });

    await updateDoc(doc(firestore, "savings", monthId), {
      completed: true,
      totalAmount: totalAmount,
    });

    const nextMonthId = getNextMonthIdFrom(monthId);
    const nextMonthDoc = doc(firestore, "savings", nextMonthId);

    const nextMembers = {};
    membersList.forEach((name, idx) => {
      nextMembers[idx] = { name, saved: false };
    });

    await setDoc(nextMonthDoc, {
      members: nextMembers,
      completed: false,
      totalAmount: 0,
    });

    setCompleted(true);
    setMonthId(nextMonthId);
    setMembers(membersList.map((name, idx) => ({ id: idx, name, saved: false })));
  };

  const totalSaved = members.filter((m) => m.saved).length;
  const totalAmount = totalSaved * MEMBER_VALUE;

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
        color: "#222",
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 1 }}>
        {monthId === formatMonthId(getCurrentDate())
          ? getCurrentMonthName()
          : `Pending Month: ${monthId.replace("_", "/")}`}
      </Typography>

      <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: "bold" }}>
        Total Amount: {totalAmount.toLocaleString()} PLN
      </Typography>

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
            }}
          >
            <Typography>{name}</Typography>
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

      <Typography sx={{ mt: 2 }} align="center">
        Total Saved: {totalSaved} / {members.length}
      </Typography>

      <Button
        variant="contained"
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
