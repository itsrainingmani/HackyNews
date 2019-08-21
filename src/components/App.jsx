import React from 'react';
import Layout from './Layout';
import Stories from './Stories';
import { Route, Switch } from 'react-router-dom';

export default class App extends React.Component {
  static displayName = App.name;

  render() {
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
}
