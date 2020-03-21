import React from 'react';
import classnames from 'classnames';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  className,
  ...buttonProps
}) => {
  const disabledClass =
    'bg-indigo-500 text-white font-medium py-2 px-4 rounded opacity-50 cursor-not-allowed';
  const buttonClass =
    'flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out';

  return (
    <button
      className={classnames(disabled ? disabledClass : buttonClass, className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
