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
import { probesType } from "./retort_.options.$rid_.probes";
=======
import { Form, Link, useActionData, useLoaderData, useParams, useSearchParams, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";

import { useState } from "react";
import * as z from 'zod';
import { createProbe, updateProbe } from "~/resolvers/probe";
import { cache } from "~/resolvers/cache";


const probeSchema = z.string().min(3, { message: 'Probe must be at least 3 characters long' }).nonempty({ message: 'Probe is required' });
const idSchema = z.string().nonempty({ message: 'Id is required' });

const schema = z.object({
    probe: probeSchema,
    id: idSchema
});

export type ProbeFormValues = z.infer<typeof schema>;

>>>>>>> a84ba05 (undo copy update)



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
<<<<<<< HEAD
    // try {
    //     await editFaqs({ ctx })
    //     return redirect('/faqs')
    // } catch (error) {
    //     return error;
    // }
    

    return redirect(`/retort/options/${params.rid}/probes`);
=======
    try {
        const payload = await updateProbe({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect(`/retort/options/${params.rid}/probes`);
    } catch (error) {
        return error;
    }
>>>>>>> a84ba05 (undo copy update)
};


export async function loader({ params }: LoaderArgs) {

    try {
<<<<<<< HEAD
        console.log(params.id)
        const response = await httpRequest("get_faq", { id: params.id })
=======
        console.log("params.pid")
        console.log(params.pid)
        console.log(params.rid)
        const response = await httpRequest("get_probe", { id: params.pid })
>>>>>>> a84ba05 (undo copy update)
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
=======
    const { rid } = useParams();
    



    // const loaderData = useLoaderData();
    // const loaderData = dataset as probesType;
    // const id = "urn:uuid:a87a8c0b-674d-4766-9f54-1466e21e75b3"

    // const [formData, setFormData] = useState<probesType>(
    //     loaderData || { id: "", probe: "" }
    // );

    // function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value,
    //     });
    // }

    const loaderData = useLoaderData() as ProbeFormValues;
    const submit = useSubmit();
    const actionData = useActionData();
    const [formValues, setFormValues] = useState<ProbeFormValues>({ probe: loaderData.probe, id: loaderData.id } || { id: "", probe: "" });
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

    function handleSubmit({ formValues }: { formValues: ProbeFormValues }) {
        const formData = new FormData();
        formData.append('probe', formValues.probe);
        formData.append('id', formValues.id);
        submit(formData, { method: 'post', action: `/retort/options/${rid}/probes/${formValues.id}` });
>>>>>>> a84ba05 (undo copy update)
    }

    return (
        <div className="flex justify-center items-center h-screen">

<<<<<<< HEAD
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
=======
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Update Probe</h1>
                        <Link to={`/retort/options/${rid}/probes`}>
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
                            value={formValues.probe}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'probe')?.message ? <div>{formErrors.find((error) => error.path[0] === 'probe')?.message}</div> : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" variant={"secondary"}>Update</Button>
                    </div>
                </Form>
                {
                    actionData &&
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

<<<<<<< HEAD

const dataset = {
    "id": "urn:uuid:8b4a8e1b-814c-4b8a-a8d4-a1e3cb2e665c",
    "probe": "date"
  }
=======
>>>>>>> a84ba05 (undo copy update)
