import React from 'react';
import Menus from './Menus';
import Stories from './Stories';
import { Router } from '@reach/router';

export default function App() {
  return (
    <div>
      <Menus>
        <Router>
          <Stories type="top" default />
          <Stories type="top" path="/:page" />
          <Stories type="best" path="best" />
          <Stories type="best" path="best/:page" />
          <Stories type="new" path="new" />
          <Stories type="new" path="new/:page" />
        </Router>
      </Menus>
    </div>
  );
}
