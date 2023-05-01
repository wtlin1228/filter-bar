import React from "react";
import { useFilterApi } from "./FilterApi";
import { PopoverClose } from "./Popover";

interface CloseFilterButton {
  onClick?: () => void;
}

const CloseFilterButton: React.FC<CloseFilterButton> = ({ onClick }) => {
  const { disableFilter } = useFilterApi();
  const handleClick = () => {
    onClick?.();
    disableFilter();
  };
  return <PopoverClose onClick={handleClick}>Close Filter</PopoverClose>;
};

export default CloseFilterButton;
