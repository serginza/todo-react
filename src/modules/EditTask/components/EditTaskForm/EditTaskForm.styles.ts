import { Box, Button } from '@mui/material';
import styled from '@emotion/styled';

export const StyledButton = styled(Button)({
  display: 'block',
  color: '#fff',
  backgroundColor: '#6c757d',
  textTransform: 'none',
  fontSize: '1rem',
  ':hover': {
    backgroundColor: '#474d52',
  },
});

export const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  minHeight: 200,
  width: '100%',
  justifyContent: 'center',
  marginTop: '25px',
  '& span, h5': {
    alignSelf: 'center',
  },
  '& div': {
    marginBottom: '5px',
  },
});
