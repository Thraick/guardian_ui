

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { LoaderFunction } from "@remix-run/node";
import { httpRequest } from "~/utils/httpRequest";


export const loader: LoaderFunction = async ({ request }) => {
    try {
        const response = await httpRequest("list_faqs", {})
        const memories = response.report[0] || null
        console.log(memories)
        return memories;

    } catch (error) {
        return error;
    }
}



export default function faqs() {
    // const loaderData = useLoaderData();
    const loaderData = dataset.payload;


    return (
        <>
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Faq List</h1>
                    <input type="text" placeholder="Search" className="border rounded-md px-4 py-2 ml-4" />
                </div>


                <div className="overflow-y-auto max-h-screen">
                    {loaderData.map((res: any) => (
                        <div key={res.id} className="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">{res.question}</h3>
                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                </div>
                            </div>
                            <h2 className="text-gray-700">{res.answer}</h2>
                        </div>
                    ))}
                </div>
            </div>

        </>

    );

}



const dataset = {
    "notice": "",
    "payload": [
        {
            "id": "urn:uuid:3cfc9a25-04c8-4aa0-8097-a278493e88cd",
            "question": "Who built this?",
            "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
        },
        {
            "id": "urn:uuid:75f4d116-4396-42e7-9c55-fbb15b2263b3",
            "question": "What is this all about?",
            "answer": "This is a conversational state machine built on Jaseci."
        },
        {
            "id": "urn:uuid:63086f31-16a4-469a-9ca4-4a22f332d53f",
            "question": "What can you do?",
            "answer": "I can assist you in a number of ways, such as providing taxi numbers or reporting domestic violence and abuse during your travels."
        },
        {
            "id": "urn:uuid:3cfc9a25-04c8-4aa0-8097-a278493e88cd",
            "question": "Who built this?",
            "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
        },
        {
            "id": "urn:uuid:75f4d116-4396-42e7-9c55-fbb15b2263b3",
            "question": "What is this all about?",
            "answer": "This is a conversational state machine built on Jaseci."
        },
        {
            "id": "urn:uuid:63086f31-16a4-469a-9ca4-4a22f332d53f",
            "question": "What can you do?",
            "answer": "I can assist you in a number of ways, such as providing taxi numbers or reporting domestic violence and abuse during your travels."
        }
    ]
}