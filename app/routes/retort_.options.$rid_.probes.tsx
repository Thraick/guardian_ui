import { LoaderArgs, redirect } from "@remix-run/node";
import { Edit, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { httpRequest } from "~/utils/httpRequest";
<<<<<<< HEAD
import { Link } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import DeleteProbeDialog from "./retort_.options.$rid_.probes.delete";


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
=======
import { Link, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import DeleteFaqDialog from "./faqs.delete";
import DeleteProbeDialog from "./retort_.options.$rid_.probes.delete";
import { ProbeFormValues } from "./retort_.options.$rid_.probes_.$pid";
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "@remix-run/react";
import { cache, localStorageService } from "~/resolvers/cache";



>>>>>>> a84ba05 (undo copy update)

export async function loader({ params }: LoaderArgs) {
    console.log(params.rid)
    try {
<<<<<<< HEAD
        const response = await httpRequest("list_probes", {})
=======
        const response = await httpRequest("list_probe", { id: params.rid })
>>>>>>> a84ba05 (undo copy update)
        const memories = response.payload
        console.log(memories)
        return memories;

    } catch (error) {
        return error;
    }
}


<<<<<<< HEAD
export type probesType = {
    id: string,
    probe: string
}


export default function Probes() {
    // const loaderData = useLoaderData();
    const loaderData = dataset.payload as probesType[];
    const id = "urn:uuid:a87a8c0b-674d-4766-9f54-1466e21e75b3"
=======


export default function Probes() {
    const loaderData = useLoaderData() as ProbeFormValues[];


    const [searchTerm, setSearchTerm] = useState("");
    const { rid } = useParams();

    const [retortTopic, setRetortTopic] = useState('');

    useEffect(() => {
        console.log("loaderData")
        console.log(loaderData)
        localStorageService.setItem('probe_list', loaderData)
        const topic = localStorageService.getItem('retort_topic') as string;
        setRetortTopic(topic);
    }, []);
>>>>>>> a84ba05 (undo copy update)


    return (
        <>
            {/* <div className="max-w-3xl mx-auto max-h-screen bg-gray-500"> */}
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4  flex justify-between items-center">
<<<<<<< HEAD
                    <h1 className="text-2xl font-bold">Probe List</h1>
                    <Input type="text" placeholder="Search" className="border rounded-md w-48 px-4 py-2 ml-4" />
=======
                    <h1 className="text-2xl font-bold">{ retortTopic } Probe List</h1>
                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-48 px-4 py-2 ml-4"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
>>>>>>> a84ba05 (undo copy update)
                </div>


                <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">

<<<<<<< HEAD
                    {loaderData.map((res: probesType) => (
                        <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">{res.probe}</h3>
                                <div>
                                    <Link to={`/retort/options/${id}/probes/${res.id}`}>
                                        <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                    </Link>
                                    <DeleteProbeDialog res={res} />
                                </div>
                            </div>
                        </div>
                    ))}
=======
                    {Array.isArray(loaderData) && loaderData
                        .filter((res) =>
                            res.probe.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .reverse()
                        .map((res: ProbeFormValues) => (
                            <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">{res.probe}</h3>
                                    <div>
                                        <Link to={`/retort/options/${rid}/probes/${res.id}`}>
                                            <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        </Link>
                                        <DeleteProbeDialog res={res} />
                                    </div>
                                </div>
                            </div>
                        ))}
>>>>>>> a84ba05 (undo copy update)
                </div>
            </div>

            <div className="absolute bottom-10 right-10">
<<<<<<< HEAD
            <Link to={`/retort/options/${id}/probes/new`}>
=======
                <Link to={`/retort/options/${rid}/probes/new`}>
>>>>>>> a84ba05 (undo copy update)
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
<<<<<<< HEAD
          "id": "urn:uuid:96aabff3-a978-4607-80db-b6469ce78a03",
          "probe": "assailant"
        },
        {
          "id": "urn:uuid:8b4a8e1b-814c-4b8a-a8d4-a1e3cb2e665c",
          "probe": "date"
        }
      ]
=======
            "id": "urn:uuid:96aabff3-a978-4607-80db-b6469ce78a03",
            "probe": "assailant"
        },
        {
            "id": "urn:uuid:8b4a8e1b-814c-4b8a-a8d4-a1e3cb2e665c",
            "probe": "date"
        }
    ]
>>>>>>> a84ba05 (undo copy update)
}

// ,
//         {
//           "id": "urn:uuid:b240e71c-0d52-4c8f-a2cb-9b5b1a2c2fce",
//           "probe": "location"
//         },
//         {
//             "id": "urn:uuidd:96aabff3-a978-4607-80db-b6469ce78a03",
//             "probe": "assailant"
//           },
//           {
//             "id": "urn:uuid:8b4ad8e1b-814c-4b8a-a8d4-a1e3cb2e665c",
//             "probe": "date"
//           },
//           {
//             "id": "urn:uuid:b240ed71c-0d52-4c8f-a2cb-9b5b1a2c2fce",
//             "probe": "location"
//           }