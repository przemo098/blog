import {Store} from "../../utils/Store.ts";

interface ICvFilterState {
  isFeSelected: boolean;
  isBeSelected: boolean;
  isDevOpsSelected: boolean;
  // update: (values: Partial<ICvFilterState>) => void;
  // switchFeFilter: () => void;
  // switchBeFilter: () => void;
  // switchDevOpsFilter: () => void;
}

/* eslint-disable */

export const CvState = new Store<ICvFilterState>({
    isFeSelected: false,
    isDevOpsSelected: false,
    isBeSelected: false,
    // switchFeFilter: () => CvState.set(previous =>({isFeSelected: !previous.isFeSelected})),
});
// Object.create()
export const CvSateController = {
    switchFeFilter: () => CvState.update(({isFeSelected: !CvState.state.isFeSelected})),
    switchBeFilter: () => CvState.update(({isBeSelected: !CvState.state.isBeSelected})),
    switchDevOpsFilter: () => CvState.update(({isDevOpsSelected: !CvState.state.isDevOpsSelected})),
}




/* eslint-disable */
