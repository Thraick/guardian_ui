// import { Input } from "~/components/ui/input";
// import { editFaqs } from "~/resolvers/faqs";
// import { Label } from "@radix-ui/react-label";
// import { Button } from "~/components/ui/button";
// import { Form, Link, useParams } from "@remix-run/react";
// import { useState } from "react";
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "~/components/ui/dialog"
// import { SentimentFormValues } from "./sentiments_.$id";
// import { ActionArgs, redirect } from "@remix-run/node";
// import { useActionData, useSubmit } from "@remix-run/react";
// import * as z from 'zod';
// import { createRetortTopic } from "~/resolvers/retortTopic";
// import { newStatement } from "~/resolvers/sentiment";


// const new_statementSchema = z.string().min(3, { message: 'Statement must be at least 3 characters long' }).nonempty({ message: 'statement is required' });

// const schema = z.object({
//     new_statement: new_statementSchema
// });

// type FormValues = z.infer<typeof schema>;

// // import { useHistory } from 'react-router-dom';

// export async function action({ request }: ActionArgs) {

//     const formData = await request.formData();
//     const new_statement = formData.get('new_statement')
//     const id = formData.get('id')
//     const ctx = {
//         new_statement,
//         id
//     }
//     console.log("ctx")
//     console.log(ctx)
//     try {
//         console.log(ctx)
//         const payload = await newStatement({ ctx })
//         if (payload.info.warning) {
//             return payload.info.warning;
//         }
//         console.log("params.id")
//         console.log(id)
//         // history.push('/new-route');
//         // const ww = usePendingState();

//         // return redirect(`/sentiments/${id}`)
//         // return null
//     } catch (error) {
//         return error;
//     }
// };

// export default function AddSentiment(props: { res: SentimentFormValues }) {

//     const submit = useSubmit();
//     // const history = useHistory();
//     // const { id } = useParams();

//     const actionData = useActionData();
//     const [formValues, setFormValues] = useState<FormValues>({ new_statement: '' });
//     const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

//     function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
//         const { name, value } = event.target;
//         setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
//     };

//     function handleFormSubmit() {
//         // event.preventDefault();
//         const validationResult = schema.safeParse(formValues);
//         if (validationResult.success) {
//             // Handle successful form submission
//             setFormErrors([])
//             handleSubmit({ formValues });
//             setFormValues((prevValues) => ({ ...prevValues, ["new_statement"]: "" }));
//         } else {
//             setFormErrors(validationResult.error.issues);
//         }
//     };

//     function handleSubmit({ formValues }: { formValues: FormValues }) {
//         const formData = new FormData();
//         formData.append('new_statement', formValues.new_statement);
//         formData.append('id', props.res.id);
//         // submit(formData, { method: 'post', action: `/sentiments/${id}` });
//         submit(formData, { method: 'post', action: `/sentiments/statement` });
//     }

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant={"secondary"} className="bg-primary text-secondary hover:text-primary rounded-medium flex items-center justify-center h-13 py-3 px-3"> Add Sentiment</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <div className="max-w-3xl w-full">
//                     <div >
//                         <DialogHeader>
//                             <DialogTitle>Add {props.res.sentiment} Sentiment</DialogTitle>
//                         </DialogHeader>
//                         <div className="my-4">
//                             <Label htmlFor="new_statement">
//                                 Statement
//                             </Label>
//                             <Input
//                                 name="new_statement"
//                                 type="text"
//                                 value={formValues.new_statement}
//                                 onChange={handleInputChange}
//                                 autoFocus
//                             />
//                             {formErrors.find((error) => error.path[0] === 'new_statement')?.message ? <div>{formErrors.find((error) => error.path[0] === 'new_statement')?.message}</div> : null}
//                         </div>
//                         <DialogClose asChild>
//                             <Button type="submit" onClick={handleFormSubmit}>Save</Button>
//                         </DialogClose>
//                     </div>
//                     {
//                         actionData &&
//                         <div className="bg-yellow-100 text-center text-yellow-700 p-4" role="alert">
//                             <p className="font-bold">Warning</p>
//                             <p>{actionData}</p>
//                         </div>
//                     }
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }