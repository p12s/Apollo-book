import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookDetails } from "./BookDetails";

const formSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
});

export function BookSearch() {
  const [searchedId, setSearchedId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSearchedId(values.bookId);
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Book by ID</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="bookId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </Form>

      {searchedId && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Search Result</h3>
          <BookDetails bookId={searchedId} />
        </div>
      )}
    </Card>
  );
}
