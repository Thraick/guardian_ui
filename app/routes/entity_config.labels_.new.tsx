import { ActionArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { newFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";





export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const label = formData.get('label')
    const ctx = {
        label
    }
    console.log("ctx")
    console.log(ctx)
    // try {
    //     await editFaqs({ ctx })
    //     return redirect('/faqs')
    // } catch (error) {
    //     return error;
    // }
    

    return redirect('/entity_config/labels');
};



export default function NewLabel() {

    return (
        <div className="flex justify-center items-center h-screen">

            <Form method="post" action="" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">New Label</h1>
                    <Link to={'/entity_config/labels'}>
                        <Button variant={"ghost"}><X /></Button>
                    </Link>
                </div>

                <div className="mb-4">
                    <Label htmlFor="label"
                    >
                        label
                    </Label>
                    <Input
                        name="label"
                        type="text"
                        autoFocus
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" variant={"secondary"}>Create</Button>
                </div>
            </Form>
        </div>
    )
}
