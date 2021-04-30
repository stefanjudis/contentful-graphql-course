# Get the data into React

```javascript
function App() {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch(`https://graphql.contentful.com/content/v1/spaces/i92a80bbjogl`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer mpVMNJzL6x3FtgoEh_xGnWUSkLfFFpx3ly7EcT61kJ0`,
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
    })
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
