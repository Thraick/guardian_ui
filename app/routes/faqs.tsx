import { LoaderArgs, redirect } from "@remix-run/node";
import { Edit, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { httpRequest } from "~/utils/httpRequest";
import { Link, useLoaderData } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import { useState } from "react";
<<<<<<< HEAD
=======
import { FaqFormValues } from "./faqs_.$id";
>>>>>>> a84ba05 (undo copy update)



export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_faqs", {})
        const memories = response.payload
        console.log(memories)
<<<<<<< HEAD
        if (memories){ return memories;}
        else{
            return null;
        }
=======
        return memories;
>>>>>>> a84ba05 (undo copy update)
    } catch (error) {
        return error;
    }
}


export type faqsType = {
    id: string,
    question: string,
    answer: string
}


<<<<<<< HEAD
export default function faqs() {
    const loaderData = useLoaderData() as faqsType[];
=======

export default function faqs() {
    const loaderData = useLoaderData() as FaqFormValues[];
>>>>>>> a84ba05 (undo copy update)
    const [searchTerm, setSearchTerm] = useState("");



    return (
        <>
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Faq List</h1>
                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-48 px-4 py-2 ml-4"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>

                <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">
                    {Array.isArray(loaderData) && loaderData
                        .filter((res) =>
                            res.question.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .reverse()
<<<<<<< HEAD
                        .map((res: faqsType) => (
=======
                        .map((res: FaqFormValues) => (
>>>>>>> a84ba05 (undo copy update)
                            <div key={res.id} className="bg-background max-w-3xl mx-auto hover:bg-card  shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">{res.question}</h3>
                                    <div>
                                        <Link to={`/faqs/${res.id}`}>
                                            <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </Link>
                                        <DeleteFaqDialog res={res} />
                                    </div>
                                </div>
                                <h2 className="text-gray-700">{res.answer}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="absolute bottom-10 right-10">
                <Link to={'/faqs/new'}>
                    <Button variant={"secondary"} className="hover:bg-accent rounded-full  h-14 py-4 px-4">
                        <Plus />
                    </Button>
                </Link>
            </div>
        </>
    );
}



// const dataset = {
//     "notice": "",
//     "payload": [
//         {
//             "id": "urn:uuid:3cfc9a25-04c8-4aa0-8097-a278493e88cdq",
//             "question": "Who built this?",
//             "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
//         },
//         {
//             "id": "urn:uuid:75f4d116w-4396-42e7-9c55-fbb15b2q263b3",
//             "question": "What is this all about?",
//             "answer": "This is a conversational state machine built on Jaseci."
//         },
//         {
//             "id": "urn:uuid:3cfcw9a25-04c8-4aa0-8097-a278493e88cdq",
//             "question": "Who built this?",
//             "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
//         },
//         {
//             "id": "urn:uuid:75f4d116-4w396-42e7-9c55-fbb15b2q263b3",
//             "question": "What is this all about?",
//             "answer": "This is a conversational state machine built on Jaseci."
//         },
//         {
//             "id": "urn:uuid:3cfc9a25-04c8-4aaw0-8097-a278493e88cdq",
//             "question": "Who built this?",
//             "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
//         },
//         {
//             "id": "urn:uuid:75wf4d116-4396-42e7-9c55-fbb15b2q263b3",
//             "question": "What is this all about?",
//             "answer": "This is a conversational state machine built on Jaseci."
//         },
//         {
//             "id": "urn:uuid:3cfc9a2w5-04c8-4aa0-8097-a278493e88cdq",
//             "question": "Who built this?",
//             "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
//         },
//         {
//             "id": "urn:uuid:w75f4d116-4396-42e7-9c55-fbb15b2q263b3",
//             "question": "What is this all about?",
//             "answer": "This is a conversational state machine built on Jaseci."
//         },
//         {
//             "id": "urn:uuid:w75f4d116-439w6-42e7-9c55-fbb15b2q263b3",
//             "question": "Name of project?",
//             "answer": "This is a conversational state machine built on Jaseci."
//         }
//     ]
// }