### curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{ "query": "{ getBook(id: 5) { title } }" }' \
    http://localhost:4000/graphql


### query
    query {
      getBook(id: 3) {
        title
        author {
          name
        }
      }      
      getBookPromise(id: 3) {
        id
        title
      }
    }

### mutation
    mutation {
      createBook(id: 3, title: "abc", authorName: "efg") {
        id
        title
        author {
          name
        }
      }
    }

