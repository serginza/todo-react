import { Button, List } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledButton = styled(Button)({
  display: 'block',
  color: '#fff',
  backgroundColor: '#6c757d',
  textTransform: 'none',
  textDecoration: 'none',
  fontSize: '1rem',
  width: '100%',
  textAlign: 'center',
  ':hover': {
    backgroundColor: '#474d52',
    color: 'white',
  },
});

export const StyledList = styled(List)({
  width: '100%',
  marginBottom: '10px',
});

export const StyledLink = styled(Link)({
  textDecoration: 'none',
});
