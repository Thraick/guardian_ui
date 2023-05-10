import { LoaderArgs } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Edit, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { httpRequest } from "~/utils/httpRequest"
import DeletelabelDialog from "./entity_config.labels.delete"
import { Input } from "~/components/ui/input"
import { useState } from "react"
import { LabelFormValues } from "./entity_config.labels_.$id"
import { ReplaceFormValues } from "./entity_config.replaces_.$id"
import DeleteReplaceDialog from "./entity_config.replaces.delete"



export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_replace", {})
        const memories = response.payload
        console.log(memories)
        return memories;

    } catch (error) {
        return error;
    }
}



export default function EntityConfig() {

    const loaderData = useLoaderData() as ReplaceFormValues[];
    const [searchTerm, setSearchTerm] = useState("");


    return (
        <>
            {/* <div className="max-w-3xl mx-auto max-h-screen bg-gray-500"> */}
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4  flex justify-between items-center">
                    <h1 className="text-2xl font-bold capitalize">replace list</h1>
                    <Input type="text" placeholder="Search" className="border rounded-md w-48 px-4 py-2 ml-4"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    // onBlur={()=>setSearchTerm("")}
                    />
                </div>


                <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">

                    {Array.isArray(loaderData) && loaderData
                        .filter((res) =>
                            res.key.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .reverse()
                        .map((res: ReplaceFormValues) => (
                            <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                                {/* <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold">{res.key}</h3>
                                    <h3 className="text-lg font-bold">{res.value}</h3>
                                    <div>
                                        <Link to={`/entity_config/replaces/${res.id}`}>
                                            <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </Link>
                                        <DeleteReplaceDialog res={res} />
                                    </div>
                                </div> */}

                                <div className="flex justify-between items-center">
                                    {/* first */}
                                    <div className="border-gray-300 ">
                                        <h3 className="text-lg font-bold">{res.key}</h3>
                                    </div>
                                    {/* second  */}
                                    <div>
                                        <h3 className="text-lg font-bold">{res.value}</h3>
                                    </div>
                                    {/* third  */}
                                    <div>
                                        <Link to={`/entity_config/replaces/${res.id}`}>
                                            <Button variant={"outline"}>
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </Button>
                                        </Link>
                                        <DeleteReplaceDialog res={res} />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {/* </div> */}
            </div>

            <div className="absolute bottom-10 right-10">
                <Link to={'/entity_config/replaces/new'}>
                    <Button variant={"secondary"} className="bg-primary text-secondary hover:text-primary rounded-full flex items-center justify-center h-14 py-4 px-4">
                        <Plus />
                    </Button>
                </Link>
            </div>

        </>
    )

}