import React from 'react';
import Header from './components/header.js';
import Projects from './components/projects.js';
import Bookmarks from './components/bookmarks.js';
import Footer from './components/footer.js';
import useContentful from './hooks/contentful.js';
import './App.css';

// get started!!!

const query = `
  {
    personCollection(where: {name_contains: "Stefan"}, limit: 1) {
      items {
        name
        bio {
          json
        }
        socialTwitter
        socialGithub
        socialLinkedin
      }
    }

    projectCollection(limit: 10, order: date_ASC) {
      items {
        sys {
          id
        }
        title
        url
        image {
          url
        }
      }
    }

    favBookmarks: tagCollection(where: {title: "Favorite"}, limit: 1) {
      items {
        linkedFrom {
          bookmarkCollection {
            items {
              ...bookmarkInfo
            }
          }
        }
      }
    }

    bookmarkCollection {
      items {
        ...bookmarkInfo
      }
    }
  }

  fragment bookmarkInfo on Bookmark {
    sys {
      id
    }
    title
    comment {
      json
    }
    tagsCollection(limit: 10) {
      items {
        title
      }
    }
  }
`;

function App() {
  const data = useContentful(query);

  if (!data) return <div>Loading ...</div>;

  const person = data.personCollection.items[0];
  const { bookmarkCollection, projectCollection, favBookmarks } = data;

  return (
    <div className="App">
      <Header person={person} />
      <Projects projects={projectCollection.items} />
      <Bookmarks bookmarks={bookmarkCollection.items} />
      <Footer />
    </div>
  );
}

export default App;
