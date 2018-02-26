/******************************************************************************
 *
 * Project: Commit Viewer
 * Description: Redux store
 *
 * File layout:
 *
 * 1 - External packages
 * 2 - Internal packages
 * 3 - State definition
 * 4 - Store definition
 * 		4.1 - Reducers
 *
 *****************************************************************************/

/******************************************************************************
 * 1 - External packages
 *****************************************************************************/

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

/******************************************************************************
 * 2 - Internal packages
 *****************************************************************************/

import { INIT } from "./Actions";
import comparisonsReducer from "./../comparison/reducers/reducer";

/******************************************************************************
 * 3 - State definition
 *****************************************************************************/

const initialState = {
	comparison: {
		comparisons: {},
		commits: {},
		result: []
	}
};

/******************************************************************************
 * 4 - Store definition
 *****************************************************************************/

/******************************************************************************
 * 4.1 - Reducers
 *****************************************************************************/

const reducers = combineReducers({
	comparison: comparisonsReducer
});

const rootReducer = (state = {}, action) => {
	let initialEvents;

	if (action.type === INIT) {
		// If we receive the INIT action hydrate the state
		const { result, entities } = action.payload.data;
		const { comparisons, commits } = entities;

		return {
			comparison: {
				comparisons,
				commits,
				result
			}
		};
	} else {
		// On any other action just process it as is
		return reducers(state, action);
	}
};

// Create the store with the reducer and the data
export default createStore(rootReducer, initialState, applyMiddleware(thunk));
