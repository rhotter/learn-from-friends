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

import { useState } from "react";
import { Person } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ComboBoxFormField = ({
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
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue>
                  {items.find((item) => item.value === field.value)?.label}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
