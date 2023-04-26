import React from "react";
import { useFloating } from "@floating-ui/react";

interface FilterComboProps {
  onClearAllFilters: () => void;
  defaultSelectedFilters?: string[];
  children: React.ReactElement<BaseFilterProps>[];
}

export const Root: React.FC<FilterComboProps> = ({
  onClearAllFilters,
  defaultSelectedFilters,
  children,
}) => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>(
    defaultSelectedFilters ?? []
  );

  const filtersMap = React.useMemo(() => {
    const map = new Map<string, React.ReactElement<BaseFilterProps>>();
    React.Children.forEach(children, (child) => {
      map.set(child.props.name, child);
    });
    return map;
  }, [children]);

  const filterNames = React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        return child.props.name;
      }),
    [children]
  );

  console.log(`current selected filters: ${selectedFilters}`);

  const [openedFilter, setOpenedFilter] = React.useState<string | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      <FilterRootToggleButton
        filterNames={filterNames}
        selectedFilters={selectedFilters}
        setOpenedFilter={setOpenedFilter}
        setSelectedFilters={setSelectedFilters}
      />

      {selectedFilters.map((name) => {
        const filter = filtersMap.get(
          name
        ) as React.ReactElement<BaseFilterProps>;

        const filterWithPatchedProps = React.cloneElement(filter, {
          isOpen: name === openedFilter,
          onFilterOpen: () => {
            setOpenedFilter(name);
          },
          onFilterClose: () => {
            setOpenedFilter(null);
          },
          onFilterRemove: () => {
            setSelectedFilters(
              selectedFilters.filter((name) => name !== filter.props.name)
            );
            filter.props.onFilterRemove();
          },
        });

        return (
          <React.Fragment key={name}>{filterWithPatchedProps}</React.Fragment>
        );
      })}

      {selectedFilters.length > 0 && (
        <button
          onClick={() => {
            setSelectedFilters([]);
            onClearAllFilters();
          }}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

interface BaseFilterProps {
  isOpen?: boolean;
  onFilterOpen?: () => void;
  onFilterClose?: () => void;
  onFilterRemove: () => void;
  name: string;
}

export const BaseFilter: React.FC<React.PropsWithChildren<BaseFilterProps>> = ({
  isOpen = false,
  onFilterOpen,
  onFilterClose,
  onFilterRemove,
  name,
  children,
}) => {
  const { elements, x, y, strategy, refs } = useFloating();

  useClickOutside({
    elementRef: refs.floating,
    onClickOutside: onFilterClose || (() => 1),
    shouldUseCapture: true,
    skip: !isOpen,
  });

  return (
    <div
      style={{
        minWidth: 165,
      }}
    >
      <button onClick={onFilterOpen} ref={refs.setReference}>
        {name}
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            // left: x ?? 0,
            left: elements.reference?.getBoundingClientRect().left ?? 0,
            width: "max-content",
          }}
        >
          <div style={{ backgroundColor: "pink" }}>
            <div>{children}</div>
            <button onClick={onFilterRemove}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterRootToggleButton: React.FC<{
  filterNames: string[];
  selectedFilters: string[];
  setOpenedFilter: (name: string) => void;
  setSelectedFilters: (names: string[]) => void;
}> = ({
  filterNames,
  selectedFilters,
  setOpenedFilter,
  setSelectedFilters,
}) => {
  const { elements, y, strategy, refs } = useFloating();
  const [isOpen, setIsOpen] = React.useState(false);

  useClickOutside({
    elementRef: refs.floating,
    onClickOutside: () => setIsOpen(false),
    shouldUseCapture: true,
    skip: !isOpen,
  });

  return (
    <div style={{ width: 200 }}>
      <button onClick={() => setIsOpen(!isOpen)} ref={refs.setReference}>
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: elements.reference?.getBoundingClientRect().left ?? 0,
            width: "max-content",
          }}
        >
          <div
            style={{
              backgroundColor: "pink",
              color: "black",
            }}
          >
            {filterNames
              .filter((name) => !selectedFilters.includes(name))
              .map((name) => (
                <div
                  key={name}
                  onClick={() => {
                    setSelectedFilters([...selectedFilters, name]);
                    setOpenedFilter(name);
                  }}
                >
                  {name}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const FilterCombo = Object.assign(Root, {
  BaseFilter,
});

const useClickOutside = ({
  elementRef,
  onClickOutside,
  shouldUseCapture = true,
  skip = false,
}: {
  elementRef: React.RefObject<HTMLElement>;
  onClickOutside: () => void;
  shouldUseCapture?: boolean;
  skip?: boolean;
}) => {
  React.useEffect(() => {
    if (skip) {
      return;
    }

    const handleClickOutside = (e) => {
      const element = elementRef.current;
      if (element && !element.contains(e.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, shouldUseCapture);
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        shouldUseCapture
      );
    };
  }, [onClickOutside, elementRef, shouldUseCapture, skip]);
};
