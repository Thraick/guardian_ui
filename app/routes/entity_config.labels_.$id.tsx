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
import { labelType } from "./entity_config.labels";



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const label = formData.get('label')
    const id = formData.get('id')
    const ctx = {
        label,
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


    return redirect('/entity_config/labels');
};


export async function loader({ params }: LoaderArgs) {

    try {
        console.log(params.id)
        const response = await httpRequest("get_label", { id: params.id })
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
    const loaderData = dataset as labelType;

    const [formData, setFormData] = useState<labelType>(
        loaderData || { id: "", label: "" }
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
                    <h1 className="text-2xl font-bold">Update Label</h1>
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
                        value={formData.label}
                        onChange={handleInputChange}
                        autoFocus
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
    "id": "urn:uuwid:1d066s90f-1816-4747-9106-80cf59105ae6",
    "label": "taxi_number"
}