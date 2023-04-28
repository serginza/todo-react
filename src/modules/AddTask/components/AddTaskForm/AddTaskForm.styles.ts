import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  minHeight: 200,
  width: '100%',
  justifyContent: 'center',
  marginTop: '25px',
  '& span': {
    alignSelf: 'center',
  },
  '& div': {
    marginBottom: '5px',
  },
});
