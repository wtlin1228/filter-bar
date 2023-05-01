type State = {
  openedFilters: Set<string>;
  enabledFilters: Set<string>;
};

type Actions =
  | { type: "enableFilter"; filterName: string }
  | { type: "disableFilter"; filterName: string }
  | { type: "resetFilters"; filterNames: string[] }
  | { type: "openFilter"; filterName: string }
  | { type: "closeFilter"; filterName: string };

export const reducer = (state: State, action: Actions): State => {
  console.log({ action, state });
  switch (action.type) {
    case "enableFilter":
      if (state.enabledFilters.has(action.filterName)) {
        return state;
      }
      state.enabledFilters.add(action.filterName);
      return {
        ...state,
        enabledFilters: new Set(state.enabledFilters),
      };

    case "disableFilter":
      if (!state.enabledFilters.has(action.filterName)) {
        return state;
      }
      state.enabledFilters.delete(action.filterName);
      return {
        ...state,
        enabledFilters: new Set(state.enabledFilters),
      };

    case "resetFilters":
      return {
        openedFilters: new Set(),
        enabledFilters: new Set(action.filterNames),
      };

    case "openFilter":
      if (state.openedFilters.has(action.filterName)) {
        return state;
      }
      state.openedFilters.add(action.filterName);
      return {
        ...state,
        openedFilters: new Set(state.openedFilters),
      };

    case "closeFilter":
      if (!state.openedFilters.has(action.filterName)) {
        return state;
      }
      state.openedFilters.delete(action.filterName);
      return {
        ...state,
        openedFilters: new Set(state.openedFilters),
      };

    default:
      return state;
  }
};
