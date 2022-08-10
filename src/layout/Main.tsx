import React from "react";
import NavBar from "./components/navbar";

const Main: React.FC<{ children: any }> = ({ children }): any => {
    return (
        <>
            <NavBar />
            <main className="main_content p-14 bg-slate-100 dark:text-white dark:bg-slate-800 ">
                {children}
            </main>
        </>
    );
};
export default Main;
