import React, { Component } from "react";

import Commit from "./Commit";
import { Table } from "react-bootstrap";

export default class CommitList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="commit-viewer__list">
				<Table responsive>
					<thead>
						<tr>
							<th width="10%">Type</th>
							<th>Commit ID</th>
							<th>Commit UUID</th>
							<th>Parent UUID</th>
							<th>Author timestamp</th>
							<th>Commit timestamp</th>
							<th>Created</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.commits.map((commit, index) => {
							return <Commit commit={commit} key={index} />;
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}