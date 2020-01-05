/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';
import routes from "../routes";

class DefaultLayout extends Component {
	render() {
		const { match } = this.props;
		console.log('default layout ', this.props);
		return (
			<RctAppLayout>
				{routes && routes.map((route,key)=>
					<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</RctAppLayout>
		);
	}
}

export default withRouter(connect(null)(DefaultLayout));
