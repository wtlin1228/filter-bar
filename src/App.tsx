import React from "react";
import { ThemeProvider, BaseStyles, Box, CheckboxGroup, FormControl, Checkbox } from "@primer/react";
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
  min-width: 200px;
`;

const MyBranchFilter: React.FC<BaseFilterProps> = () => {
  return (
    <FilterContainer>
      <FilterContent>
        <Box display="grid" sx={{gap: 3}}>
          <CheckboxGroup>
            <CheckboxGroup.Label>選擇門市</CheckboxGroup.Label>
            <FormControl>
              <Checkbox value="one" />
              <FormControl.Label>大安店</FormControl.Label>
            </FormControl>
            <FormControl>
              <Checkbox value="two" />
              <FormControl.Label>鎮衣店</FormControl.Label>
            </FormControl>
            <FormControl>
              <Checkbox value="three" />
              <FormControl.Label>板橋店</FormControl.Label>
            </FormControl>
          </CheckboxGroup>
        </Box>
      </FilterContent>
      <CloseFilterButton />
    </FilterContainer>
  );
};

const MySupplierFilter: React.FC<BaseFilterProps> = () => {
  return (
    <FilterContainer>
      <FilterContent>
        <Box display="grid" sx={{gap: 3}}>
          <CheckboxGroup>
            <CheckboxGroup.Label>選擇供應商</CheckboxGroup.Label>
            <FormControl>
              <Checkbox value="one" />
              <FormControl.Label>大木博士生化實驗室</FormControl.Label>
            </FormControl>
            <FormControl>
              <Checkbox value="two" />
              <FormControl.Label>天竺鼠車車化肥廠</FormControl.Label>
            </FormControl>
            <FormControl>
              <Checkbox value="three" />
              <FormControl.Label>尤達生技</FormControl.Label>
            </FormControl>
          </CheckboxGroup>
        </Box>
      </FilterContent>
      <CloseFilterButton />
    </FilterContainer>
  );
};

const MyDateRangeFilter: React.FC<BaseFilterProps> = () => {
  return (
    <FilterContainer>
      <FilterContent>我是 date range picker</FilterContent>
      <CloseFilterButton />
    </FilterContainer>
  );
};

function App() {
  return (
    <>
    <ThemeProvider>
        <BaseStyles>
      <FilterBar onResetButtonClick={() => console.log("onResetButtonClick")}>
        <MyBranchFilter filterName="門市篩選器" anchorLabel="門市" />
        <MySupplierFilter filterName="供應商篩選器" anchorLabel="供應商" />
        <MyDateRangeFilter
          filterName="訂單建立日期 filter"
          anchorLabel="訂單建立時間"
        />
      </FilterBar>
      </BaseStyles>
      </ThemeProvider>

      {/* <div style={{ height: 100 }}></div>

      <ThemeProvider>
        <BaseStyles>
          <PrimerMenu />
        </BaseStyles>
      </ThemeProvider> */}
    </>
  );
}

export default App;
