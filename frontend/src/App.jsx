import {ModalProvider} from "./components/platform/components/Modal.jsx";
import AppRouter from "./components/AppRouter.jsx";
import {RoleProvider} from "./components/HomePage/main/components/RoleContext.jsx";
import Loader from "./components/platform/components/Loader.jsx";

function App() {
    return (
        <RoleProvider>
            <ModalProvider>
                <Loader />
                <AppRouter />
            </ModalProvider>
        </RoleProvider>
    )
}

export default App;