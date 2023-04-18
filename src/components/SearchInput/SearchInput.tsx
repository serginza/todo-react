import { IconButton, TextField } from '@mui/material';
import { Clear } from '@mui/icons-material';
import React, { ChangeEventHandler, memo, MouseEvent } from 'react';
import { SearchInputProps } from './SearchInput.types';

function SearchInputProto({ onChange, value, onReset, disabled }: SearchInputProps) {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (onReset) onReset();
  };

  return (
    <TextField
      fullWidth
      size="small"
      onChange={onSearchInputChange}
      placeholder={'Search'}
      value={value}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <IconButton onClick={onResetBtnClick}>
            <Clear />
          </IconButton>
        ),
      }}
    />
  );
}

export const SearchInput = memo(SearchInputProto);
