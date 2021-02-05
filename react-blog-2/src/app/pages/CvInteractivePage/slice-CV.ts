import { createSlice } from 'utils/@reduxjs/toolkit';

export interface ICvFilterState {
  isFeSelected: boolean;
  isBeSelected: boolean;
  isDevOpsSelected: boolean;
}

export const initialState: ICvFilterState = {
  isFeSelected: false,
  isBeSelected: false,
  isDevOpsSelected: false,
};

export const sliceCV = createSlice({
  name: 'cvFilters',
  initialState,
  reducers: {
    switchFeFilter(state) {
      state.isFeSelected = !state.isFeSelected;
    },
    switchBeFilter(state) {
      state.isBeSelected = !state.isBeSelected;
    },
    switchDevOpsFilter(state) {
      state.isDevOpsSelected = !state.isDevOpsSelected;
    },
  },
});

export const {
  actions: cvFilterActions,
  reducer: cvFilterReducer,
  name: keyCv,
} = sliceCV;
