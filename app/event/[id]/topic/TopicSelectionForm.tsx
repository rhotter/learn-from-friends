// submit topics
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { Person } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Options } from "./Options";

import ordinal from "ordinal";

interface TopicSelectionFormProps {
  names: { label: string; value: any }[];
  topics: { label: string; value: any; person: Person }[];
  eventId: number;
  numPreferences?: number;
}

const generateFormSchema = (numPreferences: number) => {
  let schema: Record<string, any> = {
    personId: z.number({ required_error: "Please select your name." }),
  };

  for (let i = 1; i <= numPreferences; i++) {
    schema[`choice${i}`] = z.number({
      required_error: `Please select your ${ordinal(i)} choice topic.`,
    });
  }

  return z.object(schema).refine(
    (data) => {
      const choices: number[] = [];
      for (let i = 1; i <= numPreferences; i++) {
        if (data[`choice${i}`]) {
          choices.push(data[`choice${i}`]);
        }
      }
      return new Set(choices).size === choices.length;
    },
    {
      message: "All choices must be different.",
      path: ["root"],
    }
  );
};

export const TopicSelectionForm: React.FC<TopicSelectionFormProps> = ({
  names,
  topics,
  eventId,
  numPreferences = 3,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const FormSchema = generateFormSchema(numPreferences);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      // Collect dynamically named form fields into choices array
      const choices: number[] = [];
      for (let i = 1; i <= numPreferences; i++) {
        choices.push(data[`choice${i}`]);
      }

      const ret = await fetch("/api/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personId: data.personId,
          eventId,
          choices,
        }),
      });
      console.log(ret);
      // redirect to submitted page if there's no error
      if (ret.ok) {
        router.push(`/event/${eventId}/topic/submitted?type=select`);
        router.refresh();
      } else {
        const errorData = await ret.json();
        alert(errorData.message);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const topicsWithoutSelf = topics
    .filter((topic) => topic.person.id !== form.watch("personId"))
    .map((topic) => ({
      ...topic,
      label: `${topic.label} (${topic.person.name})`,
    }));

  const choices = Array.from({ length: numPreferences }, (_, i) =>
    form.watch(`choice${i + 1}`)
  );

  const isNotUnique =
    choices.filter((choice, index) => choices.indexOf(choice) !== index)
      .length > 0;

  const isAllChoicesPicked = choices.every((choice) => !!choice);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Options
          form={form}
          items={names}
          formFieldName="personId"
          label="Your name"
        />
        {Array.from({ length: numPreferences }, (_, i) => (
          <Options
            key={i}
            form={form}
            items={topicsWithoutSelf}
            formFieldName={`choice${i + 1}`}
            label={`${ordinal(i + 1)} Choice`}
          />
        ))}
        <SubmitButton isLoading={isLoading} />
        <div className="text-red-500 text-sm">
          {isAllChoicesPicked &&
            isNotUnique &&
            `The ${numPreferences} choices must be different.`}
        </div>
      </form>
    </Form>
  );
};
