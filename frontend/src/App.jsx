import {Helmet} from "react-helmet-async";
import {ModalProvider} from "./components/main/components/Modal.jsx";
import AppRouter from "./components/AppRouter.jsx";

function App() {
    return (
        <>
            <Helmet>

            </Helmet>
            <ModalProvider>
                <AppRouter />
            </ModalProvider>
        </>
    )
}

export default App;