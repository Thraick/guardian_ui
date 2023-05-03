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


const questionSchema = z.string().min(3, { message: 'Question must be at least 3 characters long' }).nonempty({ message: 'Question is required' });
const answerSchema = z.string().min(3, { message: 'Answer must be at least 3 characters long' }).nonempty({ message: 'Answer is required' });

const schema = z.object({
    question: questionSchema,
    answer: answerSchema,
});

type FormValues = z.infer<typeof schema>;


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const question = formData.get('question')
    const answer = formData.get('answer')
    const ctx = {
        question,
        answer
    }
    try {
        console.log(ctx)
        const payload = await newFaqs({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/faqs')
    } catch (error) {
        return error;
    }
};


export default function NewFaqs() {
    const submit = useSubmit();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<FormValues>({ question: '', answer: '' });
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
        formData.append('question', formValues.question);
        formData.append('answer', formValues.answer);
        submit(formData, { method: 'post', action: '/faqs/new' });
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">New Faq</h1>
                        <Link to={'/faqs'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="question">Question</Label>
                        <Input
                            name="question"
                            type="text"
                            value={formValues.question}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'question')?.message ? <div>{formErrors.find((error) => error.path[0] === 'question')?.message}</div> : null}
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="answer">Answer</Label>
                        <Textarea
                            name="answer"
                            rows={3}
                            value={formValues.answer}
                            onChange={handleInputChange}
                        />
                        {formErrors.find((error) => error.path[0] === 'answer')?.message ? (<div>{formErrors.find((error) => error.path[0] === 'answer')?.message}</div>) : null}
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


const payload = [
    {
        "id": "urn:uuid:3cfc9a25-04c8-4aa0-8097-a278493e88cdq",
        "question": "Who built this?",
        "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
    },
    {
        "id": "urn:uuid:75f4d116w-4396-42e7-9c55-fbb15b2q263b3",
        "question": "What is this all about?",
        "answer": "This is a conversational state machine built on Jaseci."
    },
    {
        "id": "urn:uuid:3cfcw9a25-04c8-4aa0-8097-a278493e88cdq",
        "question": "Who built this?",
        "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
    },
    {
        "id": "urn:uuid:75f4d116-4w396-42e7-9c55-fbb15b2q263b3",
        "question": "What is this all about?",
        "answer": "This is a conversational state machine built on Jaseci."
    },
    {
        "id": "urn:uuid:3cfc9a25-04c8-4aaw0-8097-a278493e88cdq",
        "question": "Who built this?",
        "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
    },
    {
        "id": "urn:uuid:75wf4d116-4396-42e7-9c55-fbb15b2q263b3",
        "question": "What is this all about?",
        "answer": "This is a conversational state machine built on Jaseci."
    },
    {
        "id": "urn:uuid:3cfc9a2w5-04c8-4aa0-8097-a278493e88cdq",
        "question": "Who built this?",
        "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
    },
    {
        "id": "urn:uuid:w75f4d116-4396-42e7-9c55-fbb15b2q263b3",
        "question": "What is this all about?",
        "answer": "This is a conversational state machine built on Jaseci."
    },
    {
        "id": "urn:uuid:w75f4d116-439w6-42e7-9c55-fbb15b2q263b3",
        "question": "Name of project?",
        "answer": "This is a conversational state machine built on Jaseci."
    }
]