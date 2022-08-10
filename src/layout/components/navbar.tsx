import React from "react";
import { NavLink } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { IoMdWallet } from "react-icons/io";
import { BsFillSunFill } from "react-icons/bs";
import { IconType } from "react-icons";

const Navbar: React.FC = (props) => {
    const toggleTheme = (ev: any) => {
        console.log("toggleTheme called");
        document.documentElement.classList.toggle("dark");
        localStorage.theme = localStorage.theme === "light" ? "dark" : "light";
    };
    return (
        <nav className="flex items-center justify-center gap-5 border-b-2 h-18 px-4 pt-4 dark:bg-slate-900 dark:border-black dark:text-white">
            <CustomLink title="Home" Icon={TiHome} fieldStyle="ml-auto" />
            <CustomLink title="wallet" Icon={IoMdWallet} />
            <button
                className="pb-4 ml-auto focus:border-0"
                onClick={toggleTheme}
            >
                <BsFillSunFill className="h-6 w-6" />
            </button>
        </nav>
    );
};

const CustomLink: React.FC<{
    title: string;
    Icon: IconType;
    fieldStyle?: string;
}> = ({ title, Icon, fieldStyle }) => {
    return (
        <NavLink
            to={`/${title === "Home" ? "" : title.toLowerCase()}`}
            className={`flex items-center gap-4 px-2 pb-4 ${fieldStyle || ""}`}
        >
            <Icon className="dark:fill-white dark:stroke-white h-6 w-6" />
            {title}
        </NavLink>
    );
};
export default Navbar;
