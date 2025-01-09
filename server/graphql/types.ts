// Define the Book type for TypeScript
export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

// Mock data
export const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    year: 1949
  }
];
