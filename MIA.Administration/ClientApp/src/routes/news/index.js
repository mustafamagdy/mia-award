import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import NewsList from './NewsList'

const Pages = ({ match }) => {
	return (
    <div className="content-wrapper">
        <Helmet>
            <title>Reactify | Tables</title>
            <meta name="description" content="Reactify Tables" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route path={`${match.url}/list`} component={NewsList} />
        </Switch>
    </div>
);}

export default Pages;
