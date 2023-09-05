import {Store} from "../../utils/Store.ts";

interface ICvFilterState {
  isFeSelected: boolean;
  isBeSelected: boolean;
  isDevOpsSelected: boolean;
}

const defaultState: ICvFilterState = {
  isFeSelected: false,
  isDevOpsSelected: false,
  isBeSelected: false,
}

export const CvState = new Store<ICvFilterState>(defaultState);
export const CvSateController = {
  switchFeFilter: () => CvState.update(({isFeSelected: !CvState.state.isFeSelected})),
  switchBeFilter: () => CvState.update(({isBeSelected: !CvState.state.isBeSelected})),
  switchDevOpsFilter: () => CvState.update(({isDevOpsSelected: !CvState.state.isDevOpsSelected})),
  resetFilters: () => CvState.update((defaultState)),
}
