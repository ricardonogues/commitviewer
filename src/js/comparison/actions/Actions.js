export const REANALYSE_END = "REANALYSE_END";
export const REANALYSE_START = "REANALYSE_START";
export const TOGGLE_PROVIDER_STATUS = "TOGGLE_PROVIDER_STATUS";
export const TOGGLE_EMAIL_STATUS = "TOGGLE_EMAIL_STATUS";

export function reanalyse(id) {
	return dispatch => {
		dispatch({
			type: REANALYSE_START,
			payload: { id, status: "fetching" }
		});

		return fetch("http://localhost:3000/reanalyse")
			.then(response => response.json())
			.then(comparison => {
				// Fake request time
				setTimeout(() => {
					// Here we are explicitly setting the status to fail.
					// In a real world situation we should have error handling for the fetch so
					// that we could correctly set the status.
					dispatch({
						type: REANALYSE_END,
						payload: { comparison: Object.assign({}, { status: "fail" }, comparison[0]) }
					});
				}, 5000);
			});
	}
}

export function toggleEmailStatus(id) {
	return {
		type: TOGGLE_EMAIL_STATUS,
		payload: { id }
	}
}

export function toggleProviderStatus(id) {
	return {
		type: TOGGLE_PROVIDER_STATUS,
		payload: { id }
	}
}