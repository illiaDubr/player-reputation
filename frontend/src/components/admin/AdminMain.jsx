import React from "react";
import Resize from "../platform/components/Resize.jsx";
import Header from "../platform/section/header/Header.jsx";

const AdminMain = ({children, pageTitle}) => {
    return (
        <>
            <Resize width={801} fallback={null}>
                <Header />
            </Resize>
            <main className="main">
                <h2 className="admin__page-title">
                    {pageTitle}
                </h2>
                <section className="admin__content">
                    {children}
                </section>
            </main>
        </>
    )
}

export default AdminMain;