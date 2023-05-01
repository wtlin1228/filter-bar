import { createContext, useContext } from "react";

export const FilterBarApi = createContext<{
  enableFilter: (filterName: string) => void;
  disableFilter: (filterName: string) => void;
  resetFilters: (filterNames: string[]) => void;
  openFilter: (filterName: string) => void;
  closeFilter: (filterName: string) => void;
}>({
  enableFilter: () => undefined,
  disableFilter: () => undefined,
  resetFilters: () => undefined,
  openFilter: () => undefined,
  closeFilter: () => undefined,
});

export const useFilterBarApi = () => useContext(FilterBarApi);
