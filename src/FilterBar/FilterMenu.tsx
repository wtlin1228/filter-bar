import React from "react";
import { Menu, MenuItem } from "./DropdownMenu";

interface FilterMenuProps {
  filterNames: string[];
  enabledFilters: Set<string>;
  enableFilter: (filterName: string) => void;
  openFilter: (filterName: string) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  filterNames,
  enabledFilters,
  enableFilter,
  openFilter,
}) => {
  return (
    <div>
      <Menu label="篩選條件">
        {filterNames
          .filter((filterName) => !enabledFilters.has(filterName))
          .map((filterName) => (
            <MenuItem
              key={filterName}
              label={filterName}
              onClick={() => {
                enableFilter(filterName);
                openFilter(filterName);
              }}
            />
          ))}
      </Menu>
    </div>
  );
};

export default FilterMenu;
