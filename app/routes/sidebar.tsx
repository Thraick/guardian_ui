import { Link, NavLink } from "@remix-run/react";
import { useState } from "react";

export default function Sidebar() {

    const [openSublist, setOpenSublist] = useState("");

    const handleClick = (item: string) => {
        if (item === openSublist) {
            setOpenSublist("");
        } else {
            setOpenSublist(item);
        }
    }

    const handleSublistItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.stopPropagation();
    }

    return (
        <div className="bg-primary h-screen w-64 px-4 py-8">
            <div className="flex items-center justify-center mb-8">
                <Link to={'/'} onClick={() => handleClick('itemMain')}><h1 className="text-muted text-2xl font-bold">My App</h1></Link>

            </div>
            <nav>
                <ul className="space-y-2">
                    <li className="text-muted cursor-pointer" onClick={() => handleClick('item1')}>
                        <NavLink to={"faqs"} className={({ isActive }) => isActive ? "block border-l hover:text-accent transition text-secondary duration-150 px-2 ": "block border-l hover:text-accent transition duration-150 px-2 "}>
                            Faqs
                        </NavLink>
                    </li>
                    <li className="text-muted cursor-pointer" onClick={() => handleClick('item2')}>
                        <NavLink to={"sentiments"} className={({ isActive }) => isActive ? "block border-l hover:text-accent transition text-secondary duration-150 px-2 ": "block border-l hover:text-accent transition duration-150 px-2 "}>
                            Sentiments
                        </NavLink>
                    </li>
                    <li className="text-muted cursor-pointer" onClick={() => handleClick('item3')}>
                        <div className="block hover:text-accent transition duration-150 border-l px-2" >Entity Config</div>
                        {openSublist === 'item3' && (
                            <ul className=" px-6 ">
                                <li className="text-muted my-2 cursor-pointer" onClick={handleSublistItemClick}>
                                    <NavLink to={"entity_config/labels"} className={({ isActive }) => isActive ? "block border-l hover:text-accent transition text-secondary duration-150 px-2 ": "block border-l hover:text-accent transition duration-150 px-2 "}>
                                        Labels
                                    </NavLink>
                                </li>
                                <li className="text-muted my-2 cursor-pointer" onClick={handleSublistItemClick}>
                                    <NavLink to={"entity_config/replaces"} className={({ isActive }) => isActive ? "block border-l hover:text-accent transition text-secondary duration-150 px-2 ": "block border-l hover:text-accent transition duration-150 px-2 "}>
                                        Replace
                                    </NavLink>
                                </li>
                                <li className="text-muted my-2 cursor-pointer" onClick={handleSublistItemClick}>
                                    <NavLink to={"entity_config/convert"} className={({ isActive }) => isActive ? "block border-l hover:text-accent transition text-secondary duration-150 px-2 ": "block border-l hover:text-accent transition duration-150 px-2 "}>
                                        Convert
                                    </NavLink>
                                </li>
                                <li className="text-muted my-2 cursor-pointer" onClick={handleSublistItemClick}>
                                    <NavLink to={"entity_config/ignore"} className={({ isActive }) => isActive ? "block border-l hover:text-accent transition text-secondary duration-150 px-2 ": "block border-l hover:text-accent transition duration-150 px-2 "}>
                                        Ignore
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="text-muted cursor-pointer" onClick={() => handleClick('item4')}>
                        <NavLink to={"retort"} className={({ isActive }) => isActive ? "block border-l hover:text-accent transition text-secondary duration-150 px-2 ": "block border-l hover:text-accent transition duration-150 px-2 "}>
                            Retort
                        </NavLink>
                    </li>
                    <li className="text-muted cursor-pointer" onClick={() => handleClick('item5')}>
                        <NavLink to={"tfm_ner"} className={({ isActive }) => isActive ? "block border-l hover:text-accent transition text-secondary duration-150 px-2 ": "block border-l hover:text-accent transition duration-150 px-2 "}>
                            Tfm Ner
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>

    )
}