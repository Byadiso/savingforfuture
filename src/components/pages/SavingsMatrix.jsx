import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs
} from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Stack,
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

const MEMBER_VALUE = 600;

export default function SavingsMatrix() {
  const [loading, setLoading] = useState(true);
  const [matrix, setMatrix] = useState({});
  const [months, setMonths] = useState([]);
  const [memberNames, setMemberNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(firestore, "savings"));
      const monthDocs = [];
      const nameSet = new Set();
      const dataMatrix = {};

      snapshot.forEach((docSnap) => {
        const month = docSnap.id;
        monthDocs.push(month);

        const members = docSnap.data().members || {};
        Object.values(members).forEach((member) => {
          nameSet.add(member.name);
          if (!dataMatrix[member.name]) {
            dataMatrix[member.name] = {};
          }
          dataMatrix[member.name][month] = member.saved;
        });
      });

      const sortedMonths = monthDocs.sort();
      setMatrix(dataMatrix);
      setMonths(sortedMonths);
      setMemberNames(Array.from(nameSet).sort());
      setLoading(false);
    }

    fetchData();
  }, []);

  const exportToCSV = () => {
    const header = ["Name", ...months, "Total"];
    const rows = memberNames.map((name) => {
      const row = [name];
      let total = 0;
      months.forEach((month) => {
        if (matrix[name]?.[month]) {
          row.push(MEMBER_VALUE);
          total += MEMBER_VALUE;
        } else {
          row.push("");
        }
      });
      row.push(total);
      return row;
    });

    // Add footer row
    const footer = ["Total"];
    let grandTotal = 0;
    months.forEach((month) => {
      const colTotal = memberNames.reduce((sum, name) => {
        return sum + (matrix[name]?.[month] ? MEMBER_VALUE : 0);
      }, 0);
      footer.push(colTotal);
      grandTotal += colTotal;
    });
    footer.push(grandTotal);
    rows.push(footer);

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Savings_Matrix_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
          Last Months Savings Table
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={exportToCSV}
          startIcon={<DownloadIcon />}
          sx={{
            textTransform: "none",
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#115293"
            }
          }}
        >
          Export to CSV
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              {months.map((month) => (
                <TableCell key={month} align="center">{month}</TableCell>
              ))}
              <TableCell align="center"><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memberNames.map((name) => {
              const row = matrix[name];
              let rowTotal = 0;

              return (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  {months.map((month) => {
                    const saved = row?.[month];
                    if (saved) rowTotal += MEMBER_VALUE;
                    return (
                      <TableCell key={month} align="center">
                        {saved ? MEMBER_VALUE : ""}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center"><strong>{rowTotal}</strong></TableCell>
                </TableRow>
              );
            })}

            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Total</strong></TableCell>
              {months.map((month) => {
                const total = memberNames.reduce((acc, name) => {
                  if (matrix[name]?.[month]) acc += MEMBER_VALUE;
                  return acc;
                }, 0);
                return (
                  <TableCell key={month} align="center"><strong>{total}</strong></TableCell>
                );
              })}
              <TableCell align="center">
                <strong>
                  {memberNames.reduce((sum, name) => {
                    return sum + months.reduce((mSum, month) => {
                      return mSum + (matrix[name]?.[month] ? MEMBER_VALUE : 0);
                    }, 0);
                  }, 0)}
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
