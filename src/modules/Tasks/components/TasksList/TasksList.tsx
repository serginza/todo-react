import { observer } from 'mobx-react';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from '../Task';
import { StyledButton, StyledLink, StyledList } from './TasksList.styles';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';
import { PATH_LIST } from 'constants/path';

function TasksListProto() {
  const { isTasksLoading, tasks, changeTaskImportant, deleteTask, changeTaskCompleted } = TasksStoreInstance;

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        minHeight={'400px'}>
        <Loader isLoading={isTasksLoading}>
          {tasks?.length ? (
            <StyledList>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  changeTaskImportant={changeTaskImportant}
                  deleteTask={deleteTask}
                  changeTaskCompleted={changeTaskCompleted}
                />
              ))}
            </StyledList>
          ) : (
            <Typography variant="h6" marginBottom={'100px'}>
              Not found
            </Typography>
          )}
        </Loader>
      </Box>

      <StyledLink to={PATH_LIST.ADD}>
        <StyledButton disabled={isTasksLoading}>Add task</StyledButton>
      </StyledLink>
    </>
  );
}

export const TasksList = observer(TasksListProto);
