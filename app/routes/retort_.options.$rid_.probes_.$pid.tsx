import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { editFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";
import { faqsType } from "./faqs";
import { useState } from "react";
import { probesType } from "./retort_.options.$rid_.probes";



export async function action({ request, params }: ActionArgs) {

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
    

    return redirect(`/retort/options/${params.rid}/probes`);
};


export async function loader({ params }: LoaderArgs) {

    try {
        console.log(params.id)
        const response = await httpRequest("get_faq", { id: params.id })
        const memories = response.payload
        console.log(memories)
        return memories;
    } catch (error) {
        console.log("error")
        console.log(error)
        return error;
    }
}


export default function UpdateFaqs() {
    // const loaderData = useLoaderData();
    const loaderData = dataset as probesType;
    const id = "urn:uuid:a87a8c0b-674d-4766-9f54-1466e21e75b3"

    const [formData, setFormData] = useState<probesType>(
        loaderData || { id: "", probe: "" }
    );

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <div className="flex justify-center items-center h-screen">

            <Form method="post" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Update Probe</h1>
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
                        value={formData.probe}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                <Input
                        name="id"
                        type="hidden"
                        value={formData.id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" variant={"secondary"}>Update</Button>
                </div>
            </Form>
        </div>
    )
}


const dataset = {
    "id": "urn:uuid:8b4a8e1b-814c-4b8a-a8d4-a1e3cb2e665c",
    "probe": "date"
  }