import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Route,
	NavLink
} from 'react-router-dom';

import { ButtonGroup, Button } from 'react-bootstrap';

import MissingRoute from "./MissingRoute";
import ComparisonList from "./comparison/components/ComparisonList";
import { init } from "./common/Actions";
import Store from "./common/Store";

import "./../scss/main.scss";

// Root component definition
class CommitViewer extends Component {
	constructor(props) {
		super(props);

		this.unsubscribe = null;
	}

	// Component lifecycle
	componentDidMount() {
		// Dispatch initial action to hydrate state
		Store.dispatch(init());

		// Subscribe to the store to check that state hydration is complete
		this.unsubscribe = Store.subscribe(() => {
			// Set is loading false
			if (Store.getState().comparisons) {
				// Unsubscribe from the store to prevent any unforseen side effects
				this.unsubscribe();
			}
		});
	}

	render() {
		return (
			<Provider store={Store}>
				<Router>
					<div className="commit-viewer__container">
						<ButtonGroup className="commit-viewer__navigation" id="navigation">
							<Button><NavLink exact to="/" activeClassName="selected">Analysis status</NavLink></Button>
							<Button><NavLink exact to="/logs" activeClassName="selected">Logs</NavLink></Button>
							<Button><NavLink exact to="/comparison" activeClassName="selected">Comparison</NavLink></Button>
						</ButtonGroup>
						<section className="commit-viewer__content">
							<Route exact path="/" component={MissingRoute} />
							<Route path="/logs" component={MissingRoute} />
							<Route path="/comparison" component={ComparisonList} />
						</section>
					</div>
				</Router>
			</Provider>
		);
	}
}

// Mount the root component into the DOM
ReactDOM.render(<CommitViewer />, document.querySelector('.commit-viewer'));