import React, { ChangeEventHandler, memo } from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from './TextField.types';

function MaterialTextFieldProto({ label, placeholder, value, onChange, errorText }: TextFieldProps) {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  return (
    <TextField
      fullWidth
      label={label}
      onChange={onInputChange}
      placeholder={placeholder}
      value={value}
      helperText={errorText}
      error={errorText ? true : false}
    />
  );
}

export const MaterialTextField = memo(MaterialTextFieldProto);
