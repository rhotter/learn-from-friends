// submit topics
"use client";
import { FieldPath, UseFormReturn } from "react-hook-form";
import * as z from "zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Person } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const Options = ({
  form,
  items,
  formFieldName,
  label,
  description,
}: {
  form: UseFormReturn<z.infer<any>>;
  items: { label: string; value: any; person?: Person }[];
  formFieldName: FieldPath<z.infer<any>>;
  label: string;
  description?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              {items.map((item) => (
                <FormItem
                  key={item.value}
                  className="flex items-center space-x-3 space-y-0 cursor-pointer"
                >
                  <FormControl>
                    <RadioGroupItem
                      value={item.value}
                      className="border-gray-500"
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
