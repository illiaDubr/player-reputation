import SectionHeader from "../platform/components/SectionHeader.jsx";
import Resize from "../platform/components/Resize.jsx";
import "../../style/components/main/main.scss";
import Header from "../platform/section/header/Header.jsx";

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