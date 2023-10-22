"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TeachingBlock } from "./FormGroups";
import { Loader } from "@/components/Loader";
import { ChevronRight } from "lucide-react";
import { PersonPreferences } from "@/components/TopicPreferences";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { ComboBoxFormField } from "@/components/ComboBoxFormField";

export const FormGroupsButton = ({
  eventId,
  setBlocks,
  setStatus,
  disabled,
  peoplePreferences,
}: {
  eventId: number;
  setBlocks: (blocks: TeachingBlock[]) => void;
  setStatus: (status: string) => void;
  disabled?: boolean;
  peoplePreferences: PersonPreferences[];
}) => {
  const isOddNumberOfPeople = peoplePreferences.length % 2 === 1;

  const [isLoading, setIsLoading] = useState(false);

  const formGroups = async (excludePresenterId?: number) => {
    setIsLoading(true);
    try {
      const result = await fetch(`/api/groups`, {
        method: "POST",
        body: JSON.stringify({ eventId, excludePresenterId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultJson = await result.json();
      setBlocks(resultJson.results);
      setStatus(resultJson.status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isOddNumberOfPeople ? (
    <FormGroupButtonDialog
      formGroups={formGroups}
      disabled={disabled}
      isLoading={isLoading}
      peoplePreferences={peoplePreferences}
    />
  ) : (
    <FormGroupsButtonInner
      handleOnClick={() => formGroups()}
      disabled={disabled}
      isLoading={isLoading}
    />
  );
};

const FormSchema = z.object({
  personId: z.number(),
});

const FormGroupButtonDialog = ({
  formGroups = () => {},
  disabled,
  isLoading,
  peoplePreferences,
}: {
  formGroups?: (excludePresenterId?: number) => void;
  disabled?: boolean;
  isLoading: boolean;
  peoplePreferences: PersonPreferences[];
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      personId: 0,
    },
  });

  const people = peoplePreferences.map((person) => ({
    label: person.name,
    value: person.id,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>
          <Loader isLoading={isLoading}>
            Form groups
            <ChevronRight className="ml-2 h-4 w-4" />
          </Loader>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data: z.infer<typeof FormSchema>) => {
              formGroups(data.personId);
            })}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Odd number of people</DialogTitle>
            </DialogHeader>
            <div className="text-xs text-gray-500">
              Since the number of people is odd, you'll need to select 1 person
              who won't present and will instead be a student twice.
            </div>
            <ComboBoxFormField
              form={form}
              items={people}
              formFieldName="personId"
              label="Person who won't present"
            />
            <DialogFooter>
              <Button type="submit">
                <Loader isLoading={isLoading}>
                  Form groups
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Loader>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const FormGroupsButtonInner = ({
  handleOnClick = () => {},
  disabled = false,
  isLoading = false,
}: {
  handleOnClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => (
  <Button onClick={handleOnClick} disabled={disabled}>
    <Loader isLoading={isLoading}>
      Form groups
      <ChevronRight className="ml-2 h-4 w-4" />
    </Loader>
  </Button>
);
