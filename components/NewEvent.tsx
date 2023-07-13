"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader } from "./Loader";

export const NewEvent = () => {
  const [eventName, setEventName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleOnSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify({ name: eventName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newEvent = await response.json();
      router.push(`/event/${newEvent.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Event Name
            </Label>
            <Input
              id="name"
              value={eventName}
              className="col-span-3"
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleOnSave}>
            <Loader isLoading={isLoading}>New</Loader>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
