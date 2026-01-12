export interface AlertMenuProps {
  title: string;
  className?: string;
  description: string;
  duration: number;
  setError: (value: boolean) => void;
}
export interface ButtonIconProps {
  children: (isActive: boolean) => React.ReactNode;
  initialCount: number;
}
export interface ComponentProps<T> {
  data: T;
}
