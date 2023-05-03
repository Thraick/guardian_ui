import { ActionArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { newFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
<<<<<<< HEAD
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";


=======
import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import * as z from 'zod';
import { useState } from "react";
import { createLabel } from "~/resolvers/configLabel";


const labelSchema = z.string().min(3, { message: 'Label must be at least 3 characters long' }).nonempty({ message: 'Label is required' });

const schema = z.object({
    label: labelSchema
});

type FormValues = z.infer<typeof schema>;
>>>>>>> a84ba05 (undo copy update)



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const label = formData.get('label')
    const ctx = {
        label
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
        console.log(ctx)
        const payload = await createLabel({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/entity_config/labels')
    } catch (error) {
        return error;
    }
>>>>>>> a84ba05 (undo copy update)
};



export default function NewLabel() {

<<<<<<< HEAD
    return (
        <div className="flex justify-center items-center h-screen">

            <Form method="post" action="" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">New Label</h1>
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
                        autoFocus
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" variant={"secondary"}>Create</Button>
                </div>
            </Form>
=======
    const submit = useSubmit();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<FormValues>({ label: ''});
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
        formData.append('label', formValues.label);
        submit(formData, { method: 'post', action: '/entity_config/labels/new' });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">New Label</h1>
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
                            value={formValues.label}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'label')?.message ? (<div>{formErrors.find((error) => error.path[0] === 'label')?.message}</div>) : null}
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
>>>>>>> a84ba05 (undo copy update)
        </div>
    )
}
