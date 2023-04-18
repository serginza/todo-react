import { Box, Button, createTheme } from '@mui/material';
import styled from '@emotion/styled';

export const TaskDoneTheme = createTheme({
  typography: {
    body1: {
      textDecoration: 'line-through',
      color: 'grey',
    },
  },
});

export const TaskImportantTheme = createTheme({
  typography: {
    body1: {
      fontWeight: 'bold',
      color: 'OrangeRed',
    },
  },
});

export const TaskTheme = createTheme({
  typography: {
    body1: {
      fontSize: '16px',
    },
  },
});

export const StyledButton = styled(Button)({
  display: 'block',
  minWidth: '30px',
  padding: 0,
});

export const StyledBox = styled(Box)({
  outline: '1px solid LightGray',
  outlineOffset: '-2px',
  padding: '10px 10px 20px 10px',
  wordBreak: 'break-word',
});
