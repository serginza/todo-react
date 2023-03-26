export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  containerClassName?: string;
  disabled?: boolean;
}
