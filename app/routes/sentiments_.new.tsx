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
import { newSentiment } from "~/resolvers/sentiment";




const sentimentSchema = z.object({
    sentiment: z.string().min(3, { message: 'Sentiment must be at least 3 characters long' }).nonempty({ message: 'Sentiment is required' }),
});
type SentimentSchema = z.infer<typeof sentimentSchema>;


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const sentiment = formData.get('sentiment')

    const ctx = {
        sentiment
    }
    try {
        console.log(ctx)
        const payload = await newSentiment({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/sentiments')
    } catch (error) {
        return error;
    }
};


export default function NewFaqs() {
    const submit = useSubmit();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<SentimentSchema>({ sentiment: ''});
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const validationResult = sentimentSchema.safeParse(formValues);
        if (validationResult.success) {
            // Handle successful form submission
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            setFormErrors(validationResult.error.issues);
        }
    };

    function handleSubmit({ formValues }: { formValues: SentimentSchema }) {
        const formData = new FormData();
        formData.append('sentiment', formValues.sentiment);
        submit(formData, { method: 'post', action: '/sentiments/new' });
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">New Sentiment</h1>
                        <Link to={'/faqs'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="sentiment">Sentiment</Label>
                        <Input
                            name="sentiment"
                            type="text"
                            value={formValues.sentiment}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'sentiment')?.message ? <div>{formErrors.find((error) => error.path[0] === 'sentiment')?.message}</div> : null}
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
