import { ActionArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { newFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link, useActionData, useParams, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";

import * as z from 'zod';
import { useState } from "react";
import { newStatement } from "~/resolvers/sentiment";




const statementSchema = z.object({
    id: z.string().nonempty({ message: 'ID is required' }),
    statement: z.string().min(3, { message: 'Statement must be at least 3 characters long' }).nonempty({ message: 'Statement is required' }),
});
type StatementSchema = z.infer<typeof statementSchema>;


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const new_statement = formData.get('new_statement')
    const id = formData.get('id')

    const ctx = {
        new_statement,
        id
    }
    try {
        console.log(ctx)
        const payload = await newStatement({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect(`/sentiments/${id}`)
    } catch (error) {
        return error;
    }
};


export default function NewFaqs() {
    const submit = useSubmit();
    const {id} = useParams();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<StatementSchema>({ statement: '', id: ""});
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(id) formValues.id= id
        const validationResult = statementSchema.safeParse(formValues);
        if (validationResult.success) {
            // Handle successful form submission
            console.log(formValues)
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            console.log(validationResult.error.issues)
            setFormErrors(validationResult.error.issues);
        }
    };

    function handleSubmit({ formValues }: { formValues: StatementSchema }) {
        const formData = new FormData();
        formData.append('new_statement', formValues.statement);
        formData.append('id', formValues.id);
        // if(id) formData.append('id', id);
        
        submit(formData, { method: 'post', action: `/sentiments/${id}/statement` });
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">New Statement</h1>
                        <Link to={'/faqs'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="statement">Statement</Label>
                        <Input
                            name="statement"
                            type="text"
                            value={formValues.statement}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'statement')?.message ? <div>{formErrors.find((error) => error.path[0] === 'statement')?.message}</div> : null}
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
