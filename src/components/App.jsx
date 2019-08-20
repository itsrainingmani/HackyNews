import React from 'react';
import Menus from './Menus';
import Stories from './Stories';
import { Router } from '@reach/router';

export default function App() {
  return (
    <div>
      <Menus>
        <Router>
          <Stories type="top" path="/" />
          <Stories type="best" path="/best" />
          <Stories type="new" path="/new" />
        </Router>
      </Menus>
    </div>
  );
}
