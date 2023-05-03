import { ActionArgs, redirect } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { newFaqs } from "~/resolvers/faqs";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Form, Link } from "@remix-run/react";
import { Textarea } from "~/components/ui/textarea";
import { X } from "lucide-react";


export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const retort_topic = formData.get('retort_topic')
    const ctx = {
        retort_topic
    }
    console.log("ctx")
    console.log(ctx)
    // try {
    //     await editFaqs({ ctx })
    //     return redirect('/faqs')
    // } catch (error) {
    //     return error;
    // }
    

    return redirect('/faqs');
};


export default function NewRetort() {

    return (
        <div className="flex justify-center items-center h-screen">

            <Form method="post" action="" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">New Retort</h1>
                    <Link to={'/retort'}>
                        <Button variant={"ghost"}><X /></Button>
                    </Link>
                </div>

                <div className="mb-4">
                    <Label htmlFor="retort_topic"
                    >
                        Retort Topic
                    </Label>
                    <Input
                        name="retort_topic"
                        type="text"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" variant={"secondary"}>Create</Button>
                </div>
            </Form>
        </div>
    )
}
