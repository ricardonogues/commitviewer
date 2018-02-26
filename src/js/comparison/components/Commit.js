import React, { Component } from "react";
import { connect } from "react-redux";
import copy from "copy-to-clipboard";
import { Button, Glyphicon, Table } from "react-bootstrap";

import { toggleEmailStatus, toggleProviderStatus } from "./../actions/Actions";

class Commit extends Component {
	constructor(props) {
		super(props);

		this.state = { open: false };
		this.toggleDetails = this.toggleDetails.bind(this);
		this.copyToClipboard = this.copyToClipboard.bind(this);
	}

	toggleDetails() {
		this.setState({ open: !this.state.open });
	}

	copyToClipboard() {
		copy(this.props.commit.uuid);
	}

	render() {
		const { commit } = this.props;
		return (
			<React.Fragment>
				<tr>
					<td>{commit.type}</td>
					<td>{commit.id}</td>
					<td><div onClick={this.copyToClipboard} className="uuid">{commit.uuid}</div></td>
					<td>{commit.parent}</td>
					<td>{commit.author_timestamp}</td>
					<td>{commit.commit_timestamp}</td>
					<td>{commit.created}</td>
					<td>
						<Button onClick={this.toggleDetails} bsSize="xsmall" bsStyle="link">{this.state.open ? "Hide details" : "More details"}<Glyphicon glyph={this.state.open ? "glyphicon glyphicon-menu-up" : "glyphicon glyphicon-menu-down"} /></Button>
					</td>
				</tr>
				<tr>
					<td colSpan="8" style={{ padding: 0 }}>
						<Table style={{ height: this.state.open ? "initial" : "0px", overflow: "hidden", display: "block", padding: this.state.open ? "10px" : "0px", margin: 0, width: "100%" }}>
							<thead>
								<tr>
									<th>Author</th>
									<th>Message</th>
									<th>Clone started</th>
									<th>Clone ended</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{commit.author.name} ({commit.author.email})</td>
									<td>{commit.message}</td>
									<td>{commit.statistics.clone_started}</td>
									<td>{commit.statistics.clone_ended}</td>
									<td>
										<Button onClick={this.props.toggleProviderStatus} bsStyle="link"><Glyphicon glyph="glyphicon glyphicon-ok-circle" style={{ color: commit.notifications.provider ? "green" : "red" }} /></Button>
										<Button onClick={this.props.toggleEmailStatus} bsStyle="link"><Glyphicon glyph="glyphicon glyphicon-envelope" style={{ color: commit.notifications.email ? "green" : "red" }} /></Button>
									</td>
								</tr>
							</tbody>
						</Table>
					</td>
				</tr>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		toggleProviderStatus: () => {
			dispatch(toggleProviderStatus(ownProps.commit.uuid));
		},
		toggleEmailStatus: () => {
			dispatch(toggleEmailStatus(ownProps.commit.uuid));
		}
	}
}

export default connect(null, mapDispatchToProps)(Commit);