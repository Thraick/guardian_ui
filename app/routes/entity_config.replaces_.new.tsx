import { ActionArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { newFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import * as z from 'zod';
import { useState } from "react";
import { createLabel } from "~/resolvers/configLabel";
import { createReplace } from "~/resolvers/configReplace";




const keySchema = z.string().nonempty({ message: 'Key is required' });
const valueSchema = z.string().nonempty({ message: 'Value is required' });

const schema = z.object({
    key: keySchema,
    value: valueSchema
});

type FormValues = z.infer<typeof schema>;


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const key = formData.get('key')
    const value = formData.get('value')
    const ctx = {
        key,
        value
    }
    try {
        console.log(ctx)
        const payload = await createReplace({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/entity_config/replaces')
    } catch (error) {
        return error;
    }
};



export default function NewReplace() {

    const submit = useSubmit();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<FormValues>({ key: '', value: ''});
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

    function handleSubmit({ formValues }: { formValues: FormValues }) {
        const formData = new FormData();
        formData.append('key', formValues.key);
        formData.append('value', formValues.value);
        submit(formData, { method: 'post', action: '/entity_config/replaces/new' });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">New Replace</h1>
                        <Link to={'/entity_config/labels'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="key"
                        >
                            Key
                        </Label>
                        <Input
                            name="key"
                            type="text"
                            value={formValues.key}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'key')?.message ? (<div>{formErrors.find((error) => error.path[0] === 'key')?.message}</div>) : null}
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="value"
                        >
                            Value
                        </Label>
                        <Input
                            name="value"
                            type="text"
                            value={formValues.value}
                            onChange={handleInputChange}
                        />
                        {formErrors.find((error) => error.path[0] === 'value')?.message ? (<div>{formErrors.find((error) => error.path[0] === 'value')?.message}</div>) : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" variant={"secondary"}>Create</Button>
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
