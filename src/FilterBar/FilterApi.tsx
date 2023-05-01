import React, { useMemo } from "react";
import { createContext, useContext } from "react";
import { useFilterBarApi } from "./filterBarApi";

export const FilterApi = createContext<{
  disableFilter: () => void;
}>({
  disableFilter: () => undefined,
});

export const useFilterApi = () => useContext(FilterApi);

export const FilterApiProvider: React.FC<
  React.PropsWithChildren<{ filterName: string }>
> = ({ filterName, children }) => {
  const { disableFilter } = useFilterBarApi();

  const value = useMemo(
    () => ({
      disableFilter: () => disableFilter(filterName),
    }),
    [filterName, disableFilter]
  );

  return <FilterApi.Provider value={value}>{children}</FilterApi.Provider>;
};
