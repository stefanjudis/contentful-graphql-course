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
          Authorization: `Bearer ${REACT_APP_CDA_TOKEN}`,

          // ${
          // isPreview ? REACT_APP_CPA_TOKEN : REACT_APP_CDA_TOKEN
          // }`,
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
