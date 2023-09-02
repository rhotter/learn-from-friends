// submit topics
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { Person } from "@prisma/client";
import { ComboBoxFormField } from "@/components/ComboBoxFormField";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    personId: z.number({
      required_error: "Please select your name.",
    }),
    firstChoice: z.number({
      required_error: "Please select your first choice topic.",
    }),
    secondChoice: z.number({
      required_error: "Please select your second choice topic.",
    }),
    thirdChoice: z.number({
      required_error: "Please select your third choice topic.",
    }),
  })
  .refine(
    (data) => {
      // if no data yet, don't validate
      if (!data.firstChoice || !data.secondChoice || !data.thirdChoice) {
        return true;
      }

      // Check if first, second, and third choice are different
      return (
        data.firstChoice !== data.secondChoice &&
        data.firstChoice !== data.thirdChoice &&
        data.secondChoice !== data.thirdChoice
      );
    },
    {
      // If the validation fails, this error message will be returned
      message: "The three choices must be different.",
    }
  );

export function TopicSelectionForm({
  names,
  topics,
  eventId,
}: {
  names: { label: string; value: any }[];
  topics: { label: string; value: any; person: Person }[];
  eventId: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      const ret = await fetch("/api/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, eventId }),
      });
      console.log(ret);
    } catch (error) {
    } finally {
      // redirect to submitted page
      router.push(`/event/${eventId}/topic/submitted`);
    }
  }

  const topicsWithoutSelf = topics
    .filter((topic) => topic.person.id !== form.watch("personId"))
    .map((topic) => ({
      ...topic,
      label: `${topic.label} (${topic.person.name})`,
    }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ComboBoxFormField
          form={form}
          items={names}
          formFieldName="personId"
          label="Name"
        />
        <ComboBoxFormField
          form={form}
          items={topicsWithoutSelf}
          formFieldName="firstChoice"
          label="First Choice"
        />

        <ComboBoxFormField
          form={form}
          items={topicsWithoutSelf}
          formFieldName="secondChoice"
          label="Second Choice"
        />

        <ComboBoxFormField
          form={form}
          items={topicsWithoutSelf}
          formFieldName="thirdChoice"
          label="Third Choice"
        />
        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}
