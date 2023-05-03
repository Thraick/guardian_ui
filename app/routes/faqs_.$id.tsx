import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { editFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link, useActionData, useLoaderData, useParams, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";
import { useState } from "react";
import * as z from 'zod';


const questionSchema = z.string().min(3, { message: 'Question must be at least 3 characters long' }).nonempty({ message: 'Question is required' });
const answerSchema = z.string().min(3, { message: 'Answer must be at least 3 characters long' }).nonempty({ message: 'Answer is required' });
const idSchema = z.string().nonempty({ message: 'Id is required' });

const schema = z.object({
    question: questionSchema,
    answer: answerSchema,
    id: idSchema
});

export type FaqFormValues = z.infer<typeof schema>;


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const question = formData.get('question')
    const answer = formData.get('answer')
    const id = formData.get('id')
    const ctx = {
        question,
        answer,
        id
    }
    try {
        console.log(ctx)
        const payload = await editFaqs({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/faqs')
    } catch (error) {
        return error;
    }
};


export async function loader({ params }: LoaderArgs) {

    try {
        console.log(params.id)
        const response = await httpRequest("get_faq", { id: params.id })
        const memories = response.payload || null
        console.log(memories)
        return memories;
    } catch (error) {
        console.log("error")
        console.log(error)
        return error;
    }
}


export default function UpdateFaqs() {
    const loaderData = useLoaderData() as FaqFormValues;
    const submit = useSubmit();
    const { id } = useParams();
    let faqId = ""
    if(id) {
        faqId = id
    }
    const actionData = useActionData();
    const [formValues, setFormValues] = useState<FaqFormValues>({ question: loaderData.question, answer: loaderData.answer, id: faqId } || { id: "", question: "", answer: "" });
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

    function handleSubmit({ formValues }: { formValues: FaqFormValues }) {
        const formData = new FormData();
        formData.append('question', formValues.question);
        formData.append('answer', formValues.answer);
        if(id) formData.append('id', formValues.id);
        submit(formData, { method: 'post', action: `/faqs/${formValues.id}` });
    }

    return (
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
                        {formErrors.find((error) => error.path[0] === 'answer')?.message ? <div>{formErrors.find((error) => error.path[0] === 'answer')?.message}</div> : null}

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
