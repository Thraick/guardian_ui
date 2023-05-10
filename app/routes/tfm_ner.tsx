import { LoaderArgs, redirect } from "@remix-run/node";
import { Edit, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { httpRequest } from "~/utils/httpRequest";
import { Link, useLoaderData } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import { useEffect, useState } from "react";
import { FaqFormValues } from "./faqs_.$id";
import * as z from 'zod';
import { Badge } from "~/components/ui/badge";
import { ConvertComponent, getRandomColor, lightenColor } from "~/components/ui/replaceLabel";
import { MyComponent } from "~/components/ui/replaceLabel copy";
import { TfmNerFormValues } from "./tfm_ner_.$id";
import { localStorageService } from "~/resolvers/cache";



export let labelColors: { [key: string]: string } = {};


const payload = [
    {
        "id": "urn:uuid:c642e0c3-b716-4017-87c9-32674397be81",
        "label": "assailant"
    },
    {
        "id": "urn:uuid:7bdc8063-91e2-4a0f-be91-c519af48c0b1",
        "label": "victim"
    },
    {
        "id": "urn:uuid:1bfcd47a-04e9-4da8-818a-58be556073d7",
        "label": "date"
    },
    {
        "id": "urn:uuid:65d57ff9-ff5b-4e84-8b02-9ba90bfc8404",
        "label": "location"
    },
    {
        "id": "urn:uuid:f98a1ce2-0416-4138-9ecc-20bcf3f25374",
        "label": "offense"
    },
    {
        "id": "urn:uuid:7ed081ee-d6fc-4a8e-9e53-e25d513423f4",
        "label": "taxi_number"
    }
]


export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_tfm_ner", {})
        const memories = response.payload
        // console.log(memories)
        return memories;
    } catch (error) {
        return error;
    }
}



export default function faqs() {
    const loaderData = useLoaderData() as TfmNerFormValues[];
    const [searchTerm, setSearchTerm] = useState("");

    
    useEffect(()=>{
        const localColor = localStorageService.getItem("labelColors")
        if (localColor){
            labelColors = localColor
        }
        else{
            payload.forEach((item) => {
                const color = getRandomColor(labelColors);
                const lightColor = lightenColor(color, 0.3); // Increase the lightness by 30%
                labelColors[item.label] = lightColor;
            });

            localStorageService.setItem("labelColors", labelColors)
        }
    }, [])



    return (
        <>
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tfm List</h1>
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
                            res.utterance.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .reverse()
                        .map((res: TfmNerFormValues) => (
                            <div key={res.id} className="bg-background max-w-3xl mx-auto hover:bg-card  shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                                <div className="flex justify-between items-center mb-4">
                                    <ConvertComponent res={res} />
                                    <div>
                                        <Link to={`/tfm_ner/${res.id}`}>
                                            <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </Link>
                                        {/* <DeleteFaqDialog res={res} /> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="absolute bottom-10 right-10">
                <Link to={'/tfm_new/new'}>
                    <Button variant={"secondary"} className="hover:bg-accent rounded-full  h-14 py-4 px-4">
                        <Plus />
                    </Button>
                </Link>
            </div>
        </>
    );
}


