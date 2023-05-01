import React, { Fragment, useMemo, useReducer } from "react";
import { FilterBarApi } from "./filterBarApi";
import type { BaseFilterProps } from "./Filter";
import { reducer } from "./filterBarReducer";
import FilterMenu from "./FilterMenu";
import { FilterApiProvider } from "./FilterApi";
import styled from "styled-components";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { ResetButton } from "./ResetButton";

const FilterBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

interface FilterBarProps {
  /**
   * A callback which is called when the outer reset button in the
   * end of filters is called.
   */
  onResetButtonClick: () => void;

  /**
   * When filter bar is rendered, this filter will be selected by
   * default.
   */
  defaultSelectedFilterNames?: string[];

  /**
   * Important: children's filterName should be unique
   * The type of each child must extend the BaseFilterProps because
   * we're using the child.filterName as identifier.
   */
  children:
    | React.ReactElement<BaseFilterProps>
    | React.ReactElement<BaseFilterProps>[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onResetButtonClick,
  defaultSelectedFilterNames = [],
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    openedFilters: new Set<string>(),
    enabledFilters: new Set<string>(defaultSelectedFilterNames),
  });

  const { filterNames, filterElementMap } = useMemo(() => {
    const map = new Map<
      string,
      { label: string; element: React.ReactElement<BaseFilterProps> }
    >();
    React.Children.forEach(children, (child) => {
      map.set(child.props.filterName, {
        label: child.props.anchorLabel,
        element: child,
      });
    });
    return { filterNames: [...map.keys()], filterElementMap: map };
  }, [children]);

  const api = useMemo(
    () => ({
      enableFilter: (filterName: string) =>
        dispatch({ type: "enableFilter", filterName }),
      disableFilter: (filterName: string) =>
        dispatch({ type: "disableFilter", filterName }),
      resetFilters: (filterNames: string[]) =>
        dispatch({ type: "resetFilters", filterNames }),
      openFilter: (filterName: string) =>
        dispatch({ type: "openFilter", filterName }),
      closeFilter: (filterName: string) =>
        dispatch({ type: "closeFilter", filterName }),
    }),
    []
  );

  return (
    <FilterBarContainer>
      <FilterMenu
        filterNames={filterNames}
        enabledFilters={state.enabledFilters}
        enableFilter={api.enableFilter}
        openFilter={api.openFilter}
      />

      <FilterBarApi.Provider value={api}>
        {[...state.enabledFilters].map((filterName) => {
          const filter = filterElementMap.get(filterName);

          if (!filter) {
            return null;
          }

          return (
            <Fragment key={filterName}>
              <FilterApiProvider filterName={filterName}>
                <Popover
                  placement="bottom-start"
                  open={state.openedFilters.has(filterName)}
                  onOpenChange={(open) => {
                    if (open) {
                      api.openFilter(filterName);
                    } else {
                      api.closeFilter(filterName);
                    }
                  }}
                >
                  <PopoverTrigger
                    onClick={() => {
                      // toggle
                      if (state.openedFilters.has(filterName)) {
                        api.closeFilter(filterName);
                      } else {
                        api.openFilter(filterName);
                      }
                    }}
                  >
                    {filter.label}
                  </PopoverTrigger>
                  <PopoverContent className="Popover">
                    {filter.element}
                  </PopoverContent>
                </Popover>
              </FilterApiProvider>
            </Fragment>
          );
        })}
      </FilterBarApi.Provider>

      {state.enabledFilters.size > 0 && (
        <ResetButton
          resetFilterBar={() => {
            onResetButtonClick();
            api.resetFilters(defaultSelectedFilterNames);
          }}
        />
      )}
    </FilterBarContainer>
  );
};
