// ui/button.tsx
import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const Button = ({
  children,
  onClick,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 px-2 py-2 w-8 h-8 text-sm font-medium text-black bg-white rounded-sm shadow-sm hover:bg-black hover:text-white active:bg-black active:text-white outline-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export { Button };
