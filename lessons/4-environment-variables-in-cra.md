# Environment variables in Create react app

REACT_APP_SPACE_ID=... REACT_APP_CDA_TOKEN npm start

```javascript
function App() {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CDA_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query {
            authorCollection(where: {
              name_contains: "Stefan"
            }) {
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
```
