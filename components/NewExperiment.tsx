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

export const NewExperiment = () => {
  const [experimentName, setExperimentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleOnSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/experiment", {
        method: "POST",
        body: JSON.stringify({ name: experimentName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newExperiment = await response.json();
      router.push(`/experiments/${newExperiment.id}`);
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
          New Experiment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Experiment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Experiment Name
            </Label>
            <Input
              id="name"
              value={experimentName}
              className="col-span-3"
              onChange={(e) => setExperimentName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleOnSave}>
            <Loader isLoading={isLoading} text="New" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
