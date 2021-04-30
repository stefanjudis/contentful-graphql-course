# Make your first GraphQL request using GraphiQL

create an empty space and set up a author model
-> name / image

https://graphql.contentful.com/content/v1/spaces/i92a80bbjogl
---> no auth

https://graphql.contentful.com/content/v1/spaces/i92a80bbjogl?access_token=mpVMNJzL6x3FtgoEh_xGnWUSkLfFFpx3ly7EcT61kJ0
---> no query

https://graphql.contentful.com/content/v1/spaces/i92a80bbjogl/explore?access_token=mpVMNJzL6x3FtgoEh_xGnWUSkLfFFpx3ly7EcT61kJ0

```
# get all authors
query {
  authorCollection {
    items {
      sys {
        id
      }

      name
    }
  }
}
```

```
# get myself
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
```

```
# get myself with an ID
query {
  author(id: "2RkPHsdq2Bx8f9QHMvEL00") {
    name
  }
}
```
