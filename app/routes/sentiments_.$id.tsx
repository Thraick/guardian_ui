import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { editFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";
import { useState } from "react";
import * as z from 'zod';


const statementSchema = z.string().min(3, { message: 'Statement must be at least 3 characters long' }).nonempty({ message: 'Statement is required' });
const sentimentSchema = z.string().min(3, { message: 'Sentiment must be at least 3 characters long' }).nonempty({ message: 'Sentiment is required' });
const idSchema = z.string().nonempty({ message: 'Id is required' });

const schema = z.object({
    statement: statementSchema,
    sentiment: sentimentSchema,
    id: idSchema
});

export type SentimentFormValues = z.infer<typeof schema>;



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const sentiment = formData.get('sentiment')
    const statement = formData.get('statement')
    const id = formData.get('id')
    const ctx = {
        sentiment,
        statement,
        id
    }
    try {
        const payload = await editFaqs({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/sentiments')
    } catch (error) {
        return error;
    }
};


 
export async function loader({ params }: LoaderArgs) {

    try {
        console.log(params.id)
        const response = await httpRequest("get_sentiment", { id: params.id })
        const memories = response.payload || null
        console.log(memories)
        return memories;
    } catch (error) {
        console.log("error")
        console.log(error)
        return error;
    }
}



export default function Sentiments() {

    const loaderData = useLoaderData() as SentimentFormValues;
    const submit = useSubmit();
    const actionData = useActionData();
    const [formValues, setFormValues] = useState<SentimentFormValues>({ sentiment: loaderData.sentiment, statement: loaderData.statement, id: loaderData.id } || { id: "", sentiment: "", statement: "" });
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

    function handleSubmit({ formValues }: { formValues: SentimentFormValues }) {
        const formData = new FormData();
        formData.append('sentiment', formValues.sentiment);
        formData.append('statement', formValues.statement);
        formData.append('id', formValues.id);
        submit(formData, { method: 'post', action: `/faqs/${formValues.id}` });
    }
    return (
        <>
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Update Faq</h1>
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
                    <div className="mb-6">
                        <Label htmlFor="statement">Statement</Label>
                        <Textarea
                            name="statement"
                            rows={3}
                            value={formValues.statement}
                            onChange={handleInputChange}
                        />
                        {formErrors.find((error) => error.path[0] === 'statement')?.message ? <div>{formErrors.find((error) => error.path[0] === 'statement')?.message}</div> : null}

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
        </>
    );
}
