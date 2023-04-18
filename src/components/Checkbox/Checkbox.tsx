import React, { ChangeEventHandler, memo } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { CheckboxProps } from './Checkbox.types';

function MaterialCheckboxProto({ label, checked, onChange, disabled }: CheckboxProps) {
  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.checked);

  return (
    <FormControlLabel
      control={<Checkbox onChange={onCheckboxChange} checked={checked} disabled={disabled} />}
      label={label}
    />
  );
}

export const MaterialCheckbox = memo(MaterialCheckboxProto);
