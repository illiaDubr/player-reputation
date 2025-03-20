import React from "react";
import Resize from "../platform/components/Resize.jsx";
import Header from "../platform/section/header/Header.jsx";

const AdminMain = ({children}) => {
    return (
        <>
            <Resize width={801} fallback={null}>
                <Header />
            </Resize>
            <main className="main">
                {children}
            </main>
        </>
    )
}

export default AdminMain;