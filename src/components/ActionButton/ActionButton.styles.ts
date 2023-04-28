import { Button } from '@mui/material';
import styled from '@emotion/styled';

export const StyledActionButton = styled(Button)({
  display: 'block',
  color: '#fff',
  backgroundColor: '#6c757d',
  textTransform: 'none',
  fontSize: '1rem',
  width: '100%',
  ':hover': {
    backgroundColor: '#474d52',
  },
});
