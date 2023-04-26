import { Link, NavLink } from "@remix-run/react";

export default function Sidebar() {
    return (
        <div className="bg-primary h-screen w-64 px-4 py-8">
            <div className="flex items-center justify-center mb-8">
                <Link to={'/'}><h1 className="text-secondary text-2xl font-bold">My App</h1></Link>

            </div>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to={"faqs"}
                            className="block text-gray-300 hover:text-white transition duration-150"
                        >
                            Faqs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"sentiments"}
                            className="block text-gray-300 hover:text-white transition duration-150"
                        >
                            Sentiments
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"#"}
                            className="block text-gray-300 hover:text-white transition duration-150"
                        >
                            Retort
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>

    )
}