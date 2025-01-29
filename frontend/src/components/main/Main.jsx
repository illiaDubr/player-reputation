import Header from "./section/header/Header.jsx";
import SectionHeader from "./components/SectionHeader.jsx";
import Resize from "./components/Resize.jsx";
import "../../style/components/main/main.scss";

const Main = ({ children, secClassName, secID }) => (
    <>
        <Resize width={801} fallback={null}>
            <Header />
        </Resize>
        <main className="main" id="main">
            <section className={`section ${secClassName || ""}`} id={secID}>
                <SectionHeader />
                {children}
            </section>
        </main>
    </>
);

export default Main;