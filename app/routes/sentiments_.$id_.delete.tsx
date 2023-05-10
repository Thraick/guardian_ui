import { useParams, useSubmit } from "@remix-run/react";
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
import { deleteSentiment, deleteStatement } from "~/resolvers/sentiment";
import { SentimentFormValues, StatementFormValues } from "./sentiments_.$id";



export async function action({ request, params}: ActionArgs) {
    const formData = await request.formData();
    const id = formData.get('id')
    const ctx = { id }
    try {
        console.log(ctx)
        await deleteStatement({ ctx })
        return redirect(`/sentiments/${params.id}`)
    } catch (error) {
        return error;
    }
};


export default function DeleteStatementDialog(props: { res: StatementFormValues }) {
    const submit = useSubmit();
    const {id} = useParams();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.id);
        submit(formData, { method: "post", action: `/sentiments/${id}/delete` });
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button variant={"ghost"}><Trash2 className="mr-2 h-4 w-4" /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader className="justify-center items-center">
                        <DialogTitle>Delete Statement</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Would you like to delete?</DialogDescription>
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