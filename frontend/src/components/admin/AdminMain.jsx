import React from "react";
import Resize from "../platform/components/Resize.jsx";
import Header from "../platform/section/header/Header.jsx";

const AdminMain = ({children, pageTitle, text}) => {
    return (
        <>
            <Resize width={801} fallback={null}>
                <Header />
            </Resize>
            <main className="main">
                <div className="admin__page-header">
                    <h2 className="admin__page-title">
                        {pageTitle}
                    </h2>
                    <div className="admin__page-text">
                        {text}
                    </div>
                </div>
                <section className="admin__content">
                    {children}
                </section>
            </main>
        </>
    )
}

export default AdminMain;