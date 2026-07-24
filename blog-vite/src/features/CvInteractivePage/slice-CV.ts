import {Store} from "../../utils/Store";

interface ICvFilterState {
  isFeSelected: boolean;
  isBeSelected: boolean;
  isDevOpsSelected: boolean;
  isAiSelected: boolean;
}

const defaultState: ICvFilterState = {
  isFeSelected: false,
  isDevOpsSelected: false,
  isBeSelected: false,
  isAiSelected: false,
}

export const CvState = new Store<ICvFilterState>(defaultState);
export const CvSateController = {
  switchFeFilter: () => CvState.update(({isFeSelected: !CvState.state.isFeSelected})),
  switchBeFilter: () => CvState.update(({isBeSelected: !CvState.state.isBeSelected})),
  switchDevOpsFilter: () => CvState.update(({isDevOpsSelected: !CvState.state.isDevOpsSelected})),
  switchAiFilter: () => CvState.update(({isAiSelected: !CvState.state.isAiSelected})),
  resetFilters: () => CvState.update((defaultState)),
}
