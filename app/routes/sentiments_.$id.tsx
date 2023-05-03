import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { editFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { X } from "lucide-react";
import AddSentiment from "./sentiment_utterance";
// import { add_sentiment } from "sentiment"


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
    // await editFaqs({ ctx })

    return redirect('/sentiments');
};

// export const loader: LoaderFunction =async ({request}) => {

// }


export default function Sentimentscccc() {
    const loaderData = dataset.payload[0].statements;
    const sentiment = dataset.payload;
    const [open, isOpen] = useState(false);
    const [id, setId] = useState("");


    return (
        <div className="flex justify-center items-center h-screen">

            <Form method="post" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 h-3/4 max-w-4xl w-full">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Sentiment</h1>
                    <Link to={'/sentiments'}>
                        <Button variant={"ghost"}><X /></Button>
                    </Link>
                </div>
                <div className="mb-8">
                    <Label htmlFor="question"
                    >
                         
                    </Label>
                    <Input
                        name="Sentiment"
                        type="text"
                        defaultValue={sentiment[0].sentiment}
                    />
                </div>
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Sentiment List</h1><AddSentiment sentiment={sentiment}/>
                    </div>
                    {loaderData.map((res: any) => (
                        <div key={res.id} className="bg-white max-w-4xl mx-auto hover:bg-accent shadow-sm rounded">
                            <div className="flex justify-between items-center mb-8">
                                {open && res.sentiment_id == id ? (
                                    <div className="mb-8">
                                        <Label htmlFor="Sentiment">
                                                    
                                        </Label>
                                        <Input key={res.statement_id}
                                            name="Sentiment"
                                            type="text"
                                            defaultValue={res.statement}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                    <h1 >{res.statement}</h1>
                                    </div>
                                )}
                                {open && res.sentiment_id == id? (
                                    <div className="flex justify-center">
                                        <Button onClick={(event) => {event.preventDefault();isOpen(false);setId(res.sentiment_id);}} variant={"secondary"}> Save</Button>
                                        <Button variant={"ghost"}><X /></Button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <Button onClick={(event) => {event.preventDefault();isOpen(true);setId(res.sentiment_id);}} variant={"outline"}><Edit className="" /> Edit</Button>
                                        <Button variant={"ghost"}><Trash2 /></Button>
                                    </div>
                                )}
                            </div>
                        </div>                        
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    
                </div>
            </Form>
        </div>
    )
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle form submission logic here
}

const dataset = {
    "notice": "",
    "payload": [{
          "id": "urn:uuid:ba7b9862-ce72-48e3-b3f2-8953bd0de672",
          "sentiment": "neutral",
          "statements": [
            {
              "statement_id": "urn:uuid:a3d15825-1190-4adf-b8f6-7d06fbb06a9f",
              "statement": "Oh I see."
            },
            {
              "statement_id": "urn:uuid:b89a0b3b-b195-4448-bfd7-2919af89dbaf",
              "statement": "Ahh, got it."
            },
            {
              "statement_id": "urn:uuid:a7b70d48-6e99-4d12-9327-1e4487b216e4",
              "statement": "Okay."
            }
        ]
    }]
}