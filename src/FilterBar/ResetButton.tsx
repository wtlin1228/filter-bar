import React from "react";

interface ResetButtonProps {
  resetFilterBar: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ resetFilterBar }) => {
  return <button onClick={resetFilterBar}>重設</button>;
};
