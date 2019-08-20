import React, { useState, useEffect } from 'react';

function App() {
  const [ping, setPing] = useState(null);
  const callExpressAPI = async () => {
    let response = await fetch('/ping');
    let body = await response.text();

    if (!response.ok) throw Error('Something went wrong');
    else return body;
  };

  useEffect(() => {
    callExpressAPI()
      .then(data => setPing(data))
      .catch(data => setPing(data));
  });

  return (
    <div>
      <header>
        <p>{ping}</p>
        <p>
          Love you
          <span role="img" aria-label="sparkly heart">
            💖
          </span>
        </p>
      </header>
    </div>
  );
}

export default App;
