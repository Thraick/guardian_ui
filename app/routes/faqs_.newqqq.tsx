import { ActionArgs } from '@remix-run/node';
import { Form, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import * as z from 'zod';

const validQuestions = ['', 'What?', 'Why?', 'How?', 'When?'];
// const isQuestionUnique = !payload.some(item => item.question === formValues.question);

const questionSchema = z.string().nonempty({ message: 'Question is required' });
const answerSchema = z.string().nonempty({ message: 'Answer is required' });

const schema = z.object({
    question: questionSchema,
    answer: answerSchema,
});

type FormValues = z.infer<typeof schema>;



export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const question = formData.get('question')
    const answer = formData.get('answer')
    const ctx = {
        question,
        answer
    }
    // console.log("ctx")
    console.log(ctx)
    try {
        // await newFaqs({ ctx })
        // return redirect('/faqs')
        return null
    } catch (error) {
        return error;
    }


    // return redirect('/faqs');
};

export default function newFaq1() {

    const [formValues, setFormValues] = useState<FormValues>({ question: '', answer: '' });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const submit = useSubmit();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const validationResult = schema.safeParse(formValues);
        if (validationResult.success) {
            // Handle successful form submission
            setFormErrors([])
            handleSubmit({ formValues });
        } else {
            setFormErrors(validationResult.error.issues);
        }
    };

    function handleSubmit({ formValues }: { formValues: FormValues }) {
        const formData = new FormData();
        formData.append('question', formValues.question);
        formData.append('answer', formValues.answer);
        submit(formData, { method: 'post', action: '/faqs/newqqq' });
    }



    return (
        <Form onSubmit={handleFormSubmit}>
            {/* <Form method='post'> */}
            <div>
                <label htmlFor="question">Question:</label>
                <input name="question" value={formValues.question} onChange={handleInputChange} />
                {formErrors.find((error) => error.path[0] === 'question')?.message
                    ? <div>{formErrors.find((error) => error.path[0] === 'question')?.message}</div>
                    : null
                }
            </div>
            <div>
                <label htmlFor="answer">Answer:</label>
                <textarea name="answer" value={formValues.answer} onChange={handleInputChange} />
                {formErrors.find((error) => error.path[0] === 'answer')?.message
                    ? (<div>{formErrors.find((error) => error.path[0] === 'answer')?.message}</div>)
                    : null
                }
            </div>
            <button type="submit">Submit</button>


        </Form>
    )
}



const payload = [
    {
        "id": "urn:uuid:3cfc9a25-04c8-4aa0-8097-a278493e88cdq",
        "question": "Who built this?",
        "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
    },
    {
        "id": "urn:uuid:75f4d116w-4396-42e7-9c55-fbb15b2q263b3",
        "question": "What is this all about?",
        "answer": "This is a conversational state machine built on Jaseci."
    },
    {
        "id": "urn:uuid:3cfcw9a25-04c8-4aa0-8097-a278493e88cdq",
        "question": "Who built this?",
        "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
    },
    {
        "id": "urn:uuid:75f4d116-4w396-42e7-9c55-fbb15b2q263b3",
        "question": "What is this all about?",
        "answer": "This is a conversational state machine built on Jaseci."
    },
    {
        "id": "urn:uuid:3cfc9a25-04c8-4aaw0-8097-a278493e88cdq",
        "question": "Who built this?",
        "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
    },
    {
        "id": "urn:uuid:75wf4d116-4396-42e7-9c55-fbb15b2q263b3",
        "question": "What is this all about?",
        "answer": "This is a conversational state machine built on Jaseci."
    },
    {
        "id": "urn:uuid:3cfc9a2w5-04c8-4aa0-8097-a278493e88cdq",
        "question": "Who built this?",
        "answer": "Eldon, Tharick, Rolex, Tim, Shawn, Rajni, Gimel."
    },
    {
        "id": "urn:uuid:w75f4d116-4396-42e7-9c55-fbb15b2q263b3",
        "question": "What is this all about?",
        "answer": "This is a conversational state machine built on Jaseci."
    },
    {
        "id": "urn:uuid:w75f4d116-439w6-42e7-9c55-fbb15b2q263b3",
        "question": "Name of project?",
        "answer": "This is a conversational state machine built on Jaseci."
    }
]