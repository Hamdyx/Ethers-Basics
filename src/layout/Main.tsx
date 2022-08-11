import React from "react";
import NavBar from "./components/navbar";

const Main: React.FC<{ children: any }> = ({ children }): any => {
    return (
        <>
            <NavBar />
            <main className="main_content py-14 px-2 2xl:px-14 xl:px-12 lg:px-10 md:px-8 sm:px-6 bg-slate-100 dark:text-white dark:bg-slate-800 ">
                {children}
            </main>
        </>
    );
};
export default Main;
