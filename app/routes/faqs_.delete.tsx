import { Link } from "@remix-run/react";


export default function Delete() {
    return (
        <>
            <h1>delete</h1>
            <Link to={'/faqs'}>X</Link>
        </>
    )
}