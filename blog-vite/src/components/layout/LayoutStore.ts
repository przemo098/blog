import { Store } from "../../utils/Store";

interface ILayoutStore {
	isSideBarVisible: boolean;
}

export const LayoutStore = new Store<ILayoutStore>({ isSideBarVisible: false });
export const LayoutController = {
	toggleSiderbarVisibility: () => LayoutStore.update({ isSideBarVisible: !LayoutStore.state.isSideBarVisible })
};
