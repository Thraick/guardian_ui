import { LoaderArgs, redirect } from "@remix-run/node";
import { BellRing, Check, Edit, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { httpRequest } from "~/utils/httpRequest";
import { Link } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";


// export async function action({ request }: ActionArgs) {

//     const formData = await request.formData();
//     const id = formData.get('id')
//     const ctx = {
//         id
//     }
//     console.log("ctx")
//     console.log(ctx)
//     // try {
//     //     await editFaqs({ ctx })
//     //     return redirect('/faqs')
//     // } catch (error) {
//     //     return error;
//     // }


//     return redirect('/faqs');
// };

export async function loader({ params }: LoaderArgs) {
    console.log(params.rid)
    try {
        const response = await httpRequest("list_faqs", {})
        const memories = response.payload
        console.log(memories)
        return memories;

    } catch (error) {
        return error;
    }
}


export type faqsType = {
    id: string,
    question: string,
    answer: string
}


export default function faqs() {
    // const loaderData = useLoaderData();
    const loaderData = dataset.payload as faqsType[];
    const id = "urn:uuid:a87a8c0b-674d-4766-9f54-1466e21e75b3"


    return (
        <>
            {/* <div className="max-w-3xl mx-auto max-h-screen bg-gray-500"> */}
            <div className="flex-1 justify-between flex flex-col bg-background">
                <div className="bg-background shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Retort Options</h1>
                    {/* <Input type="text" placeholder="Search" className="border rounded-md w-48 px-4 py-2 ml-4" /> */}
                </div>


                {/* <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">

                    {loaderData.map((res: faqsType) => (
                        <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
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
                    ))}
                </div> */}

                {/* <div className="bg-gray-500"> */}
                {/* <h1>hello</h1>
                    <Link to={'probes'}>probes</Link>
                    <Link to={'probes'}>probes</Link>
                    <Link to={'probes'}>probes</Link> */}

                <div className="flex mt-20">
                    <div className="w-1/3 mx-2">
                        <Link to={`/retort/options/${id}/probes`}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Probes</CardTitle>
                                    {/* <CardDescription>Card Description</CardDescription> */}
                                </CardHeader>
                                {/* <CardContent>
                                    <p>Card Content</p>
                                </CardContent> */}
                                <CardFooter>
                                    <p>30 Probes</p>
                                </CardFooter>
                            </Card>
                        </Link>
                    </div>
                    <div className="w-1/3 mx-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Commentary</CardTitle>
                                {/* <CardDescription>Card Description</CardDescription> */}
                            </CardHeader>
                            {/* <CardContent>
                                    <p>Commentary about retort.</p>
                                </CardContent> */}
                            <CardFooter>
                                <p>30 Commentarys</p>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="w-1/3 mx-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Concepts</CardTitle>
                                {/* <CardDescription>Card Description</CardDescription> */}
                            </CardHeader>
                            {/* <CardContent>
                                    <p>Card Content</p>
                                </CardContent> */}
                            <CardFooter>
                                <p>30 Concepts</p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* </div> */}
            </div>

            {/* <div className="absolute bottom-10 right-10">
                <Link to={'/faqs/new'}>
                    <Button variant={"secondary"} className="bg-primary text-secondary hover:text-primary rounded-full flex items-center justify-center h-14 py-4 px-4">
                        <Plus />
                    </Button>
                </Link>
            </div> */}

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