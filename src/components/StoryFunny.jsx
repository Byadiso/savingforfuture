import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function StoryFunny() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{ padding: "20px", paddingBottom: "50px" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography gutterBottom variant="h6" component="div">
          Timmy's Tales: Adventures in Storyland
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            component="div"
            style={{ padding: "40px", fontSize: 16, color: "#3c3f3fc5" }}
          >
            Once upon a time, in a cozy little
            town, there lived a curious child named Timmy. Timmy was always up
            for an adventure, especially when it involved stories. One day,
            while exploring the attic of his house, Timmy stumbled upon a dusty
            old book. As he flipped through its pages, he was whisked away into
            a world of magic and wonder. Inspired by the tales he read, Timmy
            decided to become a storyteller himself.
            <br />
            Armed with a pencil and a
            notebook, he set out to create his own adventures. Timmy's stories
            were filled with daring heroes, mischievous creatures, and hidden
            treasures. With each word he wrote, his imagination soared, and
            soon, other children wanted to join in the fun. Together, they
            embarked on thrilling quests, venturing into enchanted forests,
            scaling towering mountains, and sailing across vast oceans. And with
            every adventure they shared, Timmy and his friends discovered the
            true power of storytelling.
            
            <br /> Through writing, they could be anyone,
            go anywhere, and do anything. They realized that the magic of
            stories wasn't just in the reading but in the telling and creating.
            And so, Timmy and his friends continued to write, filling the pages
            of their notebooks with tales of bravery, friendship, and endless
            excitement.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

