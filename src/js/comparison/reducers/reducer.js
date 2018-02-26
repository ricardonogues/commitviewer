import update from "immutability-helper";
import { REANALYSE_END, REANALYSE_START, TOGGLE_EMAIL_STATUS, TOGGLE_PROVIDER_STATUS } from "./../actions/Actions";

const initialState = [];

function reanalyse(state, comparison) {
	return update(state, {
		comparisons: {
			[comparison.id]: {
				$merge: comparison
			}
		}
	})
}

function toggleEmailStatus(state, id) {
	return update(state, {
		commits: {
			[id]: {
				notifications: {
					email: { $set: !state.commits[id].notifications.email }
				}
			}
		}
	});
}

function toggleProviderStatus(state, id) {
	return update(state, {
		commits: {
			[id]: {
				notifications: {
					provider: { $set: !state.commits[id].notifications.provider }
				}
			}
		}
	});
}

function changeStatus(state, status, id) {
	return update(state, {
		comparisons: {
			[id]: {
				status: { $set: status }
			}
		}
	});
}

export default function comparisonsReducer(state = initialState, action) {
	switch (action.type) {
		case REANALYSE_END:
			return reanalyse(state, action.payload.comparison);
			break;
		case REANALYSE_START:
			return changeStatus(state, action.payload.status, action.payload.id);
			break;
		case TOGGLE_EMAIL_STATUS:
			return toggleEmailStatus(state, action.payload.id);
			break;
		case TOGGLE_PROVIDER_STATUS:
			return toggleProviderStatus(state, action.payload.id);
			break;
		default:
			return state;
	}
}