import React from 'react';
import { observer } from 'mobx-react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { TasksStatsTheme } from './TaskStats.styles';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';

function TasksStatsProto() {
  const { tasksStats, isTasksLoading } = TasksStoreInstance;

  return (
    <Box display={'flex'} justifyContent={'space-between'} width={'100%'} mb={'10px'}>
      {tasksStats ? (
        <>
          <Box display={'flex'}>
            <Typography variant="body1">Total: </Typography>
            <Loader isLoading={isTasksLoading} variant="small">
              <ThemeProvider theme={TasksStatsTheme}>
                <Typography variant="body1">{` ${tasksStats.total}`}</Typography>
              </ThemeProvider>
            </Loader>
          </Box>
          <Box display={'flex'}>
            <Typography variant="body1">Important: </Typography>
            <Loader isLoading={isTasksLoading} variant="small">
              <ThemeProvider theme={TasksStatsTheme}>
                <Typography variant="body1">{` ${tasksStats.important}`}</Typography>
              </ThemeProvider>
            </Loader>
          </Box>
          <Box display={'flex'}>
            <Typography variant="body1">Done: </Typography>
            <Loader isLoading={isTasksLoading} variant="small">
              <ThemeProvider theme={TasksStatsTheme}>
                <Typography variant="body1">{` ${tasksStats.done}`}</Typography>
              </ThemeProvider>
            </Loader>
          </Box>
        </>
      ) : (
        <Typography variant="h6" display={'flex'} justifyContent={'space-between'} width={'100%'}>
          Stats is not available
        </Typography>
      )}
    </Box>
  );
}

export const TasksStats = observer(TasksStatsProto);
