import { styled } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

type InputProps = {
    theme: string | undefined;
};
export const StyledInputRoot = styled('div')<InputProps>(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
gap: 20px;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

export const StyledInput = styled('input')<InputProps>(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette?.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette?.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette?.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
      theme.palette?.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette?.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

export const StyledButton = styled('button')<InputProps>(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette?.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette?.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette?.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette?.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette?.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
