import React from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { TaskTheme, TaskDoneTheme, TaskImportantTheme, StyledButton, StyledBox } from './Task.styles';
import { TaskProps } from './Task.types';
import { EDIT, ROOT } from 'constants/index';

export function Task({ task, changeTaskImportant, changeTaskCompleted, deleteTask }: TaskProps) {
  const { name, info, isImportant, isDone, id } = task;

  const onBtnImportantTask = () => {
    changeTaskImportant(id, isImportant);
  };

  const onBtnDoneTask = () => {
    changeTaskCompleted(id, isDone);
  };

  const onBtnDeleteTask = () => {
    deleteTask(id);
  };

  return (
    <StyledBox>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginBottom={2}>
        <ThemeProvider theme={isDone ? TaskDoneTheme : isImportant ? TaskImportantTheme : TaskTheme}>
          <Typography variant="body1">{name}</Typography>
        </ThemeProvider>
        <Box display={'flex'} justifyContent={'space-between'} minWidth={'140px'}>
          <StyledButton
            color="warning"
            disabled={isDone}
            onClick={onBtnImportantTask}
            variant={isImportant ? 'contained' : 'outlined'}>
            <PriorityHighIcon />
          </StyledButton>

          <StyledButton color="success" onClick={onBtnDoneTask} variant={isDone ? 'contained' : 'outlined'}>
            <DoneIcon />
          </StyledButton>

          <StyledButton color="error" onClick={onBtnDeleteTask} variant={'outlined'}>
            <DeleteIcon />
          </StyledButton>
          <Link to={`${ROOT}${EDIT}/${id}`}>
            <StyledButton color="inherit" variant={'outlined'}>
              <EditIcon />
            </StyledButton>
          </Link>
        </Box>
      </Box>
      <ThemeProvider theme={isDone ? TaskDoneTheme : isImportant ? TaskImportantTheme : TaskTheme}>
        <Typography variant="body1">{info}</Typography>
      </ThemeProvider>
    </StyledBox>
  );
}
