import clsx from 'clsx';
import { SspButtonProps } from './SspButton.type';

export const SspButton: React.FC<SspButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'ssp-button focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer px-4 py-2 rounded-md font-semibold transition-colors duration-200';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary:
      'bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300 hover:border-gray-400 focus:ring-gray-500 active:bg-gray-400',
  };

  const variantStyles = variants[variant];

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles,
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
