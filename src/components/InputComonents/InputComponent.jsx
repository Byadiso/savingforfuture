import React, { memo } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";

// Styled MUI TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  margin: "10px 0",
  fontFamily: "IBM Plex Sans, sans-serif",
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: 1.5,
  borderRadius: 8,
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.mode === "dark" ? "#1C2025" : "#fff",
    color: theme.palette.mode === "dark" ? "#F3F6F9" : "#1C2025",
    borderRadius: 8,
    "& fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#434D5B" : "#DAE2ED",
    },
    "&:hover fieldset": {
      borderColor: "#3399FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#007FFF",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 0 0 3px rgba(0, 127, 255, 0.4)"
          : "0 0 0 3px rgba(128, 191, 255, 0.4)",
    },
  },
}));

// Memoized Input Component
const MemoizedInputComponent = memo(function InputComponent(props) {
  return (
    <StyledTextField
      label={props.label || props.name}
      placeholder={`Your ${props.name}`}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      type={props.type || "text"}
      variant="outlined"
      required={props.required || false}
    />
  );
});

export default MemoizedInputComponent;
