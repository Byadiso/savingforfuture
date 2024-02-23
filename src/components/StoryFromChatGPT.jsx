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
    <div style={{ padding: "20px", paddingBottom: "50px" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography gutterBottom variant="h6" component="div">
            Whispers of Fluency: The Tale of Luna and the Magic Pen
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            component="div"
            style={{ padding: "40px", fontSize: 16, color: "#3c3f3fc5" }}
          >
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
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography gutterBottom variant="h6" component="div">
          Rusty's Honest Adventures: Funny Tales and Life Lessons
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            component="div"
            style={{ padding: "40px", fontSize: 16, color: "#3c3f3fc5" }}
          >
            Once upon a time, in a charming village nestled among rolling hills,
            there was a playful fox named Rusty. Rusty was known far and wide
            for his adventurous spirit and mischievous nature. With his sleek
            red fur and bright, curious eyes, he was a familiar sight to all who
            lived in the village. One sunny morning, Rusty awoke with a twinkle
            in his eye and a rumble in his stomach. As he set out on his daily
            stroll through the village, he couldn't help but notice the
            tantalizing aroma wafting through the air. Following his nose, Rusty
            soon found himself standing before a patch of ripe, juicy melons
            near the edge of the village. The sight of the plump fruits made
            Rusty's mouth water, and he couldn't resist the temptation to
            indulge in a little snack. With a mischievous grin, he plucked a
            melon from the vine and eagerly sank his teeth into its sweet flesh.
            Just as Rusty was savoring the delicious taste of the stolen fruit,
            he heard a voice behind him. "Who's been eating my melons?" the
            voice exclaimed, tinged with both surprise and annoyance. Startled,
            Rusty whipped around to see Mrs. Jenkins, the owner of the melon
            patch, standing with her hands on her hips, her eyes narrowed in
            suspicion. Caught red-handed, Rusty's mind raced as he scrambled to
            come up with a plausible excuse. "It wasn't me, Mrs. Jenkins!" he
            protested, his voice tinged with innocence. "It was some mischievous
            kids from the neighboring village. They tossed the melon at me, and
            I just happened to catch it in my mouth!" Mrs. Jenkins raised an
            eyebrow, clearly skeptical of Rusty's tale. "Hmm, really?" she
            replied, her tone laced with doubt. Thinking quickly, Rusty nodded
            eagerly. "Absolutely! Those kids are always causing trouble," he
            insisted. "But don't worry, Mrs. Jenkins, I'll help you track them
            down and make sure they learn their lesson!" Despite her initial
            skepticism, Mrs. Jenkins couldn't help but chuckle at Rusty's quick
            thinking. Instead of scolding him, she decided to share the rest of
            the melons with Rusty, impressed by his resourcefulness. As they sat
            together enjoying the juicy melons, Rusty couldn't help but feel a
            pang of guilt gnawing at his conscience. Deep down, he knew that he
            hadn't been entirely truthful with Mrs. Jenkins. But as the warm
            sunshine bathed them in its golden glow, Rusty made a silent vow to
            always strive to be more honest in the future. And so, Rusty and
            Mrs. Jenkins whiled away the hours in each other's company, laughing
            and chatting as they enjoyed their impromptu picnic in the shade of
            the melon patch. As the sun began to dip below the horizon, casting
            long shadows across the village, Rusty couldn't help but feel a
            sense of contentment wash over him. Despite the little white lie he
            had told, he knew that he had learned an important lesson about the
            value of honesty and integrity. And as he bid Mrs. Jenkins farewell
            and made his way back home, Rusty couldn't help but feel a newfound
            sense of determination to always keep it real, no matter what
            adventures lay ahead.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
