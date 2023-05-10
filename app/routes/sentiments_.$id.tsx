import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { editFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { Edit, Trash2, X, ShieldCheck } from "lucide-react";
import { httpRequest } from "~/utils/httpRequest";
import { useState } from "react";
import * as z from 'zod';
import { editSentiment, editStatement, newSentiment, newStatement } from "~/resolvers/sentiment";
import AddSentiment from "./sentiments_.$id_.statement";
import DeleteSentimentDialog from "./sentiments.delete";
import DeleteStatementDialog from "./sentiments_.$id_.delete";


// const statementSchema = z.string().min(3, { message: 'Statement must be at least 3 characters long' }).nonempty({ message: 'Statement is required' });
// const sentimentSchema = z.string().min(3, { message: 'Sentiment must be at least 3 characters long' }).nonempty({ message: 'Sentiment is required' });
// const idSchema = z.string().nonempty({ message: 'Id is required' });

// const schema = z.object({
//     statement: statementSchema,
//     sentiment: sentimentSchema,
//     id: idSchema
// });

const statementSchema = z.object({
    id: z.string().nonempty({ message: 'Statement ID is required' }),
    statement: z.string().min(3, { message: 'Statement must be at least 3 characters long' }).nonempty({ message: 'Statement is required' }),
});

// const schema = z.object({
//     id: z.string().nonempty({ message: 'ID is required' }),
//     sentiment: z.string().min(3, { message: 'Sentiment must be at least 3 characters long' }).nonempty({ message: 'Sentiment is required' }),
//     statements: z.array(statementSchema),
// });

const sentimentSchema = z.object({
    id: z.string().nonempty({ message: 'ID is required' }),
    sentiment: z.string().min(3, { message: 'Sentiment must be at least 3 characters long' }).nonempty({ message: 'Sentiment is required' }),
});

const schema = z.object({
    ...sentimentSchema.shape,
    statements: z.array(statementSchema),
});

export type SentimentFormValues = z.infer<typeof schema>;
export type StatementFormValues = z.infer<typeof statementSchema>;



export async function action({ request, params }: ActionArgs) {

    const formData = await request.formData();
    const sentiment = formData.get('sentiment')
    const statement = formData.get('statement')
    const new_statement = formData.get('new_statement')
    const id = formData.get('id')
    let ctx = {}

    try {
        if (statement) {
            ctx = {
                statement,
                id
            }
            console.log("ctx statement")
            console.log(ctx)
            const payload = await editStatement({ ctx })
            if (payload.info.warning) {
                return payload.info.warning;
            }
            return redirect(`/sentiments/${params.id}`)
        }
        else if (sentiment) {
            ctx = {
                sentiment,
                id
            }
            console.log("ctx sentiment")
            console.log(ctx)
            const payload = await editSentiment({ ctx })
            if (payload.info.warning) {
                return payload.info.warning;
            }
            return redirect(`/sentiments/${params.id}`)
        }
        else if (new_statement) {
            ctx = {
                new_statement,
                id
            }
            console.log("ctx new sentiment")
            console.log(ctx)
            const payload = await newStatement({ ctx })
            if (payload.info.warning) {
                return payload.info.warning;
            }
            return redirect(`/sentiments/${params.id}`)
        }
        return null
        // return redirect(`/sentiments/${params.id}`)
    } catch (error) {
        return error;
    }
};



export async function loader({ params }: LoaderArgs) {

    try {
        console.log(params.id)
        const response = await httpRequest("get_sentiment", { id: params.id })
        const memories = response.payload || null
        console.log(memories)
        if (!memories) {

            return null
        }
        return memories[0];
    } catch (error) {
        console.log("error")
        console.log(error)
        return error;
    }
}



export default function Sentiments() {

    const loaderData = useLoaderData() as SentimentFormValues;
    const submit = useSubmit();
    const actionData = useActionData();
    const [sentimentId, setSentimentId] = useState(false);
    const [statementId, setStatementId] = useState("");
    const [statement, setStatement] = useState("")
    const [reverselist, setReverseList] = useState(loaderData.statements)

    const [formValues, setFormValues] = useState<SentimentFormValues>({ sentiment: loaderData.sentiment, statements: reverselist, id: loaderData.id } || { id: "", sentiment: "", statements: [] });
    // const [formValues, setFormValues] = useState<SentimentFormValues>({ sentiment: loaderData.sentiment, statements: loaderData.statements, id: loaderData.id } || { id: "", sentiment: "", statements: [] });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        // console.log(name)
        // console.log(value)
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    function handleSentimentSubmit() {
        // event.preventDefault();
        console.log("formValuesformValuesformValuesformValuesformValues")
        const validationResult = sentimentSchema.safeParse(formValues);
        if (validationResult.success) {
            // Handle successful form submission
            console.log(formValues)
            setFormErrors([])
            handleSubmitSentiment({ formValues });
            setSentimentId(false)
        } else {
            console.log(validationResult.error.issues)
            setFormErrors(validationResult.error.issues);
        }
    };



    function handleStatementSubmit() {
        const statementFormValues = {
            id: statementId,
            statement: statement
        }
        const validationResult = statementSchema.safeParse(statementFormValues);
        if (validationResult.success) {
            setFormErrors([])
            handleSubmitStatement({ statementFormValues });
            setStatementId("")
            setStatement("")

            // Update the formValues with the updated statement
            setFormValues(prevFormValues => ({
                ...prevFormValues,
                statements: prevFormValues.statements.map(prevStatement => {
                    if (prevStatement.id === statementId) {
                        // Update the matching statement with the new statement data
                        return statementFormValues;
                    } else {
                        // Return the original statement if it doesn't match
                        return prevStatement;
                    }
                })
            }));

        } else {
            setFormErrors(validationResult.error.issues);
            console.log(validationResult.error.issues)
        }
    }

    function handleEditStatement(res: StatementFormValues) {
        setStatementId(res.id)
        setStatement(res.statement)
        console.log(sentimentId)
        console.log(res.id)
    }



    function handleSubmitSentiment({ formValues }: { formValues: SentimentFormValues }) {
        const formData = new FormData();
        formData.append('sentiment', formValues.sentiment);
        formData.append('id', formValues.id);
        submit(formData, { method: 'post', action: `/sentiments/${formValues.id}` });
    }

    function handleSubmitStatement({ statementFormValues }: { statementFormValues: StatementFormValues }) {
        const formData = new FormData();
        formData.append('statement', statementFormValues.statement);
        formData.append('id', statementFormValues.id);
        submit(formData, { method: 'post', action: `/sentiments/${formValues.id}` });
    }


    return (
        <>
            <div className="flex justify-center h-screen items-center bg-background">
                <div className="px-8 h-3/4  max-w-4xl w-full flex flex-col">


                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Update Sentiment</h1>
                        <Link to={'/sentiments'}>
                            <Button variant={"ghost"}><X /></Button>
                        </Link>
                    </div>
                    <div className="flex justify-between items-center mb-4 ">
                        {sentimentId ?
                            <div className="w-full">
                                {/* <Label htmlFor="sentiment">Sentiment</Label> */}
                                <Input
                                    name="sentiment"
                                    type="text"
                                    value={formValues.sentiment}
                                    onChange={handleInputChange}
                                    autoFocus
                                    className="w-fill"
                                />
                                {formErrors.find((error) => error.path[0] === 'sentiment')?.message ? <div>{formErrors.find((error) => error.path[0] === 'question')?.message}</div> : null}
                            </div>
                            :
                            <div className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50">
                                {formValues.sentiment}
                            </div>
                        }
                        <div className=" w-3/12 flex justify-between ml-6">
                            {sentimentId ?
                                <div className="flex justify-between">
                                    {/* <Button onClick={() => setSentimentId("")} variant={"secondary"} ><ShieldCheck /> Save</Button> */}
                                    <Button onClick={() => handleSentimentSubmit()} variant={"secondary"} ><ShieldCheck /> Save</Button>
                                </div>
                                :
                                <div className="flex justify-between ">
                                    {/* <Button onClick={()=>setSentimentId(res.id)} variant={"outline"}><Edit /> Edit</Button> */}
                                    <Button onClick={() => setSentimentId(true)} variant={"outline"}><Edit /> Edit</Button>
                                    {/* <Button onClick={() => handleEditStatement()} variant={"outline"}><Edit /> Edit</Button> */}
                                </div>
                            }

                            {sentimentId ?
                                <div className="flex justify-between">
                                    <Button onClick={() => setSentimentId(false)} variant={"ghost"}><X /></Button>
                                    {/* <Button onClick={() => setStatementId("")} variant={"ghost"}><X /></Button> */}
                                </div>
                                :
                                <div className="flex justify-between ">
                                    {/* <Button variant={"ghost"}><Trash2 /></Button> */}
                                    <DeleteSentimentDialog res={formValues} />
                                    {/* <Button onClick={() => setStatementId("")} variant={"ghost"}><Trash2 /></Button> */}
                                </div>
                            }

                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Sentiment List</h1>
                        {/* <AddSentiment res={formValues} /> */}
                        <Link to={`/sentiments/${formValues.id}/statement`}>
                            <Button variant={"secondary"}>New Statement</Button>
                        </Link>
                    </div>
                    <div className="overflow-y-auto mt-4 max-h-3/4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow">



                        {loaderData.statements.map((res: StatementFormValues) => (
                            <div key={res.id} className="mb-4 flex justify-between items-center">

                                {res.id === statementId ?
                                    <div className="w-full">
                                        <Input
                                            name="statement"
                                            type="text"
                                            value={statement}
                                            onChange={(event) => setStatement(event.target.value)}
                                            autoFocus
                                            className="w-fill"
                                        />

                                        {formErrors.find((error) => error.path[0] === 'statement')?.message ? <div>{formErrors.find((error) => error.path[0] === 'statement')?.message}</div> : null}
                                    </div>
                                    :
                                    <div className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50">
                                        {res.statement}
                                    </div>
                                }
                                <div className=" w-3/12 flex justify-between ml-6">
                                    {res.id === statementId ?
                                        <div className="flex justify-between">
                                            <Button onClick={() => handleStatementSubmit()} variant={"secondary"} ><ShieldCheck /> Save</Button>
                                        </div>
                                        :
                                        <div className="flex justify-between ">
                                            <Button onClick={() => handleEditStatement(res)} variant={"outline"}><Edit /> Edit</Button>
                                        </div>
                                    }

                                    {res.id === statementId ?
                                        <div className="flex justify-between">
                                            <Button onClick={() => setStatementId("")} variant={"ghost"}><X /></Button>
                                        </div>
                                        :
                                        <div className="flex justify-between ">
                                            {/* <Button onClick={() => setStatementId("")} variant={"ghost"}><Trash2 /></Button> */}
                                            <DeleteStatementDialog res={res}/>
                                        </div>
                                    }

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
