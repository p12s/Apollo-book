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
  }
};
