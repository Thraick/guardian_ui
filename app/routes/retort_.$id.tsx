import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { editFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
<<<<<<< HEAD
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";
import { faqsType } from "./faqs";
import { useState } from "react";
import { retort_topic_Type } from "./retort";
=======
import { Form, Link, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";
import { useState } from "react";

import * as z from 'zod';


const retort_topicSchema = z.string().min(3, { message: 'Retort Topic must be at least 3 characters long' }).nonempty({ message: 'Retort Topic is required' });
const idSchema = z.string().nonempty({ message: 'Id is required' });

const schema = z.object({
    retort_topic: retort_topicSchema,
    id: idSchema
});

export type Retort_TopicFormValues = z.infer<typeof schema>;
>>>>>>> a84ba05 (undo copy update)



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const retort_topic = formData.get('retort_topic')
    const id = formData.get('id')
    const ctx = {
        retort_topic,
        id
    }
<<<<<<< HEAD
    console.log("ctx")
    console.log(ctx)
    // try {
    //     await editFaqs({ ctx })
    //     return redirect('/faqs')
    // } catch (error) {
    //     return error;
    // }


    return redirect('/retort');
=======
    try {
        const payload = await editFaqs({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/retort')
    } catch (error) {
        return error;
    }
>>>>>>> a84ba05 (undo copy update)
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
<<<<<<< HEAD
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
=======
    // // const loaderData = useLoaderData();
    // const loaderData = dataset as retort_topic_Type;

    // const [formData, setFormData] = useState<retort_topic_Type>(
    //     loaderData || { id: "", retort_topic: ""}
    // );

    // function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value,
    //     });
    // }


    const loaderData = useLoaderData() as Retort_TopicFormValues;
    const submit = useSubmit();
    const actionData = useActionData();
    const [formValues, setFormValues] = useState<Retort_TopicFormValues>({ retort_topic: loaderData.retort_topic, id: loaderData.id } || { id: "", retort_topic: "" });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const validationResult = schema.safeParse(formValues);
        if (validationResult.success) {
            // Handle successful form submission
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            setFormErrors(validationResult.error.issues);
        }
    };

    function handleSubmit({ formValues }: { formValues: Retort_TopicFormValues }) {
        const formData = new FormData();
        formData.append('retort_topic', formValues.retort_topic);
        formData.append('id', formValues.id);
        submit(formData, { method: 'post', action: `/retort/${formValues.id}` });
    }


    return (
        <div className="flex justify-center items-center h-screen">

            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                            value={formValues.retort_topic}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'retort_topic')?.message ? <div>{formErrors.find((error) => error.path[0] === 'retort_topic')?.message}</div> : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" variant={"secondary"}>Update</Button>
                    </div>
                </Form>

                {actionData &&
                    <div className="bg-yellow-100 text-center text-yellow-700 p-4" role="alert">
                        <p className="font-bold">Warning</p>
                        <p>{actionData}</p>
                    </div>
                }
            </div>
>>>>>>> a84ba05 (undo copy update)
        </div>
    )
}


const dataset = {
    "id": "urn:uuid:6b17437e-3799-426f-aff5-d4aefa93b508",
    "retort_topic": "accident"
}