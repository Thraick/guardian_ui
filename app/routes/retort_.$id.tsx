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
import { retort_topic_Type } from "./retort";



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const retort_topic = formData.get('retort_topic')
    const id = formData.get('id')
    const ctx = {
        retort_topic,
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


    return redirect('/retort');
};


export async function loader({ params }: LoaderArgs) {

    try {
        console.log(params.id)
        const response = await httpRequest("get_retort", { id: params.id })
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
    const loaderData = dataset as retort_topic_Type;

    const [formData, setFormData] = useState<retort_topic_Type>(
        loaderData || { id: "", retort_topic: ""}
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
                    <h1 className="text-2xl font-bold">Update Retort</h1>
                    <Link to={'/retort'}>
                        <Button variant={"ghost"}><X /></Button>
                    </Link>
                </div>
                <div className="mb-4">
                    <Label htmlFor="retort_topic"
                    >
                        Retort Topic
                    </Label>
                    <Input
                        name="retort_topic"
                        type="text"
                        value={formData.retort_topic}
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
    "id": "urn:uuid:6b17437e-3799-426f-aff5-d4aefa93b508",
    "retort_topic": "accident"
}