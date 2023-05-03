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

    const probe = formData.get('probe')
    const id = formData.get('id')
    const ctx = {
        probe,
        id
    }
    console.log("ctx")
    console.log(ctx)
    // try {
    //     await editFaqs({ ctx })
    //     return redirect('/faqs')
    // } catch (error) {
    //     return error;
    // }
    

    return redirect(`/retort/options/${id}/probes`);
};


export default function NewProbe() {
    const id = "urn:uuid:a87a8c0b-674d-4766-9f54-1466e21e75b3"

    return (
        <div className="flex justify-center items-center h-screen">

            <Form method="post" action="" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">New Probe</h1>
                    <Link to={`/retort/options/${id}/probes`}>
                        <Button variant={"ghost"}><X /></Button>
                    </Link>
                </div>

                <div className="mb-4">
                    <Label htmlFor="probe"
                    >
                        Probe
                    </Label>
                    <Input
                        name="probe"
                        type="text"
                    />
                </div>
                <Input name="id" type="hidden" value={id} />
                <div className="flex items-center justify-between">
                    <Button type="submit" variant={"secondary"}>Create</Button>
                </div>
            </Form>
        </div>
    )
}
