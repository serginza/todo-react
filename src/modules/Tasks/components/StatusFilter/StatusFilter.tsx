import React, { memo, MouseEvent } from 'react';
import { ButtonGroup } from '@mui/material';
import { VARIANT } from './StatusFilter.constants';
import { StatusFilterProps } from './StatusFilter.types';
import { StyledButton } from './StatusFilter.styles';
import { FiltersType } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';

function StatusFilterProto({ onChange, tasksType, disabled }: StatusFilterProps) {
  const onFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    if (!disabled) onChange(evt.target.textContent as FiltersType);
  };

  return (
    <ButtonGroup onClick={onFilterChange}>
      <StyledButton type="button" variant={tasksType === FILTER_TYPES.ALL ? VARIANT.ACTIVE : VARIANT.SECONDARY}>
        {FILTER_TYPES.ALL}
      </StyledButton>
      <StyledButton type="button" variant={tasksType === FILTER_TYPES.ACTIVE ? VARIANT.ACTIVE : VARIANT.SECONDARY}>
        {FILTER_TYPES.ACTIVE}
      </StyledButton>
      <StyledButton type="button" variant={tasksType === FILTER_TYPES.DONE ? VARIANT.ACTIVE : VARIANT.SECONDARY}>
        {FILTER_TYPES.DONE}
      </StyledButton>
      <StyledButton type="button" variant={tasksType === FILTER_TYPES.IMPORTANT ? VARIANT.ACTIVE : VARIANT.SECONDARY}>
        {FILTER_TYPES.IMPORTANT}
      </StyledButton>
    </ButtonGroup>
  );
}

export const StatusFilter = memo(StatusFilterProto);
