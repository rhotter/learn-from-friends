// submit topics
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { FieldPath, UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export const TopicSelection = ({ experimentId }: { experimentId: number }) => (
  <div className="mx-auto">
    <h1>Topic Selection</h1>
    <div className="mb-8 text-slate-500 text-sm">
      <div className="mb-2">
        Now it's time to pick what topics you want to learn!
      </div>
    </div>
    <TopicSelectionForm experimentId={experimentId} />
  </div>
);

const names = [
  { label: "Raffi", value: 1 },
  { label: "Marley", value: 2 },
  { label: "Steve", value: 3 },
  { label: "Santi", value: 4 },
  { label: "Aayush", value: 5 },
];

const topics = [
  { label: "Intro to neurotechnology", value: 1 },
  {
    label:
      "Star Wars and the basics of International Relations Theory and a lot lot lot more words",
    value: 2,
  },
  { label: "Topic C", value: 3 },
  // Add more topics as needed
];

const FormSchema = z.object({
  nameId: z.number({
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
});

function TopicSelectionForm({ experimentId }: { experimentId: number }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ComboBoxFormField
          form={form}
          items={names}
          formFieldName="nameId"
          label="Name"
        />
        <ComboBoxFormField
          form={form}
          items={topics}
          formFieldName="firstChoice"
          label="First Choice"
        />

        <ComboBoxFormField
          form={form}
          items={topics}
          formFieldName="secondChoice"
          label="Second Choice"
        />

        <ComboBoxFormField
          form={form}
          items={topics}
          formFieldName="thirdChoice"
          label="Third Choice"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const ComboBoxFormField = ({
  form,
  items,
  formFieldName,
  label,
  description,
}: {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  items: { label: string; value: any }[];
  formFieldName: FieldPath<z.infer<typeof FormSchema>>;
  label: string;
  description?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between py-2",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : "Select..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup className="max-w-sm">
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      onSelect={() => {
                        form.setValue(formFieldName, item.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          item.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
