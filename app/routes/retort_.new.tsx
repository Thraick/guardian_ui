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
import { createRetortTopic } from "~/resolvers/retortTopic";


const retort_topicSchema = z.string().min(3, { message: 'Retort Topic must be at least 3 characters long' }).nonempty({ message: 'Retort Topic is required' });

const schema = z.object({
    retort_topic: retort_topicSchema
});

type FormValues = z.infer<typeof schema>;
>>>>>>> a84ba05 (undo copy update)


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const retort_topic = formData.get('retort_topic')
    const ctx = {
        retort_topic
    }
    console.log("ctx")
    console.log(ctx)
<<<<<<< HEAD
    // try {
    //     await editFaqs({ ctx })
    //     return redirect('/faqs')
    // } catch (error) {
    //     return error;
    // }
    

    return redirect('/faqs');
=======
    try {
        console.log(ctx)
        const payload = await createRetortTopic({ ctx })
        if (payload.info.warning) {
            return payload.info.warning;
        }
        return redirect('/retort')
    } catch (error) {
        return error;
    }
>>>>>>> a84ba05 (undo copy update)
};


export default function NewRetort() {

<<<<<<< HEAD
    return (
        <div className="flex justify-center items-center h-screen">

            <Form method="post" action="" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">New Retort</h1>
                    <Link to={'/retort'}>
                        <Button variant={"ghost"}><X /></Button>
                    </Link>
                </div>

                <div className="mb-4">
                    <Label htmlFor="retort_topic"
                    >
                        Retort Topic
                    </Label>
                    <Input
                        name="retort_topic"
                        type="text"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" variant={"secondary"}>Create</Button>
                </div>
            </Form>
=======
    const submit = useSubmit();

    const actionData = useActionData();
    const [formValues, setFormValues] = useState<FormValues>({ retort_topic: '' });
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
        formData.append('retort_topic', formValues.retort_topic);
        submit(formData, { method: 'post', action: '/retort/new' });
    }

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="max-w-2xl w-full">
                <Form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">New Retort</h1>
                        <Link to={'/retort'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="retort_topic"
                        >
                            Retort Topic
                        </Label>
                        <Input
                            name="retort_topic"
                            type="text"
                            value={formValues.retort_topic}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        {formErrors.find((error) => error.path[0] === 'retort_topic')?.message ? <div>{formErrors.find((error) => error.path[0] === 'retort_topic')?.message}</div> : null}
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
