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

          <select
            onChange={(e) => field.onChange(Number(e.target.value))}
            defaultValue=""
            className="block w-full px-3 py-2 mt-1 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          >
            <option value="" disabled></option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
