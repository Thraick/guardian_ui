import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { editFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { X } from "lucide-react";


export default function AddSentiment(props:{sentiment: any}){
    return(
        <Dialog>
            <DialogTrigger asChild>
            <Button variant={"secondary"}className="bg-primary text-secondary hover:text-primary rounded-medium flex items-center justify-center h-13 py-3 px-3"> Add Sentiment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add {props.sentiment[0].sentiment} Sentiment</DialogTitle>
                <DialogDescription>
                Add a new sentiment. Simply type the new sentiment in the Input field and Click save.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Sentiment
                </Label>
                <Input id="name" type="text" placeholder= "Add New Sentiment" className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}