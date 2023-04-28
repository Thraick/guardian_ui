import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { editFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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

            <Form method="post" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Sentiment</h1>
                    <Link to={'/Sentiments'}>
                        <Button variant={"ghost"}><X /></Button>
                    </Link>
                </div>
                <div className="mb-4">
                    <Label htmlFor="question"
                    >
                         
                    </Label>
                    <Input
                        name="Sentiment"
                        type="text"
                        defaultValue={sentiment[0].sentiment}
                    />
                </div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Sentiment List</h1>
                    {loaderData.map((res: any) => (
                        <div key={res.id} className="bg-white max-w-3xl mx-auto hover:bg-accent shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                {open && res.sentiment_id == id ? (
                                    <div>
                                        <Label htmlFor="Sentimentvbvbvbvb">
                                                    
                                        </Label>
                                        <Input key={res.statement_id}
                                            name="Sentimentvbvbvbvb"
                                            type="text"
                                            defaultValue={res.statement}
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                    <h1 >{res.statement}</h1>
                                    </div>
                                )}
                                {open && res.sentiment_id == id? (
                                    <button onClick={(event) => {
                                        isOpen(false);
                                        event.preventDefault();
                                        // const newData = (event.target as HTMLFormElement).form[0].value;
                                        // console.log("This is the new data to updae the form",newData)
                                        // res.statement = newData;
                                    }}>save</button>
                                ) : (
                                    <button onClick={(event) => {
                                        event.preventDefault();
                                        isOpen(true);
                                        setId(res.sentiment_id);
                                    }}>edit</button>
                                )}
                            </div>
                        </div>
                        // {open ? (
                        //     <div className="mb-4">
                        //             <Label htmlFor="Sentimentvbvbvbvb"
                        //             >
                                        
                        //             </Label>
                        //             <Input key={res.statement_id}
                        //                 name="Sentimentvbvbvbvb"
                        //                 type="text"
                        //                 defaultValue={res.statement}
                        //             />
                        //     </div>
                        // ): 
                        //     (

                        // )}

                        
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" variant={"secondary"}>Update</Button>
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