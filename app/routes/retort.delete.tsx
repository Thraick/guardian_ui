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
<<<<<<< HEAD
import { faqsType } from "./faqs";
import { ActionArgs, redirect } from "@remix-run/node";
import { retort_topic_Type } from "./retort";
=======
import { ActionArgs, redirect } from "@remix-run/node";
import { Retort_TopicFormValues } from "./retort_.$id";
import { deleteRetortTopic } from "~/resolvers/retortTopic";
>>>>>>> a84ba05 (undo copy update)



export async function action({ request }: ActionArgs) {

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


    return redirect('/retort');
};


export default function DeleteRetortDialog(props: { res: retort_topic_Type }) {
=======
    try {
        await deleteRetortTopic({ ctx })
        return redirect('/retort')
    } catch (error) {
        return error;
    }
};


export default function DeleteRetortDialog(props: { res: Retort_TopicFormValues }) {
>>>>>>> a84ba05 (undo copy update)
    const submit = useSubmit();

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', props.res.id);
        submit(formData, { method: "post", action: "/retort/delete" });
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button variant={"ghost"}><Trash2 className="mr-2 h-4 w-4" /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader className="justify-center items-center">
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{props.res.retort_topic}</DialogDescription>
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