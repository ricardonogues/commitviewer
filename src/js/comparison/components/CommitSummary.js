import React, { Component } from "react";
import { reanalyse } from "./../actions/Actions";
import { connect } from "react-redux";
import classnames from "classnames";

import { Panel, Label, Button, Glyphicon, Grid, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

class CommitSummary extends Component {
	constructor(props) {
		super(props);
	}

	getValueLabel(value) {
		return value === 0 ? "=" : value < 0 ? value.toString() : "+" + value;
	}

	render() {
		const { issues, duplication, complexity, coverage } = this.props.change;
		const tagClasses = classnames({
			"success": this.props.uptostandards,
			"danger": !this.props.uptostandards
		});
		const buttonClasses = classnames("button", {
			"button--loading": this.props.status === "fetching",
			"button--error": this.props.status === "error",
		})
		return (
			<Panel className="comparison__summary">
				<Grid fluid={true}>
					<Row className="show-grid">
						<Col xs={12} md={8}>
							<div className="comparison__summary__status">
								<Label bsStyle={tagClasses}>{this.props.uptostandards ? "Up to standards" : "Not up to standards"}</Label>
								<div className="comparison__changes">
									<Grid fluid={true}>
										<Col md={2}>
											<div className="definition-description">{this.getValueLabel(issues)}</div>
											<div className="definition-title">Issues</div>
										</Col>
										<Col md={2}>
											<div className="definition-description">{this.getValueLabel(duplication)}</div>
											<div className="definition-title">Duplication</div>
										</Col>
										<Col md={2}>
											<div className="definition-description">{this.getValueLabel(complexity)}</div>
											<div className="definition-title">Complexity</div>
										</Col>
										<Col md={2}>
											<div className="definition-description">{this.getValueLabel(coverage)}</div>
											<div className="definition-title">Coverage</div>
										</Col>
									</Grid>
								</div>
							</div>
						</Col>
						<Col xs={6} md={4}>
							<div className="commit-viewer__summary__actions">
								<ButtonWithTooltip status={this.props.status} onClick={this.props.reanalyse} />
								<dl>
									<dt>Comparison ID:</dt>
									<dd>{this.props.id}</dd>
								</dl>
							</div>
						</Col>
					</Row>
				</Grid>
			</Panel>
		);
	}
}

function ButtonWithTooltip({ status, onClick }) {
	return (
		<OverlayTrigger placement="top" overlay={<Tooltip id={"warning-tooltip"}>{status === "fail" ? "Please contact support" : "If patterns were changed, this will trigger  a full analysis to the latest commit applying all changes."}</Tooltip>}>
			<Button bsSize="small" bsStyle={status === "fail" ? "danger" : "primary"} disabled={status === "fetching"} onClick={onClick}>
				{status === "fail" ? <Glyphicon glyph="glyphicon glyphicon-remove-sign" /> : <Glyphicon glyph="glyphicon glyphicon-repeat" />}
				{status === "fetched" ? "Re-analyse latest commit" : status === "fetching" ? "Re-analysing..." : "Something went wrong"}
			</Button>
		</OverlayTrigger>
	);
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		reanalyse: () => {
			dispatch(reanalyse(ownProps.id));
		}
	}
}

export default connect(null, mapDispatchToProps)(CommitSummary);