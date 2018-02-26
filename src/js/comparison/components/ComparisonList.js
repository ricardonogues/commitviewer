import React, { Component } from "react";
import { connect } from "react-redux";

import Comparison from "./Comparison";
import { getComparisonsArray } from "./../selectors/Selectors";

class ComparisonList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="comparisons">
				{this.props.comparisons.map((comparison, index) => {
					return <Comparison comparison={comparison} key={index} />
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		comparisons: getComparisonsArray(state)
	}
}

export default connect(mapStateToProps)(ComparisonList);
