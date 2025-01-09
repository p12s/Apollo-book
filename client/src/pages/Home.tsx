import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddBookForm } from "@/components/AddBookForm";
import { BookDetails } from "@/components/BookDetails";
import { BookSearch } from "@/components/BookSearch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

export default function Home() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const { data: books, isLoading, error } = useQuery<Book[]>({
    queryKey: ['/api/graphql'],
    queryFn: async () => {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetBooks {
              books {
                id
                title
                author
                year
              }
            }
          `
        }),
      });
      const result = await response.json();
      return result.data.books;
    },
  });

  if (isLoading) return <div className="p-4">Loading books...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading books</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Book Search Section */}
      <div className="mb-8">
        <BookSearch />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Add Book Form Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
          <Card>
            <CardContent className="pt-6">
              <AddBookForm />
            </CardContent>
          </Card>
        </div>

        {/* Books List Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Books Library</h2>
          <div className="grid gap-4">
            {books?.map((book) => (
              <Card key={book.id} className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedBookId(book.id)}>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Author: {book.author}</p>
                  <p className="text-sm text-gray-600">Year: {book.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedBookId} onOpenChange={() => setSelectedBookId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
          </DialogHeader>
          {selectedBookId && <BookDetails bookId={selectedBookId} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}