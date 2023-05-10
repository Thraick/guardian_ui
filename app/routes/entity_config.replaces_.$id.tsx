import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link, useActionData, useCatch, useLoaderData, useSubmit } from "@remix-run/react";
import { X } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";
import { useState } from "react";
import * as z from 'zod';
import { editLabel } from "~/resolvers/configLabel";
import { editReplace } from "~/resolvers/configReplace";


const keySchema = z.string().nonempty({ message: 'Key is required' });
const valueSchema = z.string().nonempty({ message: 'Value is required' });
const idSchema = z.string().nonempty({ message: 'Id is required' });

const schema = z.object({
    key: keySchema,
    value: valueSchema,
    id: idSchema
});

export type ReplaceFormValues = z.infer<typeof schema>;


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const key = formData.get('key')
    const value = formData.get('value')
    const id = formData.get('id')
    const ctx = {
        key,
        value,
        id
    }
    try {
        const payload = await editReplace({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/entity_config/replaces')
    } catch (error) {
        return error;
    }
};


export async function loader({ params }: LoaderArgs) {

    try {
        console.log(params.id)
        const response = await httpRequest("get_replace", { id: params.id })
        const memories = response.payload
        console.log(memories)
        return memories;
    } catch (error) {
        console.log("error")
        console.log(error)
        throw error
        // return error;
    }

}


export default function EntityConfig() {
    
    const loaderData = useLoaderData() as ReplaceFormValues;
    const submit = useSubmit();
    const actionData = useActionData();
    const [formValues, setFormValues] = useState<ReplaceFormValues>({ key: loaderData.key, value: loaderData.value, id: loaderData.id } || { id: "", key: "", value: "" });
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

    function handleSubmit({ formValues }: { formValues: ReplaceFormValues }) {
        const formData = new FormData();
        formData.append('key', formValues.key);
        formData.append('value', formValues.value);
        formData.append('id', formValues.id);
        submit(formData, { method: 'post', action: `/entity_config/replaces/${formValues.id}` });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Update Replace</h1>
                        <Link to={'/entity_config/replaces'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="key">Key</Label>
                        <Input
                            name="key"
                            type="text"
                            value={formValues.key}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'key')?.message ? <div>{formErrors.find((error) => error.path[0] === 'key')?.message}</div> : null}
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="value">Value</Label>
                        <Input
                            name="value"
                            type="text"
                            value={formValues.value}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'value')?.message ? <div>{formErrors.find((error) => error.path[0] === 'value')?.message}</div> : null}
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
        </div>
    )

}