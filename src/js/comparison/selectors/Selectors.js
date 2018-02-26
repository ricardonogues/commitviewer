import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import Comparison from "./../../common/Schema"; 

const getResult = (state) => state.comparison.result;
const getComparisons = (state) => state.comparison.comparisons;
const getCommits = (state) => state.comparison.commits;

export const getComparisonsArray = createSelector(
	[getResult, getComparisons, getCommits],
	(result, comparisons, commits) => {
		return denormalize(result, [Comparison], {
			comparisons, commits   
		});
	}
)