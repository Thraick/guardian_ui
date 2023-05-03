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
import { faqsType } from "./faqs";
import { ActionArgs, redirect } from "@remix-run/node";
import { labelType } from "./entity_config.labels";



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const id = formData.get('id')
    const ctx = {
        id
    }
    console.log("ctx delete")
    console.log(ctx)
    // try {
    //     await editFaqs({ ctx })
    //     return redirect('/faqs')
    // } catch (error) {
    //     return error;
    // }


    return redirect('/entity_config/labels');
};



export default function DeletelabelDialog(props: { res: labelType }) {
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
                            <Button type="submit" autoFocus onClick={handleSubmit}>Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}