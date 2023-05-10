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
import { ConvertComponent, ConvertComponentWithRemove, LabelBadgeRemove } from "~/components/ui/replaceLabel";
import { Badge } from "~/components/ui/badge";
import { deletetfmNerContext } from "~/resolvers/tfmNer";


// const questionSchema = z.string().min(3, { message: 'Question must be at least 3 characters long' }).nonempty({ message: 'Question is required' });
// const answerSchema = z.string().min(3, { message: 'Answer must be at least 3 characters long' }).nonempty({ message: 'Answer is required' });
// const idSchema = z.string().nonempty({ message: 'Id is required' });


const contextSchema = z.object({
    id: z.string(),
    entity_type: z.string(),
    entity_value: z.string(),
});

const dataSchema = z.object({
    id: z.string(),
    utterance: z.string(),
    tfm_utterance: z.string(),

});

const schema = z.object({
    ...dataSchema.shape,
    contexts: z.array(contextSchema),
});

export type TfmNerFormValues = z.infer<typeof schema>;
export type TfmNerValues = z.infer<typeof dataSchema>;



export async function action({ request, params }: ActionArgs) {

    const formData = await request.formData();
    // const formDataContext = await request.formData();
    const question = formData.get('question')
    const answer = formData.get('answer')
    const id = formData.get('id')
    const ctx = {
        question,
        answer,
        id
    }
    try {
        if(id && !question && !answer)
        console.log(ctx)
        const payload = await deletetfmNerContext({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect(`/tfm_ner/${params.id}`)
    } catch (error) {
        return error;
    }
};


export async function loader({ params }: LoaderArgs) {

    try {
        console.log(params.id)
        const response = await httpRequest("get_tfm_ner", { id: params.id })
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
    const loaderData = useLoaderData() as TfmNerFormValues;
    const submit = useSubmit();
    // const { id } = useParams();
    // let faqId = ""
    // if(id) {
    //     faqId = id
    // }
    // const actionData = useActionData();
    // const [formValues, setFormValues] = useState<TfmNerValues>({ tfm_utterance: loaderData.tfm_utterance, utterance: loaderData.utterance, id: faqId } || { id: "", tfm_utterance: "", utterance: "" });
    // const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

    // function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    // };

    // function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     const validationResult = schema.safeParse(formValues);
    //     if (validationResult.success) {
    //         // Handle successful form submission
    //         setFormErrors([])
    //         handleSubmit({ formValues });
    //     } else {
    //         setFormErrors(validationResult.error.issues);
    //     }
    // };

    // function handleSubmit({ formValues }: { formValues: TfmNerValues }) {
    //     const formData = new FormData();
    //     formData.append('tfm_utterance', formValues.tfm_utterance);
    //     formData.append('utterance', formValues.utterance);
    //     if(id) formData.append('id', formValues.id);
    //     submit(formData, { method: 'post', action: `/tfm_ner/${formValues.id}` });
    // }
    

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl w-full">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Update tfm</h1>
                        <Link to={'/tfm_ner'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>
                    {/* <LabelBadgeRemove text="this is ne" /> */}
                    <ConvertComponentWithRemove res={loaderData} />
                    {/* <div className="mb-4">
                        <Label htmlFor="question">Question</Label>
                        <Input
                            name="question"
                            type="text"
                            value={formValues.tfm_utterance}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'tfm_utterance')?.message ? <div>{formErrors.find((error) => error.path[0] === 'tfm_utterance')?.message}</div> : null}
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
                    </div> */}
                </div>

                {/* {
                    actionData &&
                    <div className="bg-yellow-100 text-center text-yellow-700 p-4" role="alert">
                        <p className="font-bold">Warning</p>
                        <p>{actionData}</p>
                    </div>
                } */}
            </div>
        </div>
    )
}

