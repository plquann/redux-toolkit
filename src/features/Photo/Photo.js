import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import AddEdit from './pages/AddEdit/AddEdit';
import MainPage from './pages/MainPage/MainPage';

function Photo(props) {
    const match = useRouteMatch();
    console.log("🚀 ~ match", match);

    return (
        <Switch>
            <Route exact path={match.url} component={MainPage} />

            <Route path={`${match.url}/add`} component={AddEdit} />
            <Route path={`${match.url}/:photoId`} component={AddEdit} />

            <Route component={NotFound} />
        </Switch>
    )
};

Photo.propTypes = {

};

export default Photo;

