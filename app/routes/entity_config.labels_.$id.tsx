import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
<<<<<<< HEAD
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


=======
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link, useActionData, useCatch, useLoaderData, useSubmit } from "@remix-run/react";
import { X } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";
import { useState } from "react";
import * as z from 'zod';
import { editLabel } from "~/resolvers/configLabel";


const labelSchema = z.string().min(3, { message: 'Label must be at least 3 characters long' }).nonempty({ message: 'Label is required' });
const idSchema = z.string().nonempty({ message: 'Id is required' });

const schema = z.object({
    label: labelSchema,
    id: idSchema
});

export type LabelFormValues = z.infer<typeof schema>;

>>>>>>> a84ba05 (undo copy update)

export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const label = formData.get('label')
    const id = formData.get('id')
    const ctx = {
        label,
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


    return redirect('/entity_config/labels');
=======
    try {
        const payload = await editLabel({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/entity_config/labels')
    } catch (error) {
        return error;
    }
>>>>>>> a84ba05 (undo copy update)
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
<<<<<<< HEAD
        return error;
    }
=======
        throw error
        // return error;
    }

>>>>>>> a84ba05 (undo copy update)
}


export default function UpdateFaqs() {
<<<<<<< HEAD
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
=======

    const loaderData = useLoaderData() as LabelFormValues;
    const submit = useSubmit();
    const actionData = useActionData();
    const [formValues, setFormValues] = useState<LabelFormValues>({ label: loaderData.label, id: loaderData.id } || { id: "", label: "" });
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

    function handleSubmit({ formValues }: { formValues: LabelFormValues }) {
        const formData = new FormData();
        formData.append('label', formValues.label);
        formData.append('id', formValues.id);
        submit(formData, { method: 'post', action: `/entity_config/labels/${formValues.id}` });
>>>>>>> a84ba05 (undo copy update)
    }

    return (
        <div className="flex justify-center items-center h-screen">
<<<<<<< HEAD

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
=======
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Update Label</h1>
                        <Link to={'/entity_config/labels'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="label">label</Label>
                        <Input
                            name="label"
                            type="text"
                            value={formValues.label}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'label')?.message ? <div>{formErrors.find((error) => error.path[0] === 'label')?.message}</div> : null}
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
    "id": "urn:uuwid:1d066s90f-1816-4747-9106-80cf59105ae6",
    "label": "taxi_number"
}
=======
>>>>>>> a84ba05 (undo copy update)
