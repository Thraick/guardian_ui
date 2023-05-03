import { LoaderArgs, redirect } from "@remix-run/node";
import { BellRing, Check, Edit, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { httpRequest } from "~/utils/httpRequest";
import { Link, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { ProbeFormValues } from "./retort_.options.$rid_.probes_.$pid";
import { cache, localStorageService } from "~/resolvers/cache";
import { useEffect, useState } from "react";




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



export default function faqs() {
    const loaderData = useLoaderData() as ProbeFormValues[];
    const { rid } = useParams();

    const [retortTopic, setRetortTopic] = useState('');

    useEffect(() => {
        const topic = localStorageService.getItem('retort_topic') as string;
        setRetortTopic(topic);
    }, []);


    // const retort_topic = "sss"

    return (
        <>
            <div className="flex-1 justify-between flex flex-col bg-background">
                <div className="bg-background shadow-md p-4 flex justify-between items-center">
                    {retortTopic ? (
                        <h1 className="text-2xl font-bold">{retortTopic} Retort</h1>
                    ) : (
                        <h1 className="text-2xl font-bold">Retort</h1>
                    )}
                </div>
                <div className="flex mt-20">
                    <div className="w-1/3 mx-2">
                        <Link to={`/retort/options/${rid}/probes`}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Probes</CardTitle>
                                </CardHeader>
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
                            </CardHeader>
                            <CardFooter>
                                <p>30 Commentarys</p>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="w-1/3 mx-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Concepts</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <p>30 Concepts</p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
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