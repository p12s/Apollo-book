import { books, type Book } from "./types";

export const resolvers = {
  Query: {
    books: (): Book[] => {
      return books;
    },
    book: (_: any, { id }: { id: string }): Book | undefined => {
      try {
        const book = books.find(book => book.id === id);
        if (!book) {
          throw new Error(`Book with ID ${id} not found`);
        }
        return book;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
      }
    }
  },
  Mutation: {
    createBook: (_: any, { input }: { input: Omit<Book, 'id'> }): Book => {
      const newBook: Book = {
        id: String(books.length + 1),
        ...input
      };
      books.push(newBook);
      return newBook;
    }
  }
};