import { useSubmit } from "@remix-run/react";
import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Dialog, DialogClose, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";

import { ActionArgs, redirect } from "@remix-run/node";
import { deleteFaqs } from "~/resolvers/faqs";
import { FaqFormValues } from "./faqs_.$id";
import { deleteSentiment } from "~/resolvers/sentiment";
import { SentimentFormValues } from "./sentiments_.$id";



export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const id = formData.get('id')
    const ctx = { id }
    try {
        console.log(ctx)
        await deleteSentiment({ ctx })
        return redirect('/sentiments')
    } catch (error) {
        return error;
    }
};


export default function DeleteSentimentDialog(props: { res: SentimentFormValues }) {
    const submit = useSubmit();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.id);
        submit(formData, { method: "post", action: "/sentiments/delete" });
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button variant={"ghost"}><Trash2 className="mr-2 h-4 w-4" /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader className="justify-center items-center">
                        <DialogTitle>Delete Faq</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{props.res.sentiment}</DialogDescription>
                    <div>
                        <h4>{props.res.statement}</h4>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" autoFocus onClick={handleSubmit}>Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}