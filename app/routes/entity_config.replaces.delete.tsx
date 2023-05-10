import { Form, Link, useSubmit } from "@remix-run/react";
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
import { LabelFormValues } from "./entity_config.labels_.$id";
import { deleteLabel } from "~/resolvers/configLabel";
import { deleteReplace } from "~/resolvers/configReplace";
import { ReplaceFormValues } from "./entity_config.replaces_.$id";



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const id = formData.get('id')
    const ctx = {
        id
    }
    console.log("ctx delete")
    console.log(ctx)
    try {
        await deleteReplace({ ctx })
        return redirect('/entity_config/replaces')
    } catch (error) {
        return error;
    }
};



export default function DeleteReplaceDialog(props: { res: ReplaceFormValues }) {
    const submit = useSubmit();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.id);
        submit(formData, { method: "post", action: "/entity_config/replaces/delete" });
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button variant={"ghost"}><Trash2 className="mr-2 h-4 w-4" /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader className="justify-center items-center">
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Would you like to delete <strong>{props.res.key}</strong>?</DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" autoFocus onClick={handleSubmit} >Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}