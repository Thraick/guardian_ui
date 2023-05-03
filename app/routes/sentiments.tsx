import { LoaderArgs, redirect } from "@remix-run/node";
import { Edit, Plus, Trash2, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { httpRequest } from "~/utils/httpRequest";
import { Form, Link, useLoaderData } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import { useState } from "react";
import { FaqFormValues } from "./faqs_.$id";
import { SentimentFormValues } from "./sentiments_.$id";
import DeleteSentimentDialog from "./sentiments.delete";
import { Label } from "~/components/ui/label";



export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_sentiments", {})
        const memories = response.payload
        console.log(memories)
        return memories;
    } catch (error) {
        return error;
    }
}



export default function Sentiments() {
    const loaderData = useLoaderData() as SentimentFormValues[];
    const [searchTerm, setSearchTerm] = useState("");

    const [statementId, setStatementId] = useState("");
    const [sentimentId, setSentimentId] = useState("");

    return (
        <>
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">







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
                            defaultValue={loaderData[0].sentiment}
                        />
                    </div>
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-bold">Sentiment List</h1>
                            {/* <AddSentiment sentiment={sentiment} /> */}
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
                                    {open && res.sentiment_id == id ? (
                                        <div className="flex justify-center">
                                            <Button onClick={(event) => { ()=> setId(res.sentiment_id); }} variant={"secondary"}> Save</Button>
                                            {/* <Button onClick={(event) => { event.preventDefault(); isOpen(false); setId(res.sentiment_id); }} variant={"secondary"}> Save</Button> */}
                                            <Button variant={"ghost"}><X /></Button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <Button onClick={(event) => { event.preventDefault(); isOpen(true); setId(res.sentiment_id); }} variant={"outline"}><Edit className="" /> Edit</Button>
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




                {/* <div className="bg-background shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Sentiment List</h1>
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
                            res.sentiment.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .reverse()
                        .map((res: SentimentFormValues) => (
                            <div key={res.id} className="bg-background max-w-3xl mx-auto hover:bg-card  shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">{res.sentiment}</h3>
                                    <div>
                                        <Link to={`/sentiments/${res.id}`}>
                                            <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </Link>
                                        <DeleteSentimentDialog res={res} />
                                    </div>
                                </div>
                                <h2 className="text-gray-700">{res.statement}</h2>
                            </div>
                        ))
                    }
                </div> */}
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
