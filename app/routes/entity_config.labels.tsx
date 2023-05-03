import { LoaderArgs } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Edit, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { httpRequest } from "~/utils/httpRequest"
import DeletelabelDialog from "./entity_config.labels.delete"
import { Input } from "~/components/ui/input"
import { useState } from "react"
<<<<<<< HEAD


export type labelType = {
    id: string,
    label: string
}
=======
import { LabelFormValues } from "./entity_config.labels_.$id"
>>>>>>> a84ba05 (undo copy update)



export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_label", {})
        const memories = response.payload
        console.log(memories)
        return memories;

    } catch (error) {
        return error;
    }
}


export default function EntityConfig() {
<<<<<<< HEAD
    const loaderData = useLoaderData() as labelType[];
=======
    const loaderData = useLoaderData() as LabelFormValues[];
>>>>>>> a84ba05 (undo copy update)
    const [searchTerm, setSearchTerm] = useState("");


    return (
        <>
            {/* <div className="max-w-3xl mx-auto max-h-screen bg-gray-500"> */}
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4  flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Label List</h1>
                    <Input type="text" placeholder="Search" className="border rounded-md w-48 px-4 py-2 ml-4"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        // onBlur={()=>setSearchTerm("")}
                    />
                </div>


                <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">

                    {Array.isArray(loaderData) && loaderData
                        .filter((res) =>
                            res.label.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .reverse()
<<<<<<< HEAD
                        .map((res: labelType) => (
=======
                        .map((res: LabelFormValues) => (
>>>>>>> a84ba05 (undo copy update)
                            <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold">{res.label}</h3>
                                    <div>
                                        <Link to={`/entity_config/labels/${res.id}`}>
                                            <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </Link>
                                        <DeletelabelDialog res={res} />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {/* </div> */}
            </div>

            <div className="absolute bottom-10 right-10">
                <Link to={'/entity_config/labels/new'}>
                    <Button variant={"secondary"} className="bg-primary text-secondary hover:text-primary rounded-full flex items-center justify-center h-14 py-4 px-4">
                        <Plus />
                    </Button>
                </Link>
            </div>

        </>
    )

}


const dataset = [
    {
        "id": "urn:uuid:fb9c7893-5098-4cfd-b885-bf6712fed9f5",
        "label": "assailant"
    },
    {
        "id": "urn:uuid:fe9489e5-b45b-47fb-a811-139c4cae17c9",
        "label": "victim"
    },
    {
        "id": "urn:uuid:43fdc32c-2c8b-4def-8034-c77b68a51dd0",
        "label": "date"
    },
    {
        "id": "urn:uuid:68c10cec-3a05-4b65-b4d8-3738207db459",
        "label": "location"
    }
]