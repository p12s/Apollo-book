import { useQuery } from "@tanstack/react-query";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

interface BookDetailsProps {
  bookId: string;
}

export function BookDetails({ bookId }: BookDetailsProps) {
  const { data: book, isLoading, error } = useQuery<Book>({
    queryKey: ['/api/graphql', bookId],
    queryFn: async () => {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 12345-this-is-secret-token'
        },
        body: JSON.stringify({
          query: `
            query GetBook($id: ID!) {
              book(id: $id) {
                id
                title
                author
                year
              }
            }
          `,
          variables: {
            id: bookId
          }
        }),
      });

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data.book;
    },
  });

  if (isLoading) return <div>Loading book details...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!book) return <div>No book found</div>;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
      <div className="space-y-1 text-sm text-gray-600">
        <p>Author: {book.author}</p>
        <p>Year: {book.year}</p>
        <p>ID: {book.id}</p>
      </div>
    </div>
  );
}