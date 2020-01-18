import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
 import boothList from './boothList'

const Pages = ({ match }) => {
	return (
    <div className="content-wrapper">
        <Helmet>
            <title>Booth | Table</title>
            <meta name="description" content="Booth Table" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route path={`${match.url}/list`} component={boothList} />
        </Switch>
    </div>
);}

export default Pages;

