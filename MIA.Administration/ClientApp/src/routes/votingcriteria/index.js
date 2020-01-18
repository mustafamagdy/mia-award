import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
 import votingcriteriaList from './votingcriteriaList'

const Pages = ({ match }) => {
	return (
    <div className="content-wrapper">
        <Helmet>
            <title>VotingCriteria | Table</title>
            <meta name="description" content="VotingCriteria Table" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route path={`${match.url}/list`} component={votingcriteriaList} />
        </Switch>
    </div>
);}

export default Pages;

