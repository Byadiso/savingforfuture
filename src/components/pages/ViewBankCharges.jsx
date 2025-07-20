import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const ViewBankCharges = ({ setTotal }) => {
  const [charges, setCharges] = useState([]);
  const [total, setLocalTotal] = useState(0);

  console.log(charges)

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "bank-charges"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCharges(data);

        const totalAmount = data.reduce(
          (sum, item) => sum + Number(item.amount || 0),
          0
        );
        setLocalTotal(totalAmount);
        if (setTotal) setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching bank charges:", error);
      }
    };

    fetchCharges();
  }, [setTotal]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Total Bank Charges: {total} PLN
      </Typography>

      {charges.length === 0 ? (
        <Typography variant="body1" sx={{ color: "gray" }}>
          No bank charges recorded yet.
        </Typography>
      ) : (
        <Paper elevation={2}>
          <List>
            {charges.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.title}
                    secondary={`Charge: ${item.amount} PLN`}
                  />
                </ListItem>
                {index < charges.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ViewBankCharges;
