import React from 'react';
import Layout from './Layout';
import Stories from './Stories';
import { Route, Switch } from 'react-router-dom';
import CommentSection from './Comments';

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route
          exact
          path="/best"
          render={props => <Stories {...props} type="best" page={1} />}
        />
        <Route
          path="/best/:page"
          render={props => (
            <Stories {...props} type="best" page={props.match.params.page} />
          )}
        />
        <Route
          exact
          path="/new"
          render={props => <Stories {...props} type="new" page={1} />}
        />
        <Route
          exact
          path="/new/:page"
          render={props => (
            <Stories {...props} type="new" page={props.match.params.page} />
          )}
        />
        <Route
          exact
          path="/ask"
          render={props => <Stories {...props} type="ask" page={1} />}
        />
        <Route
          exact
          path="/ask/:page"
          render={props => (
            <Stories {...props} type="ask" page={props.match.params.page} />
          )}
        />
        <Route
          exact
          path="/show"
          render={props => <Stories {...props} type="show" page={1} />}
        />
        <Route
          exact
          path="/show/:page"
          render={props => (
            <Stories {...props} type="show" page={props.match.params.page} />
          )}
        />
        <Route
          exact
          path="/job"
          render={props => <Stories {...props} type="job" page={1} />}
        />
        <Route
          exact
          path="/job/:page"
          render={props => (
            <Stories {...props} type="job" page={props.match.params.page} />
          )}
        />
        <Route
          exact
          path="/item/:itemId"
          render={props => (
            <CommentSection {...props} itemId={props.match.params.itemId} />
          )}
        />
        <Route
          exact
          path="/"
          render={props => <Stories {...props} type="top" page={1} />}
        />
        <Route
          path="/:page"
          render={props => (
            <Stories {...props} type="top" page={props.match.params.page} />
          )}
        />
      </Switch>
    </Layout>
  );
}
