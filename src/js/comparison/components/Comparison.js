import React, { Component } from "react";

import CommitSummary from "./CommitSummary";
import CommitList from "./CommitList";

export default class Comparison extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { change, up_to_standards, id, commits, status } = this.props.comparison;
		return (
			<div className="comparison">
				<CommitSummary change={change} uptostandards={up_to_standards} id={id} status={status} />
				<CommitList commits={commits} />
			</div>
		);
	}
}

