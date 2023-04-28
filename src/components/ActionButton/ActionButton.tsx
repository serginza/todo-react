import React, { memo } from 'react';
import { StyledActionButton } from './ActionButton.styles';
import { ActionButtonProps } from './ActionButton.types';

function ActionButtonProto({ label, type, onClick, disabled }: ActionButtonProps) {
  return (
    <StyledActionButton type={type} onClick={onClick} disabled={disabled}>
      {label}
    </StyledActionButton>
  );
}

export const ActionButton = memo(ActionButtonProto);
