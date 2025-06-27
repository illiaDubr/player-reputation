import React from 'react';
import {RouterProvider} from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async";
import '@shared/styles/normalize.scss';
import '@shared/styles/index.scss'
import router from "@app/router";
import AppInit, {ModalProvider, StoreProvider} from "@app/providers";

export default function App() {

    return (
        <HelmetProvider>
            <StoreProvider>
                <ModalProvider>
                    <AppInit>
                        <RouterProvider router={router}/>
                    </AppInit>
                </ModalProvider>
            </StoreProvider>
        </HelmetProvider>
    )
}