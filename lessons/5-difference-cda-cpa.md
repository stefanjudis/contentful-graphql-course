# The difference of CDA and CPA

```
REACT_APP_SPACE_ID=i92a80bbjogl
REACT_APP_CDA_TOKEN=mpVMNJzL6x3FtgoEh_xGnWUSkLfFFpx3ly7EcT61kJ0
REACT_APP_CPA_TOKEN=GkhHY1PfnxVV9-hn5-g6tDNxURmLHoQxwzyX-sZ8nFM
REACT_APP_IS_PREVIEW=TRUE
```

```javascript
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const {
  REACT_APP_SPACE_ID,
  REACT_APP_CDA_TOKEN,
  REACT_APP_CPA_TOKEN,
  REACT_APP_IS_PREVIEW,
} = process.env;

const isPreview = REACT_APP_IS_PREVIEW === 'TRUE';

function App() {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${
            isPreview ? REACT_APP_CPA_TOKEN : REACT_APP_CDA_TOKEN
          }`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query {
            authorCollection(where: {
              name_contains: "Stefan"
            }, ${isPreview ? 'preview: true' : ''} ) {
              items {
                sys {
                  id
                }

                name
              }
            }
          }
        `,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        const { data } = json;
        const person = data.authorCollection.items[0];
        setPerson(person);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {person ? <span>{person.name}</span> : <span>loading ...</span>}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```
