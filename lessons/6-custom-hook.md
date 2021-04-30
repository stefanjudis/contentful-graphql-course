# Extract a custom hook

```javascript
import React from 'react';
import logo from './logo.svg';
import useContentful from './hooks/contentful.js';
import './App.css';

const { REACT_APP_IS_PREVIEW } = process.env;

const isPreview = REACT_APP_IS_PREVIEW === 'TRUE';

function App() {
  const data = useContentful(`
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
  `);

  const author = data ? data.authorCollection.items[0] : null;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {author ? <span>{author.name}</span> : <span>loading ...</span>}
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

```javascript
import { useState, useEffect } from 'react';

const {
  REACT_APP_SPACE_ID,
  REACT_APP_CDA_TOKEN,
  REACT_APP_CPA_TOKEN,
  REACT_APP_IS_PREVIEW,
} = process.env;

const isPreview = REACT_APP_IS_PREVIEW === 'TRUE';

function useContentful(query) {
  const [data, setData] = useState(null);

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
          query,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        const { data } = json;
        setData(data);
      });
  }, [query]);

  return data;
}

export default useContentful;
```
