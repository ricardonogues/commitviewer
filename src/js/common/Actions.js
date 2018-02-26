import { normalize } from 'normalizr';

import Comparison from "./Schema";

export const INIT = "INIT"; // Action to initialize the application.

export function init() {
	return dispatch => {
		return fetch("http://localhost:3000/comparisons")
			.then(response => response.json())
			.then(data => {
				const dataWithStatus = data.map(comparison => { return Object.assign({}, { status: "fetched" }, comparison) });
				const normalizedData = normalize(dataWithStatus, [Comparison]);
				dispatch({
					type: INIT,
					payload: {
						data: normalizedData
					}
				});
			});
	}
}