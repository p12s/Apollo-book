import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  year: z.coerce
    .number()
    .min(1000, "Year must be after 1000")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
});

export function AddBookForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      year: new Date().getFullYear(),
    },
  });

  const createBookMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation CreateBook($input: CreateBookInput!) {
              createBook(input: $input) {
                id
                title
                author
                year
              }
            }
          `,
          variables: {
            input: values,
          },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data.createBook;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Book added successfully",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/graphql"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createBookMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormDescription>
                The title of the book
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormDescription>
                The author of the book
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication Year</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter publication year"
                  min="1000"
                  max={new Date().getFullYear()}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The year the book was published
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={createBookMutation.isPending}
        >
          {createBookMutation.isPending ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </Form>
  );
}
