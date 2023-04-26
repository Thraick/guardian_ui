import { ActionFunction, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { newFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";


export const action: ActionFunction = async ({ request }) => {

    const formData = await request.formData();
    const question = formData.get('question')
    const answer = formData.get('answer')
    const ctx = {
        question,
        answer
    }
    console.log("ctx")
    console.log(ctx)
    await newFaqs({ ctx })

    return redirect('/faqs');
};



export default function NewFaqs() {

    return (
        <div className="flex justify-center items-center h-screen">

            <Form method="post" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">New Faq</h1>
                    <Link to={'/faqs'}>
                        <Button variant={"ghost"}><X /></Button>
                    </Link>
                </div>

                <div className="mb-4">
                    <Label htmlFor="question"
                    >
                        Question
                    </Label>
                    <Input
                        name="question"
                        type="text"
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="answer"
                    >
                        Answer
                    </Label>
                    <Textarea
                        name="answer"
                        rows={3}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" variant={"secondary"}>Create</Button>
                </div>
            </Form>
        </div>
    )
}
