<<<<<<< HEAD
import { Form, Link, useSubmit } from "@remix-run/react";
=======
import { Form, Link, useParams, useSubmit } from "@remix-run/react";
>>>>>>> a84ba05 (undo copy update)
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
<<<<<<< HEAD
import { faqsType } from "./faqs";
import { ActionArgs, redirect } from "@remix-run/node";
import { probesType } from "./retort_.options.$rid_.probes";
=======
import { ActionArgs, redirect } from "@remix-run/node";
import { ProbeFormValues } from "./retort_.options.$rid_.probes_.$pid";
import { deleteProbe } from "~/resolvers/probe";
>>>>>>> a84ba05 (undo copy update)



export async function action({ request, params }: ActionArgs) {
    

    const formData = await request.formData();
    const id = formData.get('id')
    const ctx = {
        id
    }
    console.log("ctx delete")
    console.log(ctx)
<<<<<<< HEAD
    // try {
    //     await editFaqs({ ctx })
    //     return redirect('/faqs')
    // } catch (error) {
    //     return error;
    // }


    return redirect(`/retort/options/${params.rid}/probes`);
};


export default function DeleteProbeDialog(props: { res: probesType }) {
    const id = "urn:uuid:a87a8c0b-674d-4766-9f54-1466e21e75b3"
    const submit = useSubmit();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.id);
        submit(formData, { method: "post", action: `/retort/options/${id}/probes/delete`});
=======
    try {
        await deleteProbe({ ctx })
        return redirect(`/retort/options/${params.rid}/probes`)
    } catch (error) {
        return error;
    }

};


export default function DeleteProbeDialog(props: { res: ProbeFormValues }) {

    const submit = useSubmit();
    const { rid } = useParams();
    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.id);
        submit(formData, { method: "post", action: `/retort/options/${rid}/probes/delete`});
>>>>>>> a84ba05 (undo copy update)
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button variant={"ghost"}><Trash2 className="mr-2 h-4 w-4" /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader className="justify-center items-center">
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{props.res.probe}</DialogDescription>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleSubmit}>Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}