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



export default function Sentiments() {
    const loaderData = dataset.payload;




    return (
        <>

            {/* <div className="max-w-3xl mx-auto max-h-screen bg-gray-500"> */}
            <div className="flex-1 justify-between flex flex-col h-screen bg-background">
                <div className="bg-background shadow-md p-4  flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Sentiment List</h1>
                    <Input type="text" placeholder="Search" className="border rounded-md w-48 px-4 py-2 ml-4" />
                </div>


                <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">

                    {loaderData.map((res: any) => (
                        <div key={res.id} className="bg-white max-w-3xl mx-auto hover: bg-accent  shadow-sm rounded px-8 pt-6 pb-8 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">{res.sentiment}</h3>
                                <div>
                                    <Link to={`/Sentiments/${res.id}`}>
                                        <Button variant={"outline"}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                    </Link>
                                    <Link to={`/Sentiments/delete`}>
                                        <Button variant={"ghost"}><Trash2 className="mr-2 h-4 w-4" /></Button>
                                    </Link>
                                </div>
                            </div>
                            <h2 key={res.statements[0].statement_id} className="text-gray-700">{res.statements[0].statement}</h2>
                            {res.statements.map((statements: any) => {
                                // console.log("This is the accepted body of the map funstion: ", statements);
                                <h2 key={statements.statement_id} className="text-gray-700">Hello there</h2>
                            })}
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
          "id": "urn:uuid:ba7b9862-ce72-48e3-b3f2-8953bd0de672",
          "sentiment": "neutral",
          "statements": [
            {
              "statement_id": "urn:uuid:a3d15825-1190-4adf-b8f6-7d06fbb06a9f",
              "statement": "Oh I see."
            },
            {
              "statement_id": "urn:uuid:b89a0b3b-b195-4448-bfd7-2919af89dbaf",
              "statement": "Ahh, got it."
            },
            {
              "statement_id": "urn:uuid:a7b70d48-6e99-4d12-9327-1e4487b216e4",
              "statement": "Okay."
            }
          ]
        },
        {
          "id": "urn:uuid:2713c3e2-a778-4584-b140-c5aef8975745",
          "sentiment": "positive",
          "statements": [
            {
              "statement_id": "urn:uuid:431fe4ea-104d-4998-b135-57c22ab9e2c8",
              "statement": "Nice!"
            },
            {
              "statement_id": "urn:uuid:e8243d8c-a2f7-43b9-b017-846d1177e438",
              "statement": "How nice."
            },
            {
              "statement_id": "urn:uuid:60c66f51-5929-4d27-8add-80bc15cb2fdb",
              "statement": "That's great."
            },
            {
              "statement_id": "urn:uuid:adcbee87-3a81-45b3-99a4-018d9b022b4b",
              "statement": "Isn't that something."
            },
            {
              "statement_id": "urn:uuid:5030524c-f07b-42d0-ad9f-d7f49ef72f96",
              "statement": "Very cool!"
            },
            {
              "statement_id": "urn:uuid:4599a332-56b3-4e29-b53f-e1a049ab891e",
              "statement": "Awesome!"
            }
          ]
        },
        {
          "id": "urn:uuid:b6eea1e3-754f-49ad-b76b-0c0c8a90d66b",
          "sentiment": "negative",
          "statements": [
            {
              "statement_id": "urn:uuid:72fdec70-749f-44b0-9b64-4a2b88f7ec86",
              "statement": "I'm so sorry."
            },
            {
              "statement_id": "urn:uuid:15ede594-b07c-4312-ab4d-585ed03fb4f5",
              "statement": "So sorry to hear that."
            },
            {
              "statement_id": "urn:uuid:0b1f3efc-bde5-489f-9976-7db3b6b5b8d6",
              "statement": "Oh no."
            },
            {
              "statement_id": "urn:uuid:17e7e2d5-e394-4445-a809-371c9750a98c",
              "statement": "I'm really sorry."
            },
            {
              "statement_id": "urn:uuid:63f33900-e824-4704-ad65-b880c111d529",
              "statement": "That's horrible"
            }
          ]
        },
        {
          "id": "urn:uuid:fa9d6243-3f6a-4c3d-9695-8f936705ad56",
          "sentiment": "conflict",
          "statements": [
            {
              "statement_id": "urn:uuid:25dd3c03-e23d-41de-900c-e04d5f9e895c",
              "statement": "Are you serious?"
            },
            {
              "statement_id": "urn:uuid:f647d56d-5028-415d-b9bb-ee7ea5560c53",
              "statement": "That's crazy"
            },
            {
              "statement_id": "urn:uuid:dceebac0-68e5-4cf0-951f-af074f1fbd73",
              "statement": "What!? Really?!"
            },
            {
              "statement_id": "urn:uuid:8b6be1cb-07dc-43e3-8a78-e86cd66e3f1e",
              "statement": "I'm really not happy to hear that at all."
            }
          ]
        }
      ]
}
