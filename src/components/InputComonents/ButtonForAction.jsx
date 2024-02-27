import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

export default function ButtonForAction(props) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>     
      <Fab variant="extended" size="medium" color="none" onClick={props.handleOnClick}>
        <ChecklistRtlIcon sx={{ mr: 1 }} />
        {props.type}
      </Fab>     
    </Box>
  );
}