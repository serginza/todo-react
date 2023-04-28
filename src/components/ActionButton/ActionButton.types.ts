import { MouseEvent } from 'react';

export interface ActionButtonProps {
  label: 'Add Task' | 'Edit task';
  type: 'button' | 'submit';
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
