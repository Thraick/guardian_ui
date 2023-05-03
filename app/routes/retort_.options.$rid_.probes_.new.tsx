import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { newFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link, useActionData, useLoaderData, useParams, useSearchParams, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";

import * as z from 'zod';
import { useEffect, useState } from "react";
import { createProbe, updateProbe } from "~/resolvers/probe";
import { httpRequest } from "~/utils/httpRequest";
import { LabelFormValues } from "./entity_config.labels_.$id";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { localStorageService } from "~/resolvers/cache";
import { ProbeFormValues } from "./retort_.options.$rid_.probes_.$pid";



const probeSchema = z.string().nonempty({ message: 'Probe is required' });
const idSchema = z.string().nonempty({ message: 'Id is required' });

const schema = z.object({
    probe: probeSchema,
    id: idSchema
});

type FormValues = z.infer<typeof schema>;



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
    try {
        const payload = await createProbe({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect(`/retort/options/${params.rid}/probes`);
    } catch (error) {
        return error;
    }
};


export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_label", {})
        const memories = response.payload
        console.log(memories)
        return memories;

    } catch (error) {
        return error;
    }
}


export default function NewProbe() {

    const [retortTopic, setRetortTopic] = useState('');
    const loaderData = useLoaderData() as LabelFormValues[];

    useEffect(() => {

        const probe_list = localStorageService.getItem('probe_list') as ProbeFormValues;
        console.log("probeList")
        console.log(probe_list)
        console.log(loaderData)

        const retort_topic = localStorageService.getItem('retort_topic') as string;
        setRetortTopic(retort_topic);
    }, []);
    
    const { rid } = useParams();



    const submit = useSubmit();
    const actionData = useActionData();
    console.log(actionData)

    const [formValues, setFormValues] = useState<FormValues>({ probe: '', id: rid || '' });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const validationResult = schema.safeParse(formValues);
        if (validationResult.success) {
            console.log("formValues")
            console.log(formValues)
            // Handle successful form submission
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            setFormErrors(validationResult.error.issues);
        }
    };

    function handleSubmit({ formValues }: { formValues: FormValues }) {
        const formData = new FormData();
        formData.append('probe', formValues.probe);
        if (rid) formData.append('id', rid);
        console.log(formData)
        submit(formData, { method: 'post', action: `/retort/options/${rid}/probes/new` });
    }

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Select a Probe for {retortTopic}</h1>
                        <Link to={`/retort/options/${rid}/probes`}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4">
                        <select
                            id="probe"
                            name="probe"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formValues.probe}
                            onChange={(event) => setFormValues({ ...formValues, probe: event.target.value })}
                            autoFocus
                        >
                            <option value="" disabled defaultValue={""}>Select Probe</option>

                            {loaderData.map((res: LabelFormValues) => (
                                <option key={res.id} value={res.label}>
                                    {res.label}
                                </option>
                            ))}
                        </select>
                        {formErrors.find((error) => error.path[0] === 'probe')?.message ? (<div>{formErrors.find((error) => error.path[0] === 'probe')?.message}</div>) : null}

                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" variant={"secondary"}>Create</Button>
                        <Link to={'/entity_config/labels/new'}>
                            <Button variant={"secondary"}>New Config Label</Button>
                        </Link>
                    </div>
                </Form>
                {
                    actionData?.warning &&
                    <div className="bg-yellow-100 text-center text-yellow-700 p-4" role="alert">
                        <p className="font-bold">Warning</p>
                        <p>{actionData?.warning}</p>
                    </div>
                }
            </div>
        </div>
    )
}
