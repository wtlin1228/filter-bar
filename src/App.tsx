import React from "react";
import { FilterCombo } from "./FilterCombo";

function App() {
  const [state, setState] = React.useState("123");

  return (
    <>
      <FilterCombo
        onClearAllFilters={() => console.log("onClearAllFilters")}
        // defaultSelectedFilters={["Filter 1"]}
      >
        <FilterCombo.BaseFilter
          name="Filter 1"
          onFilterRemove={() => console.log("remove filter 1")}
        >
          <div>
            <input value={state} onChange={(e) => setState(e.target.value)} />
          </div>
        </FilterCombo.BaseFilter>
        <FilterCombo.BaseFilter
          name="Filter 2"
          onFilterRemove={() => console.log("remove filter 2")}
        />
        <FilterCombo.BaseFilter
          name="Filter 3"
          onFilterRemove={() => console.log("remove filter 3")}
        />
        <FilterCombo.BaseFilter
          name="Filter 4"
          onFilterRemove={() => console.log("remove filter 4")}
        />
        <FilterCombo.BaseFilter
          name="Filter 5"
          onFilterRemove={() => console.log("remove filter 5")}
        />
      </FilterCombo>
    </>
  );
}

export default App;
