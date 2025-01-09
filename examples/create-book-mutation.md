# GraphQL Mutation Example - Create Book

You can add a new book using this GraphQL mutation via a POST request to `/api/graphql`:

```graphql
mutation CreateNewBook {
  createBook(input: {
    title: "The Hobbit"
    author: "J.R.R. Tolkien"
    year: 1937
  }) {
    id
    title
    author
    year
  }
}
```

## cURL Example
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation CreateNewBook { createBook(input: { title: \"The Hobbit\", author: \"J.R.R. Tolkien\", year: 1937 }) { id title author year } }"}' \
  http://localhost:5000/api/graphql
```

## Expected Response
```json
{
  "data": {
    "createBook": {
      "id": "4",
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "year": 1937
    }
  }
}
```
