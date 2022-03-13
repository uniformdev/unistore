import React from 'react';

export type ActionButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  isLoading?: boolean;
};

const ActionButton = ({
  children,
  onClick,
  className,
  disabled = false,
  type = 'button',
  isLoading,
}: React.HTMLProps<HTMLButtonElement> & ActionButtonProps) => (
  <button
    disabled={disabled}
    type={type}
    className={`flex items-center justify-center h-12 border-4 ${
      disabled ? 'border-demo_border' : 'border-havelock_blue'
    }  text-black font-bold text-lg leading-8 font-overpass cursor-pointer ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-center">
      {children}
      {isLoading && (
        <div className="flex justify-between pl-2">
          <div className="w-1 h-1 mr-1 bg-havelock_blue rounded-lg border-havelock_blue animate-pulse-fast animation-delay-100" />
          <div className="w-1 h-1 mr-1 bg-havelock_blue rounded-lg border-havelock_blue animate-pulse-fast animation-delay-200" />
          <div className="w-1 h-1 mr-1 bg-havelock_blue rounded-lg border-havelock_blue animate-pulse-fast animation-delay-300" />
        </div>
      )}
    </div>
  </button>
);

export default ActionButton;
