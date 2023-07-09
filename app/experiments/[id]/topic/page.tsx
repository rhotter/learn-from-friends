// submit topics

"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Layout } from "@/components/basic-layout";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  topic: z.string().min(2, {
    message: "Topic must be at least 1 character.",
  }),
});

export default function Page({ params }: { params: { id: number } }) {
  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1>Topic Submission</h1>
        <div className="mb-8 text-slate-500 text-sm">
          <div className="mb-2">Submit a topic to teach for 15 min.</div>
          <div>
            Some examples:
            <ul>
              <li>- How to exponentially speed up evolution</li>
              <li>
                - Star Wars and the basics of International Relations Theory
              </li>
            </ul>
          </div>
        </div>
        <TopicSubmission id={params.id} />
      </div>
    </Layout>
  );
}

function TopicSubmission({ id }: { id: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="My name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input
                  placeholder="An introduction to neurotechnology"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
