import { ActionArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { newFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const question = formData.get('question')
    const answer = formData.get('answer')
    const ctx = {
        question,
        answer
    }
    // console.log("ctx")
    console.log(ctx)
    try {
        await newFaqs({ ctx })
        return redirect('/faqs')
    } catch (error) {
        return error;
    }


    // return redirect('/faqs');
};


export default function NewFaqs() {

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isQuestionExist = payload.some((item) => item.question === inputValue);
        if (isQuestionExist) {
          setError("Question already exists");
        } else {
          setError("");
          // submit the form or do other actions here
        }
    
    };



    return (
        <div className="flex justify-center items-center h-screen">

            {/* <Form method="post" action="" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full"> */}
            <Form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
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
                        value={inputValue}
                        onChange={handleInputChange}
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
                {error && <div className="text-red-500">{error}</div>}

            </Form>
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