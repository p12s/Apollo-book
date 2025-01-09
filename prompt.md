# Book Management Application with GraphQL and React

Build a full-stack book management application with the following features:

1. Backend (Apollo GraphQL Server):
- Set up a GraphQL server using Apollo Server
- Define Book type with fields: id, title, author, and year
- Implement Query type with:
  - books: Returns all books
  - book(id: ID!): Returns a specific book by ID
- Implement Mutation type with:
  - createBook(input: CreateBookInput!): Creates a new book
- Add authentication middleware that requires a Bearer token "12345-this-is-secret-token"
- Return 401 Unauthorized for missing or invalid tokens

2. Frontend (React + shadcn/ui):
- Create a responsive layout with multiple sections
- Implement components:
  - BookSearch: Search for books by ID
  - BookDetails: Display detailed book information
  - AddBookForm: Form to add new books
  - Home: Main page with all components
- Use react-query for data fetching
- Add proper error handling and loading states
- Include authentication token in all GraphQL requests

3. Features:
- View all books in a grid layout with cards
- Click on a book card to view details in a modal
- Search for books by ID with error handling for non-existent books
- Add new books with validation:
  - Title and author required
  - Year between 1000 and current year
- Display appropriate error messages for:
  - Authentication failures
  - Invalid input
  - Network errors
  - Non-existent books

4. UI/UX:
- Clean, modern design using shadcn/ui components
- Responsive grid layout
- Loading states and error messages
- Modal dialogs for detailed views
- Form validation with error messages
- Interactive hover states on cards
- Toast notifications for successful actions

Note: All GraphQL requests must include the authorization header:
`Authorization: Bearer 12345-this-is-secret-token`
