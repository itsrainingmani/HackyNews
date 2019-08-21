import React from 'react';
import Layout from './Layout';
import Stories from './Stories';
import { Router } from '@reach/router';

export default class App extends React.Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Router>
          <Stories type="top" default />
          <Stories type="top" path="/:page" />
          <Stories type="best" path="best" />
          <Stories type="best" path="best/:page" />
          <Stories type="new" path="new" />
          <Stories type="new" path="new/:page" />
        </Router>
      </Layout>
    );
  }
}
