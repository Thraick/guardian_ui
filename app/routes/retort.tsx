import { LoaderArgs, redirect } from "@remix-run/node";
import { Edit, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { httpRequest } from "~/utils/httpRequest";
<<<<<<< HEAD
import { Link } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import DeleteRetortDialog from "./retort.delete";


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

export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_faqs", {})
=======
import { Link, useLoaderData } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import DeleteRetortDialog from "./retort.delete";
import { useState } from "react";
import { Retort_TopicFormValues } from "./retort_.$id";
import { cache, localStorageService } from "~/resolvers/cache";


export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_retort_topic", {})
>>>>>>> a84ba05 (undo copy update)
        const memories = response.payload
        console.log(memories)
        return memories;

    } catch (error) {
        return error;
    }
}


<<<<<<< HEAD
export type retort_topic_Type = {
    id: string,
    retort_topic: string
}


export default function retort() {
    // const loaderData = useLoaderData();
    const loaderData = dataset.payload as retort_topic_Type[];

=======

export default function retort() {
    const loaderData = useLoaderData() as Retort_TopicFormValues[];
    const [searchTerm, setSearchTerm] = useState("");
>>>>>>> a84ba05 (undo copy update)

    return (
        <>
            {/* <div className="max-w-3xl mx-auto max-h-screen bg-gray-500"> */}
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4  flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Retort List</h1>
<<<<<<< HEAD
                    <Input type="text" placeholder="Search" className="border rounded-md w-48 px-4 py-2 ml-4" />
=======
                    <Input type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search"
                        className="border rounded-md w-48 px-4 py-2 ml-4" />
>>>>>>> a84ba05 (undo copy update)
                </div>


                <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">

<<<<<<< HEAD
                    {loaderData.map((res: retort_topic_Type) => (
                        <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <Link to={`/retort/options/${res.id}`}>
                                    <h3 className="text-lg font-bold">{res.retort_topic}</h3>
                                </Link>
                                <div>
                                    <Link to={`/retort/${res.id}`}>
                                        <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                    </Link>
                                    <DeleteRetortDialog res={res} />
                                </div>
                            </div>
                        </div>
                    ))}
=======
                    {Array.isArray(loaderData) && loaderData
                        .filter((res) =>
                            res.retort_topic.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .reverse()
                        .map((res: Retort_TopicFormValues) => (
                            <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <Link to={`/retort/options/${res.id}`} onClick={()=>localStorageService.setItem("retort_topic", res.retort_topic)}>
                                        <h3 className="text-lg font-bold">{res.retort_topic}</h3>
                                    </Link>
                                    <div>
                                        <Link to={`/retort/${res.id}`}>
                                            <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </Link>
                                        <DeleteRetortDialog res={res} />
                                    </div>
                                </div>
                            </div>
                        ))}
>>>>>>> a84ba05 (undo copy update)
                </div>
                {/* </div> */}
            </div>

            <div className="absolute bottom-10 right-10">
                <Link to={'/retort/new'}>
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
            "id": "urn:uuid:68f92afa-ff86-4f54-b8a1-d78ebba3e30a",
            "retort_topic": "default"
        },
        {
            "id": "urn:uuid:a87a8c0b-674d-4766-9f54-1466e21e75b3",
            "retort_topic": "verbal abuse"
        },
        {
            "id": "urn:uuid:42a3c878-96d1-4c93-882e-679b825f6330",
            "retort_topic": "sexual misconduct"
        },
        {
            "id": "urn:uuid:c43e2872-2443-4e3f-b33a-865def79964a",
            "retort_topic": "robbery"
        },
        {
            "id": "urn:uuid:6b17437e-3799-426f-aff5-d4aefa93b508",
            "retort_topic": "accident"
        }
    ]
}