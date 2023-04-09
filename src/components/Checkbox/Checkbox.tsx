import React, { ChangeEventHandler, memo } from 'react';
import { CheckboxProps } from './Checkbox.types';

function CheckboxProto({ label, checked, onChange, disabled, containerClassName = '' }: CheckboxProps) {
  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.checked);

  return (
    <div className={`form-check mb-3 ${containerClassName}`}>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={label}
        disabled={disabled}
        checked={checked}
        onChange={onCheckboxChange}
      />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}

export const Checkbox = memo(CheckboxProto);
