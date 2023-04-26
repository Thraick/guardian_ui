import { LoaderFunction } from "@remix-run/node";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { httpRequest } from "~/utils/httpRequest";
import { Link } from "@remix-run/react";



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

            {/* <div className="max-w-3xl mx-auto max-h-screen bg-gray-500"> */}
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4  flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Faq List</h1>
                    <Input type="text" placeholder="Search" className="border rounded-md w-48 px-4 py-2 ml-4" />
                </div>


                <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">

                    {loaderData.map((res: any) => (
                        <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">{res.question}</h3>
                                <div>
                                    <Link to={`/faqs/${res.id}`}>
                                        <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                    </Link>
                                    <Link to={`/faqs/delete`}>
                                        <Button variant={"ghost"}><Trash2 className="mr-2 h-4 w-4" /></Button>
                                    </Link>
                                </div>
                            </div>
                            <h2 className="text-gray-700">{res.answer}</h2>
                        </div>
                    ))}
                </div>
                {/* </div> */}
            </div>

            <div className="absolute bottom-10 right-10">
                <Link to={'/faqs/new'}>
                    <Button variant={"secondary"} className="bg-primary text-secondary hover:text-primary rounded-full flex items-center justify-center h-14 py-4 px-4">
                        <Plus />
                    </Button>
                </Link>
            </div>

        </>

    );

}



const dataset = {
    "notice": "",
    "payload": [
        {
            "id": "urn:uuid:3cfc9a25-04c8-4aa0-8097-a278493e88cdq",
            "question": "Who built this?",
            "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
        },
        {
            "id": "urn:uuid:75f4d116-4396-42e7-9c55-fbb15b2q263b3",
            "question": "What is this all about?",
            "answer": "This is a conversational state machine built on Jaseci."
        },
        {
            "id": "urn:uuid:63086f31-16a4-469a-9ca4-4a22f33q2d53f",
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