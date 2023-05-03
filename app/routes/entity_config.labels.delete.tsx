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



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const id = formData.get('id')
    const ctx = {
        id
    }
    console.log("ctx delete")
    console.log(ctx)
    try {
        await deleteLabel({ ctx })
        return redirect('/entity_config/labels')
    } catch (error) {
        return error;
    }
};



export default function DeletelabelDialog(props: { res: LabelFormValues }) {
    const submit = useSubmit();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.id);
        submit(formData, { method: "post", action: "/entity_config/labels/delete" });
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button variant={"ghost"}><Trash2 className="mr-2 h-4 w-4" /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader className="justify-center items-center">
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{props.res.label}</DialogDescription>
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