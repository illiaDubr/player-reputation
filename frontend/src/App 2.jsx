import {ModalProvider} from "./components/platform/components/Modal.jsx";
import AppRouter from "./components/AppRouter.jsx";
import {RoleProvider} from "./components/HomePage/main/components/RoleContext.jsx";

function App() {
    return (
        <RoleProvider>
            <ModalProvider>
                <AppRouter />
            </ModalProvider>
        </RoleProvider>
    )
}

export default App;