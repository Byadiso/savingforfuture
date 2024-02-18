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

export default function StoryFromChatGPT() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{padding:"20px", paddingBottom:"50px"}}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography  gutterBottom
            variant="h6"
            component="div"            >
            Whispers of Fluency: The Tale of Luna and the Magic Pen
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2"
            component="div"  style={{padding:"40px", fontSize: 16, color:"#3c3f3fc5"}} >
            Once upon a time in a bustling city, there lived a young linguist
            named Luna. Luna had a burning passion for languages. She believed
            that the key to mastering a language lay not only in listening and
            speaking but also in the power of writing. One day, as Luna strolled
            through the city's cobblestone streets, she stumbled upon an ancient
            bookstore tucked away in a quiet corner. Intrigued, she entered and
            found herself surrounded by shelves upon shelves of books, each
            whispering tales of distant lands and cultures. In a corner of the
            store, Luna discovered a dusty tome titled "The Magic of Writing: A
            Language Learner's Guide." She opened it and was immediately
            enchanted by its words. The book spoke of a unique method of
            language learning—learning by writing. With renewed excitement, Luna
            embarked on her journey, armed with pen and paper. She poured her
            thoughts, dreams, and aspirations onto the blank pages, weaving
            sentences in the language she longed to master. Every stroke of her
            pen felt like a step closer to fluency. As Luna wrote, she
            discovered the magic of words taking shape before her eyes. Each
            sentence she crafted became a bridge connecting her to the heart of
            the language. Through writing, she not only learned grammar and
            vocabulary but also gained insight into the culture and soul of the
            language. Word by word, sentence by sentence, Luna's proficiency
            blossomed like a flower in spring. She found joy in the rhythm of
            her writing, the dance of her words on paper. And as she wrote, she
            shared her journey with others, inspiring them to embark on their
            own path to language mastery. Soon, Luna's story spread far and
            wide, reaching aspiring linguists across the globe. They too picked
            up their pens, eager to write their own tales of language learning.
            Together, they formed a community—a tribe of writers bound by their
            love for languages and the transformative power of writing. And so,
            in the heart of that bustling city, amidst the whispers of ancient
            books and the scribbles of eager learners, Luna's legacy lived on—a
            testament to the magic of learning by writing.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
