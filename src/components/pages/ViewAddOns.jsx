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

const ViewAddOns = ({ setTotal }) => {
  const [addons, setAddons] = useState([]);
  const [total, setLocalTotal] = useState(0);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "add-on-interest"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAddons(data);

        const totalAmount = data.reduce(
          (sum, item) => sum + Number(item.amount || 0),
          0
        );
        setLocalTotal(totalAmount);
        if (setTotal) setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching add-ons:", error);
      }
    };

    fetchAddons();
  }, [setTotal]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Total Add-ons: {total} PLN
      </Typography>

      {addons.length === 0 ? (
        <Typography variant="body1" sx={{ color: "gray" }}>
          No add-ons recorded yet.
        </Typography>
      ) : (
        <Paper elevation={2}>
          <List>
            {addons.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.title}
                    secondary={`Amount: ${item.amount} PLN`}
                  />
                </ListItem>
                {index < addons.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ViewAddOns;
