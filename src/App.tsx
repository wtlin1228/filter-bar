import React from "react";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { PrimerMenu } from "./PrimerMenu/PrimerMenu";
import { FilterBar } from "./FilterBar/FilterBar";
import CloseFilterButton from "./FilterBar/CloseFilterButton";
import { BaseFilterProps } from "./FilterBar/Filter";
import styled from "styled-components";

const FilterContainer = styled.div`
  padding: 8px;
  background-color: #3b7a5d94;
`;

const FilterContent = styled.div`
  height: 200px;
  width: 500px;
`;

const MyCheckboxFilter: React.FC<BaseFilterProps> = () => {
  return (
    <FilterContainer>
      <FilterContent>我是 checkbox</FilterContent>
      <CloseFilterButton />
    </FilterContainer>
  );
};

const MyDateRangeFilter: React.FC<BaseFilterProps> = () => {
  return (
    <FilterContainer>
      <FilterContent>我是 date picker</FilterContent>
      <CloseFilterButton />
    </FilterContainer>
  );
};

function App() {
  return (
    <>
      <FilterBar onResetButtonClick={() => console.log("onResetButtonClick")}>
        <MyCheckboxFilter filterName="門市 filter" anchorLabel="門市" />
        <MyCheckboxFilter filterName="上架 filter" anchorLabel="上架" />
        <MyDateRangeFilter
          filterName="訂單建立日期 filter"
          anchorLabel="訂單建立時間"
        />
      </FilterBar>

      <div style={{ height: 100 }}></div>

      <ThemeProvider>
        <BaseStyles>
          <PrimerMenu />
        </BaseStyles>
      </ThemeProvider>
    </>
  );
}

export default App;
