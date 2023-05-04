import { LoaderArgs } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Edit, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { httpRequest } from "~/utils/httpRequest"
import DeleteignoreDialog from "./entity_config.ignore.delete"
import { Input } from "~/components/ui/input"
import { useState } from "react"
import { LabelFormValues } from "./entity_config.labels_.$id"



export async function loader({ request }: LoaderArgs) {
    try {
        const response = await httpRequest("list_label", {})
        const memories = response.payload
        console.log(memories)
        return null;

    } catch (error) {
        return error;
    }
}


export default function Ignore() {
    const loaderData = dataset.payload;
    const [searchTerm, setSearchTerm] = useState("");


    return (
        <>
            {/* <div className="max-w-3xl mx-auto max-h-screen bg-gray-500"> */}
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4  flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Ignore List</h1>
                    <Input type="text" placeholder="Search" className="border rounded-md w-48 px-4 py-2 ml-4"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        // onBlur={()=>setSearchTerm("")}
                    />
                </div>


                <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">

                    {Array.isArray(loaderData) && loaderData
                        .filter((res) =>
                            res.text.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .reverse()
                        .map((res: any) => (
                            <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold">{res.text}</h3>
                                    <div>
                                        <Link to={`/entity_config/ignore/${res.id}`}>
                                            <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </Link>
                                        <DeleteignoreDialog res={res} />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {/* </div> */}
            </div>

            <div className="absolute bottom-10 right-10">
                <Link to={'/entity_config/ignore/new'}>
                    <Button variant={"secondary"} className="bg-primary text-secondary hover:text-primary rounded-full flex items-center justify-center h-14 py-4 px-4">
                        <Plus />
                    </Button>
                </Link>
            </div>

        </>
    )

}


const dataset = {
    "notice": "",
    "payload": [
      {
        "id": "urn:uuid:5963a6ff-fd2f-46ff-ba11-ee15d00ae4a4",
        "text": "'"
      },
      {
        "id": "urn:uuid:20dbc6c5-e99b-4fac-9cdd-2d477400e8ec",
        "text": "."
      },
      {
        "id": "urn:uuid:c623eb13-4348-45e6-8a2f-f690b1cee8ea",
        "text": "a"
      },
      {
        "id": "urn:uuid:b79da3ad-92b7-4356-afcf-817a61672753",
        "text": "an"
      },
      {
        "id": "urn:uuid:b4bc1cc7-1565-47ed-b11a-dce76239127e",
        "text": "oh"
      },
      {
        "id": "urn:uuid:300e8d12-6cb6-413e-b874-28cc95d22297",
        "text": "no"
      },
      {
        "id": "urn:uuid:725adabf-6596-4779-bf3f-fd5ddcc34f0b",
        "text": "yes"
      },
      {
        "id": "urn:uuid:1d5343ff-9302-4e81-9c6d-7fa50fdd1499",
        "text": "well"
      },
      {
        "id": "urn:uuid:647001ce-0c97-45c9-9087-f8cf733a92a6",
        "text": "she"
      },
      {
        "id": "urn:uuid:ee8179a2-26fd-400c-bae9-1c71bca61e58",
        "text": "he"
      },
      {
        "id": "urn:uuid:65a4a567-59b3-493c-8a99-81577590b0b3",
        "text": "it"
      },
      {
        "id": "urn:uuid:b87b749e-6505-4f47-8ffd-dccd336fb94d",
        "text": "her"
      },
      {
        "id": "urn:uuid:08da4ccc-5344-4863-90de-7ec01f2ee440",
        "text": "him"
      }
    ]
  }